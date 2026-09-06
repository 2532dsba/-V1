@echo off
title Deploy Zouling to Vercel
cd /d "%~dp0"

where npm >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found.
  echo Please install it from https://nodejs.org/ and try again.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Preparing website files...
  call npm install
  if errorlevel 1 goto failed
)

echo Checking the production build...
call npm run build
if errorlevel 1 goto failed

echo.
echo 1. Preview deployment
echo 2. Production deployment
set /p DEPLOY_CHOICE=Choose 1 or 2: 

if "%DEPLOY_CHOICE%"=="2" (
  call npx --yes vercel@latest --prod
) else (
  call npx --yes vercel@latest
)

if errorlevel 1 goto failed
echo.
echo Deployment completed. The website address is shown above.
pause
exit /b 0

:failed
echo.
echo Deployment did not complete. Check the message above and try again.
pause
exit /b 1
