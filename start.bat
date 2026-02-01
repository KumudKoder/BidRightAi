@echo off
echo ========================================
echo  BidRightAI - Starting Application
echo ========================================
echo.

REM Check if node is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/4] Checking Backend Dependencies...
cd server
if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
)

echo.
echo [2/4] Starting Backend Server...
start "BidRightAI Backend" cmd /k "npm start"
timeout /t 3 /nobreak >nul

echo.
echo [3/4] Checking Frontend Dependencies...
cd ..\frontend
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
)

echo.
echo [4/4] Starting Frontend Application...
start "BidRightAI Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo  BidRightAI Started Successfully!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to close this window...
pause >nul
