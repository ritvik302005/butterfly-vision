"""
Optional helper for Kaggle-hosted butterfly datasets.

This file is not required to run the project if you already have the dataset.
It simply downloads a Kaggle dataset into data/raw/ when valid Kaggle credentials
are configured on the machine.
"""

from pathlib import Path

import kagglehub

from config import RAW_DATA_DIR


def download(dataset_handle: str = "gpiosenka/butterfly-images40-species") -> Path:
    downloaded_path = Path(kagglehub.dataset_download(dataset_handle))
    return downloaded_path


if __name__ == "__main__":
    path = download()
    print(f"Dataset downloaded to: {path}")
    print(f"Copy or extract the class folders into: {RAW_DATA_DIR}")
