$ErrorActionPreference = "Stop"

$DistroName = "kali-linux"
$ProjectRoot = Split-Path -Parent $PSCommandPath
$SetupScript = Join-Path $ProjectRoot "scripts\install-kali-terminal.sh"

if (-not (Get-Command wsl.exe -ErrorAction SilentlyContinue)) {
  throw "WSL is not installed. Install Kali Linux in WSL before using the real terminal."
}

$InstalledDistros = (wsl.exe --list --quiet | Out-String).Replace([string][char]0, "")
if ($InstalledDistros -notmatch "kali-linux") {
  throw "The WSL distribution 'kali-linux' was not found."
}

$LinuxScriptPath = (wsl.exe -d $DistroName -- wslpath -a $SetupScript).Trim()
if ($LASTEXITCODE -ne 0 -or -not $LinuxScriptPath) {
  throw "Could not locate the Kali setup script through WSL."
}

wsl.exe -d $DistroName --user root -- bash $LinuxScriptPath
if ($LASTEXITCODE -ne 0) {
  throw "Kali terminal setup failed."
}

Write-Host "Kali terminal setup is complete. Start it with .\start-kali-terminal.ps1."
