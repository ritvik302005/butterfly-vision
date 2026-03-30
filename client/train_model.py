import argparse
import json
import shutil
from pathlib import Path

import pandas as pd
from sklearn.model_selection import train_test_split
from tensorflow.keras.applications import VGG16
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint, ReduceLROnPlateau
from tensorflow.keras.layers import Dense, Dropout, Flatten
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.preprocessing.image import ImageDataGenerator

from config import (
    BATCH_SIZE,
    CLASS_NAMES_PATH,
    DEFAULT_EPOCHS,
    EVALUATION_PATH,
    HISTORY_PATH,
    IMAGE_SIZE,
    MODEL_PATH,
    PROCESSED_DATA_DIR,
    RANDOM_STATE,
    RAW_DATA_DIR,
    TEST_DIR,
    TRAIN_DIR,
    VALID_DIR,
)


def detect_dataset_mode(dataset_dir: Path) -> str:
    csv_candidates = list(dataset_dir.glob("*.csv"))
    if csv_candidates:
        return "csv"

    if any(path.is_dir() for path in dataset_dir.iterdir()):
        return "folder"

    raise FileNotFoundError(
        f"Could not find class folders or CSV labels inside {dataset_dir}."
    )


def find_csv_file(dataset_dir: Path) -> Path:
    preferred_names = ["Training_set.csv", "training_set.csv", "train.csv"]
    for name in preferred_names:
        candidate = dataset_dir / name
        if candidate.exists():
            return candidate

    csv_files = list(dataset_dir.glob("*.csv"))
    if not csv_files:
        raise FileNotFoundError(f"No CSV label file found in {dataset_dir}.")
    return csv_files[0]


def detect_column(columns: list[str], options: list[str], column_type: str) -> str:
    lowered = {column.lower(): column for column in columns}
    for option in options:
        if option in lowered:
            return lowered[option]
    raise ValueError(f"Could not detect the {column_type} column in CSV: {columns}")


def resolve_image_root(dataset_dir: Path) -> Path:
    for folder_name in ["train", "Train", "images", "Images"]:
        candidate = dataset_dir / folder_name
        if candidate.exists() and candidate.is_dir():
            return candidate
    return dataset_dir


def collect_image_records(dataset_dir: Path) -> list[tuple[Path, str]]:
    records: list[tuple[Path, str]] = []
    for class_dir in sorted(path for path in dataset_dir.iterdir() if path.is_dir()):
        for image_path in class_dir.iterdir():
            if image_path.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}:
                records.append((image_path, class_dir.name))
    return records


def collect_csv_records(dataset_dir: Path) -> list[tuple[Path, str]]:
    csv_file = find_csv_file(dataset_dir)
    frame = pd.read_csv(csv_file)

    filename_column = detect_column(
        list(frame.columns),
        ["filename", "image", "image_path", "id", "file"],
        "image filename",
    )
    label_column = detect_column(
        list(frame.columns),
        ["label", "species", "class", "category"],
        "label",
    )

    image_root = resolve_image_root(dataset_dir)
    records: list[tuple[Path, str]] = []
    for _, row in frame.iterrows():
        image_path = image_root / str(row[filename_column])
        label = str(row[label_column]).strip()
        if image_path.exists():
            records.append((image_path, label))
    return records


def reset_split_directories() -> None:
    for directory in [TRAIN_DIR, VALID_DIR, TEST_DIR]:
        if directory.exists():
            shutil.rmtree(directory)
        directory.mkdir(parents=True, exist_ok=True)


def copy_subset(records: list[tuple[Path, str]], destination: Path) -> None:
    for source, label in records:
        class_dir = destination / label
        class_dir.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, class_dir / source.name)


