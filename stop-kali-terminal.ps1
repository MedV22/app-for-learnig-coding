$ErrorActionPreference = "Stop"

$DistroName = "kali-linux"
$InstalledDistros = (wsl.exe --list --quiet | Out-String).Replace([string][char]0, "")
if ($InstalledDistros -notmatch "kali-linux") {
  Write-Host "The WSL distribution 'kali-linux' was not found."
  exit 0
}

wsl.exe -d $DistroName --user root -- pkill -u codevally-terminal -x ttyd *> $null
Write-Host "Stopped the CodeVally Kali terminal. Press Ctrl+C in the site PowerShell window to stop the site server."
