#!/bin/bash

echo "========================================"
echo " BidRightAI - Starting Application"
echo "========================================"
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "[1/4] Checking Backend Dependencies..."
cd server
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
fi

echo ""
echo "[2/4] Starting Backend Server..."
npm start &
BACKEND_PID=$!
sleep 3

echo ""
echo "[3/4] Checking Frontend Dependencies..."
cd ../frontend
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

echo ""
echo "[4/4] Starting Frontend Application..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "========================================"
echo " BidRightAI Started Successfully!"
echo "========================================"
echo ""
echo "Backend:  http://localhost:5000"
echo "Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop all services..."

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
