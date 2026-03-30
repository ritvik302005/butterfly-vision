import json
from pathlib import Path

import numpy as np
import tensorflow as tf
from PIL import Image
from tensorflow.keras.models import Model, load_model
from tensorflow.keras.preprocessing.image import img_to_array, load_img

from config import IMAGE_SIZE, UPLOADS_DIR
from species_info import get_species_info, humanize_label


class ButterflyPredictor:
    def __init__(self, model_path: Path, class_names_path: Path):
        self.model_path = Path(model_path)
        self.class_names_path = Path(class_names_path)
        self.model = None
        self.class_names = []
        self.load_assets()

    def load_assets(self) -> None:
        if self.class_names_path.exists():
            self.class_names = json.loads(self.class_names_path.read_text(encoding="utf-8"))

        if self.model_path.exists():
            self.model = load_model(self.model_path)

    def _find_last_conv_layer_name(self) -> str | None:
        if self.model is None:
            return None

        for layer in reversed(self.model.layers):
            output = getattr(layer, "output", None)
            if output is not None and len(output.shape) == 4:
                return layer.name
        return None

    def _generate_gradcam_overlay(
        self, image_path: Path, image_array: np.ndarray, class_index: int
    ) -> str | None:
        if self.model is None:
            return None

        last_conv_layer_name = self._find_last_conv_layer_name()
        if last_conv_layer_name is None:
            return None

        grad_model = Model(
            inputs=self.model.inputs,
            outputs=[self.model.get_layer(last_conv_layer_name).output, self.model.output],
        )

        input_tensor = tf.convert_to_tensor(image_array)
        with tf.GradientTape() as tape:
            conv_outputs, predictions = grad_model(input_tensor)
            class_channel = predictions[:, class_index]

        gradients = tape.gradient(class_channel, conv_outputs)
        if gradients is None:
            return None

        pooled_gradients = tf.reduce_mean(gradients, axis=(0, 1, 2))
        conv_outputs = conv_outputs[0]
        heatmap = tf.reduce_sum(tf.multiply(pooled_gradients, conv_outputs), axis=-1)
        heatmap = tf.maximum(heatmap, 0)
        max_value = tf.math.reduce_max(heatmap)
        if float(max_value) == 0.0:
            return None
        heatmap = heatmap / max_value
        heatmap = heatmap.numpy()

        if np.isnan(heatmap).any():
            return None

        heatmap_uint8 = np.uint8(255 * heatmap)
        color_map = tf.keras.utils.array_to_img(np.stack(
            [
                heatmap_uint8,
                np.minimum(255, heatmap_uint8 + 40),
                np.maximum(0, 255 - heatmap_uint8),
            ],
            axis=-1,
        ).astype("uint8")).resize(IMAGE_SIZE)

        original_image = Image.open(image_path).convert("RGB").resize(IMAGE_SIZE)
        overlay = Image.blend(original_image, color_map, alpha=0.42)

        gradcam_filename = f"{image_path.stem}_gradcam.png"
        gradcam_path = UPLOADS_DIR / gradcam_filename
        overlay.save(gradcam_path)
        return f"/uploads/{gradcam_filename}"

    def predict(self, image_path: Path) -> dict:
        if self.model is None:
            return {
                "error": None,
                "commonName": "Model not trained yet",
                "scientificName": "Unavailable",
                "family": "Unavailable",
                "description": "Train the VGG16 model first so the UI can classify butterfly species.",
                "habitat": "Not available until a trained model is loaded.",
                "conservationStatus": "Unknown",
                "funFact": "Once training is complete, this card will display species-level details.",
                "confidence": 0.0,
                "topPredictions": [],
                "gradcamImageUrl": None,
                "message": "Train the model first to enable predictions.",
            }

        image = load_img(image_path, target_size=IMAGE_SIZE)
        image_array = img_to_array(image).astype("float32") / 255.0
        image_array = np.expand_dims(image_array, axis=0)

        probabilities = self.model.predict(image_array, verbose=0)[0]
        top_indices = np.argsort(probabilities)[::-1][:3]
        top_predictions = []

        for index in top_indices:
            label = self.class_names[index] if self.class_names else f"class_{index}"
            confidence = float(probabilities[index] * 100)
            top_predictions.append(
                {
                    "label": label,
                    "commonName": humanize_label(label),
                    "confidence": confidence,
                }
            )

        best = top_predictions[0]
        details = get_species_info(best["label"], best["confidence"])
        details["error"] = None
        details["topPredictions"] = top_predictions
        details["gradcamImageUrl"] = self._generate_gradcam_overlay(
            image_path, image_array, int(top_indices[0])
        )
        details["message"] = "Prediction generated successfully."
        return details
