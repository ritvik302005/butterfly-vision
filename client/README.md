# Butterfly Vision

Butterfly Vision is a butterfly species classification project built for academic submission and live demonstration. It uses transfer learning with VGG16, a Flask backend, and a modern React frontend to classify butterfly images, visualize confidence, display Grad-CAM explainability, and present profile/dashboard features for citizen-science style interaction.

## What This Repo Contains

- Source code for training, prediction, and Flask integration
- React frontend UI for upload, gallery, dashboard, and visualization
- Project documentation
- Output screenshot folder
- Demo video link and submission assets

## Core Features

- Butterfly species classification using transfer learning
- Top-3 confidence visualization
- Grad-CAM heatmap explainability
- Species gallery with search and filter
- Species distribution map
- Lightweight sign in / sign up UI and profile dashboard
- Recent search tracking and activity history

## Tech Stack

- Python
- Flask
- TensorFlow / Keras
- VGG16 transfer learning
- NumPy, pandas, scikit-learn, Pillow
- React + Vite frontend
- Tailwind-based styling

## Dataset

Dataset used: [Butterfly Image Classification (Kaggle)](https://www.kaggle.com/datasets/phucthaiv02/butterfly-image-classification)

Current dataset summary used in this project:

- 75 classes
- 6499 labeled training images
- CSV-based training labels

## Project Structure

```text
butterfly_species_classifier/
|-- app.py
|-- config.py
|-- predict.py
|-- species_info.py
|-- train_model.py
|-- run_backend.ps1
|-- train_model.ps1
|-- requirements.txt
|-- frontend/
|-- docs/
|-- submission_assets/
|   |-- screenshots/
|   `-- video/
|-- artifacts/
|-- models/
`-- uploads/
```

## How To Run

### 1. Train the model

```powershell
cd "C:\Users\RITVIK\Documents\New project\butterfly_species_classifier"
powershell -ExecutionPolicy Bypass -File .\train_model.ps1 -Epochs 1
```

For demonstration, `1` or `2` epochs is enough. For better accuracy, use more epochs.

### 2. Run the application

```powershell
cd "C:\Users\RITVIK\Documents\New project\butterfly_species_classifier"
powershell -ExecutionPolicy Bypass -File .\run_backend.ps1
```

Then open:

- [http://127.0.0.1:5000](http://127.0.0.1:5000)

## Important GitHub Note

Do not push these large/generated items to GitHub:

- `.venv/`
- `frontend/node_modules/`
- `frontend/dist/`
- `data/raw/`
- `data/splits/`
- trained models in `models/`
- generated uploads in `uploads/`

The `.gitignore` is already configured to exclude the main large files and folders.

## Submission Material

- Documentation: [docs/PROJECT_DOCUMENTATION.md](/C:/Users/RITVIK/Documents/New%20project/butterfly_species_classifier/docs/PROJECT_DOCUMENTATION.md)
- Demo guide: [docs/DEMO_SCRIPT.md](/C:/Users/RITVIK/Documents/New%20project/butterfly_species_classifier/docs/DEMO_SCRIPT.md)
- GitHub checklist: [docs/GITHUB_SUBMISSION_CHECKLIST.md](/C:/Users/RITVIK/Documents/New%20project/butterfly_species_classifier/docs/GITHUB_SUBMISSION_CHECKLIST.md)
- Screenshots folder: [submission_assets/screenshots](/C:/Users/RITVIK/Documents/New%20project/butterfly_species_classifier/submission_assets/screenshots)
- Video folder: [submission_assets/video](/C:/Users/RITVIK/Documents/New%20project/butterfly_species_classifier/submission_assets/video)
- Demo video: [YouTube Demo](https://youtu.be/L23kcwANSnA)
- Output screenshot: [output-screenshot.png](/C:/Users/RITVIK/Documents/New%20project/butterfly_species_classifier/submission_assets/screenshots/output-screenshot.png)

## GitHub Submission Contents

Your public repository can now include:

- Code files
- Output screenshots
- Project documentation
- Project demonstration video link

Useful ready-to-submit assets:

- Demo video link file: [video-link.txt](/C:/Users/RITVIK/Documents/New%20project/butterfly_species_classifier/submission_assets/video/video-link.txt)
- Output screenshot: [output-screenshot.png](/C:/Users/RITVIK/Documents/New%20project/butterfly_species_classifier/submission_assets/screenshots/output-screenshot.png)
- App preview screenshot: [app-preview.png](/C:/Users/RITVIK/Documents/New%20project/butterfly_species_classifier/submission_assets/screenshots/app-preview.png)
- Home page screenshot: [01-home-page.png](/C:/Users/RITVIK/Documents/New%20project/butterfly_species_classifier/submission_assets/screenshots/01-home-page.png)
- Gallery screenshot: [02-gallery-page.png](/C:/Users/RITVIK/Documents/New%20project/butterfly_species_classifier/submission_assets/screenshots/02-gallery-page.png)
- Dashboard screenshot: [03-profile-dashboard.png](/C:/Users/RITVIK/Documents/New%20project/butterfly_species_classifier/submission_assets/screenshots/03-profile-dashboard.png)
- Classification screenshot: [04-classification-result.png](/C:/Users/RITVIK/Documents/New%20project/butterfly_species_classifier/submission_assets/screenshots/04-classification-result.png)

## Presentation Line

You can explain the project like this:

"Butterfly Vision is a transfer-learning based butterfly species classifier that identifies butterfly images using a VGG16 model. It integrates prediction, confidence visualization, Grad-CAM explainability, species browsing, and a citizen-science inspired dashboard into one web application."
