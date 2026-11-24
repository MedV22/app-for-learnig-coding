$ErrorActionPreference = "Stop"

$DistroName = "kali-linux"
$ProjectRoot = Split-Path -Parent $PSCommandPath
$NodeCommand = Get-Command node.exe -ErrorAction SilentlyContinue
$ServerUrl = "http://127.0.0.1:8080/"

if (-not $NodeCommand) {
  throw "Node.js is required to serve this local site."
}

$InstalledDistros = (wsl.exe --list --quiet | Out-String).Replace([string][char]0, "")
if ($InstalledDistros -notmatch "kali-linux") {
  throw "The WSL distribution 'kali-linux' was not found."
}

$ExistingListener = Get-NetTCPConnection -State Listen -LocalPort 8080 -ErrorAction SilentlyContinue | Select-Object -First 1
if ($ExistingListener) {
  try {
    $ExistingResponse = Invoke-WebRequest -Uri $ServerUrl -UseBasicParsing -TimeoutSec 2
    if ($ExistingResponse.Content -match "CodeVally") {
      Write-Host "CodeVally is already running at $ServerUrl"
      exit 0
    }
  } catch { }
  throw "Port 8080 is already in use by another application."
}

wsl.exe -d $DistroName --user root -- test -x /usr/local/bin/ttyd
if ($LASTEXITCODE -ne 0) {
  & (Join-Path $ProjectRoot "setup-kali-terminal.ps1")
  if ($LASTEXITCODE -ne 0) {
    throw "Kali terminal setup failed."
  }
}

wsl.exe -d $DistroName --user root -- pkill -u codevally-terminal -x ttyd *> $null
Start-Sleep -Milliseconds 500

$RandomBytes = New-Object byte[] 24
$RandomGenerator = [System.Security.Cryptography.RandomNumberGenerator]::Create()
try {
  $RandomGenerator.GetBytes($RandomBytes)
} finally {
  $RandomGenerator.Dispose()
}
$RandomPassword = [System.BitConverter]::ToString($RandomBytes).Replace("-", "").ToLowerInvariant()
$TtydCredential = "codevally:$RandomPassword"
$env:CODEVALLY_TTYD_AUTH = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($TtydCredential))

$TtydArguments = @(
  "-d", $DistroName,
  "--user", "root",
  "--", "runuser", "-u", "codevally-terminal", "--",
  "/usr/local/bin/ttyd",
  "--port", "7681",
  "--interface", "127.0.0.1",
  "--writable",
  "--check-origin",
  "--max-clients", "1",
  "--base-path", "/kali-terminal",
  "--credential", $TtydCredential,
  "--cwd", "/home/codevally-terminal",
  "bash", "--login"
)
Start-Process -FilePath "wsl.exe" -ArgumentList $TtydArguments -WindowStyle Hidden | Out-Null

$TtydHeaders = @{ Authorization = "Basic $env:CODEVALLY_TTYD_AUTH" }

$TerminalReady = $false
for ($Attempt = 0; $Attempt -lt 20; $Attempt++) {
  Start-Sleep -Milliseconds 250
  try {
    $TerminalResponse = Invoke-WebRequest -Uri "http://127.0.0.1:7681/kali-terminal/" -Headers $TtydHeaders -UseBasicParsing -TimeoutSec 2
    if ($TerminalResponse.StatusCode -eq 200) { $TerminalReady = $true; break }
  } catch { }
}
if (-not $TerminalReady) {
  throw "ttyd did not start in Kali WSL."
}

Write-Host "CodeVally with the real Kali WSL terminal is ready at $ServerUrl"
Write-Host "Keep this PowerShell window open while using the site. Press Ctrl+C to stop the site server."
& $NodeCommand.Source (Join-Path $ProjectRoot "server.js")
if ($LASTEXITCODE -ne 0) {
  throw "The local site server exited with an error."
}