def prepare_dataset(dataset_dir: Path) -> list[str]:
    mode = detect_dataset_mode(dataset_dir)
    records = (
        collect_image_records(dataset_dir)
        if mode == "folder"
        else collect_csv_records(dataset_dir)
    )
    if not records:
        raise FileNotFoundError(
            f"No images found in {dataset_dir}. Place the butterfly dataset into data/raw/"
        )

    labels = [label for _, label in records]
    train_records, temp_records = train_test_split(
        records,
        test_size=0.30,
        random_state=RANDOM_STATE,
        stratify=labels,
    )

    temp_labels = [label for _, label in temp_records]
    valid_records, test_records = train_test_split(
        temp_records,
        test_size=0.50,
        random_state=RANDOM_STATE,
        stratify=temp_labels,
    )

    reset_split_directories()
    copy_subset(train_records, TRAIN_DIR)
    copy_subset(valid_records, VALID_DIR)
    copy_subset(test_records, TEST_DIR)

    class_names = sorted({label for _, label in records})
    CLASS_NAMES_PATH.write_text(json.dumps(class_names, indent=2), encoding="utf-8")
    return class_names


def build_model(num_classes: int) -> Model:
    base_model = VGG16(weights="imagenet", include_top=False, input_shape=(*IMAGE_SIZE, 3))

    for layer in base_model.layers:
        layer.trainable = False

    x = Flatten()(base_model.output)
    x = Dense(256, activation="relu")(x)
    x = Dropout(0.35)(x)
    output = Dense(num_classes, activation="softmax")(x)

    model = Model(inputs=base_model.input, outputs=output)
    model.compile(
        optimizer=Adam(learning_rate=1e-4),
        loss="categorical_crossentropy",
        metrics=["accuracy"],
    )
    return model


def create_generators():
    train_datagen = ImageDataGenerator(
        rescale=1.0 / 255.0,
        rotation_range=25,
        width_shift_range=0.15,
        height_shift_range=0.15,
        shear_range=0.15,
        zoom_range=0.20,
        horizontal_flip=True,
        fill_mode="nearest",
    )
    eval_datagen = ImageDataGenerator(rescale=1.0 / 255.0)

    train_generator = train_datagen.flow_from_directory(
        TRAIN_DIR,
        target_size=IMAGE_SIZE,
        batch_size=BATCH_SIZE,
        class_mode="categorical",
    )
    valid_generator = eval_datagen.flow_from_directory(
        VALID_DIR,
        target_size=IMAGE_SIZE,
        batch_size=BATCH_SIZE,
        class_mode="categorical",
    )
    test_generator = eval_datagen.flow_from_directory(
        TEST_DIR,
        target_size=IMAGE_SIZE,
        batch_size=BATCH_SIZE,
        class_mode="categorical",
        shuffle=False,
    )
    return train_generator, valid_generator, test_generator


def train(dataset_dir: Path, epochs: int) -> None:
    class_names = prepare_dataset(dataset_dir)
    train_generator, valid_generator, test_generator = create_generators()
    model = build_model(num_classes=len(class_names))

    callbacks = [
        EarlyStopping(monitor="val_loss", patience=3, restore_best_weights=True),
        ReduceLROnPlateau(monitor="val_loss", factor=0.2, patience=2),
        ModelCheckpoint(MODEL_PATH, monitor="val_accuracy", save_best_only=True),
    ]

    history = model.fit(
        train_generator,
        validation_data=valid_generator,
        epochs=epochs,
        callbacks=callbacks,
    )

    evaluation = model.evaluate(test_generator, verbose=0)

    HISTORY_PATH.write_text(json.dumps(history.history, indent=2), encoding="utf-8")
    EVALUATION_PATH.write_text(
        json.dumps(
            {
                "test_loss": float(evaluation[0]),
                "test_accuracy": float(evaluation[1]),
                "num_classes": len(class_names),
            },
            indent=2,
        ),
        encoding="utf-8",
    )


def default_dataset_dir() -> Path:
    return RAW_DATA_DIR


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Train a VGG16-based butterfly species classifier."
    )
    parser.add_argument(
        "--dataset-dir",
        type=Path,
        default=default_dataset_dir(),
        help="Directory containing one folder per butterfly species.",
    )
    parser.add_argument(
        "--epochs",
        type=int,
        default=DEFAULT_EPOCHS,
        help="Number of training epochs.",
    )
    args = parser.parse_args()
    train(args.dataset_dir, args.epochs)


if __name__ == "__main__":
    main()
