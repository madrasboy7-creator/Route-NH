@echo off
cd /d "%~dp0"
echo Starting FR8 GitHub Auto-Sync Watcher...
node scripts\auto-sync.mjs
