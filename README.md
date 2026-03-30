# Butterfly Vision

Butterfly Vision is a butterfly species classification web application built using transfer learning. The project identifies butterfly species from uploaded images and presents the result through an interactive interface with confidence visualization, Grad-CAM explainability, gallery exploration, and user dashboard features.

## Features

- Butterfly species classification using VGG16 transfer learning
- Top-3 prediction confidence visualization
- Grad-CAM heatmap for model explainability
- Species gallery with search and filter
- Species distribution map
- Sign in / sign up interface
- Profile dashboard with identification history and stats

## Tech Stack

### Frontend
- React
- Vite
- TypeScript
- CSS

### Backend
- Python
- Flask
- TensorFlow / Keras
- NumPy
- pandas
- scikit-learn
- Pillow

## Dataset

Dataset used:
[Butterfly Image Classification - Kaggle](https://www.kaggle.com/datasets/phucthaiv02/butterfly-image-classification)

Dataset summary:
- 75 butterfly species
- 6499 labeled images
- CSV-based labels for training

## Repository Structure

```text
butterfly-vision/
├── api/
├── client/
├── output screenshots/
├── project document/
├── video documentation/
└── README.md
Backend Files
The api folder contains:

app.py
config.py
download_dataset.py
predict.py
requirements.txt
run_backend.ps1
species_info.py
train_model.ps1
train_model.py
Frontend Files
The client folder contains:

React frontend source code
src/
public/
package.json
vite.config.ts
index.html
supporting TypeScript configuration files
How to Run
Backend
cd api
pip install -r requirements.txt
python app.py
Frontend
cd client
npm install
npm run dev
Output Screenshots
The output screenshots folder contains:

Home page
Gallery page
Profile dashboard
Classification result
Project Documentation
The project document folder contains the project report and documentation.

Demonstration Video
The video documentation folder contains the project demonstration video link.

Demo video:
Watch the Demo

Project Objective
This project aims to build an intelligent butterfly classification system that can support biodiversity monitoring, ecological research, and citizen science initiatives through fast and effective species identification.

Author
Ritvik Talwar

GitHub:
https://github.com/ritvik302005

Email:
talwarritvik2840@gmail.com
