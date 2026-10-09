#!/bin/zsh
# Double-click to launch the AI/ML Roadmap (macOS)
cd "$(dirname "$0")"
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH:$(ls -d /opt/homebrew/opt/node@*/bin 2>/dev/null | tr '\n' ':')"
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed. Download the LTS version from https://nodejs.org, install it, then double-click start.command again."
  read -k1 "?Press any key to close…"
  exit 1
fi
(sleep 1; open "http://127.0.0.1:4747") &
node server.js
