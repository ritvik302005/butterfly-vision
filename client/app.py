from pathlib import Path

from flask import Flask, jsonify, render_template, request, send_from_directory
from werkzeug.utils import secure_filename

from config import BASE_DIR, CLASS_NAMES_PATH, MODEL_PATH, UPLOADS_DIR
from predict import ButterflyPredictor


app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = str(UPLOADS_DIR)
app.config["MAX_CONTENT_LENGTH"] = 8 * 1024 * 1024

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "webp"}
FRONTEND_DIST_DIR = BASE_DIR / "frontend" / "dist"
predictor = ButterflyPredictor(MODEL_PATH, CLASS_NAMES_PATH)


def allowed_file(filename: str) -> bool:
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
    return response


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify(
        {
            "status": "ok",
            "model_loaded": predictor.model is not None,
            "frontend_built": (FRONTEND_DIST_DIR / "index.html").exists(),
        }
    )


@app.route("/api/predict", methods=["POST", "OPTIONS"])
def api_predict():
    if request.method == "OPTIONS":
        return ("", 204)

    file = request.files.get("image")
    if file is None or file.filename == "":
        return jsonify({"error": "Please choose a butterfly image before submitting."}), 400

    if not allowed_file(file.filename):
        return jsonify(
            {"error": "Unsupported file type. Upload a PNG, JPG, JPEG, or WEBP image."}
        ), 400

    filename = secure_filename(file.filename)
    image_path = Path(app.config["UPLOAD_FOLDER"]) / filename
    file.save(image_path)

    prediction = predictor.predict(image_path)
    prediction["uploadedImageUrl"] = f"/uploads/{filename}"
    return jsonify(prediction)


@app.route("/predict", methods=["POST"])
def predict_route():
    file = request.files.get("image")

    if file is None or file.filename == "":
        return render_template(
            "output.html",
            error="Please choose a butterfly image before submitting the form.",
        )

    if not allowed_file(file.filename):
        return render_template(
            "output.html",
            error="Unsupported file type. Upload a PNG, JPG, JPEG, or WEBP image.",
        )

    filename = secure_filename(file.filename)
    image_path = Path(app.config["UPLOAD_FOLDER"]) / filename
    file.save(image_path)

    prediction = predictor.predict(image_path)

    return render_template(
        "output.html",
        prediction=prediction,
        image_filename=filename,
    )


@app.route("/uploads/<path:filename>")
def uploaded_file(filename: str):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def frontend(path: str):
    if FRONTEND_DIST_DIR.exists():
        asset_path = FRONTEND_DIST_DIR / path
        if path and asset_path.exists() and asset_path.is_file():
            return send_from_directory(FRONTEND_DIST_DIR, path)
        return send_from_directory(FRONTEND_DIST_DIR, "index.html")

    if path in {"", "input"}:
        return render_template("index.html" if path == "" else "input.html")
    if path == "output":
        return render_template("output.html")
    return jsonify(
        {
            "message": "Frontend build not found. Run `npm install` and `npm run build` inside frontend/.",
            "api_health": "/api/health",
            "api_predict": "/api/predict",
        }
    ), 404


if __name__ == "__main__":
    app.run(debug=True)
