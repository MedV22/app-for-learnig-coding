#!/usr/bin/env bash
set -euo pipefail

if [[ "$(uname -m)" != "x86_64" ]]; then
  echo "This setup currently supports x86_64 Kali WSL only." >&2
  exit 1
fi

installed_version=""
if [[ -x /usr/local/bin/ttyd ]]; then
  installed_version="$(/usr/local/bin/ttyd --version 2>&1 || true)"
fi

if [[ "$installed_version" != *"1.7.7-40e79c7"* ]]; then
  work_dir="$(mktemp -d)"
  trap 'rm -rf "$work_dir"' EXIT
  curl -fsSL "https://github.com/tsl0922/ttyd/releases/download/1.7.7/ttyd.x86_64" -o "$work_dir/ttyd"
  expected_hash="8a217c968aba172e0dbf3f34447218dc015bc4d5e59bf51db2f2cd12b7be4f55"
  actual_hash="$(sha256sum "$work_dir/ttyd" | cut -d ' ' -f 1)"
  if [[ "$actual_hash" != "$expected_hash" ]]; then
    echo "ttyd download checksum did not match the official release." >&2
    exit 1
  fi
  install -m 0755 "$work_dir/ttyd" /usr/local/bin/ttyd
fi

if ! id -u codevally-terminal >/dev/null 2>&1; then
  useradd --create-home --shell /bin/bash --comment "CodeVally browser terminal" codevally-terminal
fi

echo "Installed ttyd $(/usr/local/bin/ttyd --version) and prepared the unprivileged codevally-terminal account."
