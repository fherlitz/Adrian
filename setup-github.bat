@echo off
echo Setting up GitHub repository for Adrian website...

REM Check if git is initialized
if not exist ".git" (
    echo Initializing Git repository...
    git init
    git branch -M main
)

REM Create .gitignore
echo Creating .gitignore file...
echo deploy/ > .gitignore
echo *.log >> .gitignore
echo .DS_Store >> .gitignore
echo Thumbs.db >> .gitignore
echo node_modules/ >> .gitignore

REM Add remote if not exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo Adding GitHub remote...
    git remote add origin git@github.com:fherlitz/Adrian.git
)

REM Add and commit files
echo Adding files to git...
git add .
git status

echo.
echo Files staged for commit. Ready to push to GitHub!
echo.
echo Next commands to run:
echo 1. git commit -m "Deploy Adrian website to GitHub Pages"
echo 2. git push -u origin main
echo.
echo Then follow the GitHub Pages setup guide!
echo.
pause 