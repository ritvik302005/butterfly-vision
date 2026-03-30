$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$sitePackages = Join-Path $projectRoot ".venv\Lib\site-packages"

$env:PYTHONPATH = $sitePackages
& py -3.11 (Join-Path $projectRoot "app.py")
