@echo off
cd /d "%~dp0frontend"
call npm install
if errorlevel 1 pause & exit /b 1
call npm start
pause
