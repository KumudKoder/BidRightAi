# 🚀 Quick Setup Guide

## Step 1: Install Dependencies

From the root directory, run:

```bash
npm run install:all
```

Or manually:

```bash
# Backend
cd server
npm install

# Frontend
cd ../frontend
npm install
```

## Step 2: Configure Backend

1. Copy the example environment file:

```bash
cd server
copy .env.example .env    # Windows
# or
cp .env.example .env      # Linux/Mac
```

2. Edit `.env` and add your IBM credentials:

```env
IBM_API_KEY=your_actual_api_key_here
IBM_PROJECT_ID=your_actual_project_id_here
IBM_URL=https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29
PORT=5000
```

## Step 3: Start the Application

### Option A: Using Scripts (Easiest)

**Windows:**

```bash
start.bat
```

**Linux/Mac:**

```bash
chmod +x start.sh
./start.sh
```

### Option B: Manual Start

**Terminal 1 - Backend:**

```bash
cd server
npm start
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

### Option C: Using npm (if concurrently is installed)

```bash
npm run dev
```

## Step 4: Test the Connection

1. Open your browser to: http://localhost:5173
2. Check the backend status indicator (should show green)
3. Optionally, open `test-connection.html` in your browser to run connection tests

## Step 5: Using the Application

### Demo Mode (No Backend Required)

- Click "Good Fit Tender" for a positive scenario
- Click "High Risk Tender" for a negative scenario

### Real AI Mode (Backend Required)

1. Ensure backend is running (green indicator)
2. Toggle "Use Real AI Analysis" checkbox
3. Click "Select PDF File" and upload your RFP document
4. Wait for IBM watsonx analysis

## Troubleshooting

### Backend won't start

- Check if port 5000 is already in use
- Verify `.env` file exists in server directory
- Check IBM credentials are valid

### Frontend shows "Backend: Offline"

- Make sure backend is running on port 5000
- Check firewall settings
- Verify CORS is enabled in server

### File upload fails

- Ensure file is PDF format
- Check file size (max 50MB)
- Verify backend has write permissions for uploads/ folder

## URLs

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000
- **Backend Health**: http://localhost:5000/
- **API Endpoint**: http://localhost:5000/api/analyze

## Next Steps

- Configure your IBM watsonx credentials
- Upload sample PDFs to test
- Customize scenarios in `frontend/src/data/`
- Explore history and settings features

## Need Help?

Check the main README.md for detailed documentation.
