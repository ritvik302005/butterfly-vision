from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
RAW_DATA_DIR = DATA_DIR / "raw"
PROCESSED_DATA_DIR = DATA_DIR / "processed"
SPLIT_DATA_DIR = DATA_DIR / "splits"
TRAIN_DIR = SPLIT_DATA_DIR / "train"
VALID_DIR = SPLIT_DATA_DIR / "valid"
TEST_DIR = SPLIT_DATA_DIR / "test"

MODELS_DIR = BASE_DIR / "models"
ARTIFACTS_DIR = BASE_DIR / "artifacts"
UPLOADS_DIR = BASE_DIR / "uploads"

MODEL_PATH = MODELS_DIR / "vgg16_butterfly_model.keras"
CLASS_NAMES_PATH = ARTIFACTS_DIR / "class_names.json"
HISTORY_PATH = ARTIFACTS_DIR / "training_history.json"
EVALUATION_PATH = ARTIFACTS_DIR / "evaluation.json"

IMAGE_SIZE = (224, 224)
BATCH_SIZE = 32
DEFAULT_EPOCHS = 10
RANDOM_STATE = 42

for directory in [
    RAW_DATA_DIR,
    PROCESSED_DATA_DIR,
    TRAIN_DIR,
    VALID_DIR,
    TEST_DIR,
    MODELS_DIR,
    ARTIFACTS_DIR,
    UPLOADS_DIR,
]:
    directory.mkdir(parents=True, exist_ok=True)
