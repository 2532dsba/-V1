@echo off
title Zouling Website V1
cd /d "%~dp0"

where npm >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found.
  echo Please install it from https://nodejs.org/ and try again.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Preparing website files for the first launch...
  call npm install
  if errorlevel 1 (
    echo Installation failed. Check the network and try again.
    pause
    exit /b 1
  )
)

echo Starting Zouling website...
echo The browser will open automatically. Keep this window open.
call npm run dev -- --host 127.0.0.1 --open

