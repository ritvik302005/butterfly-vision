param(
    [int]$Epochs = 10,
    [string]$DatasetDir = ""
)

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$sitePackages = Join-Path $projectRoot ".venv\Lib\site-packages"
$env:PYTHONPATH = $sitePackages

if ([string]::IsNullOrWhiteSpace($DatasetDir)) {
    $DatasetDir = Join-Path $projectRoot "data\raw"
}

& py -3.11 (Join-Path $projectRoot "train_model.py") --dataset-dir $DatasetDir --epochs $Epochs
