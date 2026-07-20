@echo off
cd /d "%~dp0"

:: Clear stale git lock if present
if exist .git\index.lock (
    echo Clearing stale git lock...
    del .git\index.lock
)

:: Stage all changes
git add -A

:: Commit with timestamp
for /f "tokens=1-3 delims=/ " %%a in ("%date%") do set d=%%c-%%b-%%a
for /f "tokens=1-2 delims=: " %%a in ("%time%") do set t=%%a:%%b
git commit -m "deploy: update %d% %t%"

:: Push to GitHub (Vercel auto-deploys)
git push

echo.
echo Done! Vercel will deploy in about 1 minute.
echo.
pause
