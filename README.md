# BidRightAI - RFP Analysis Platform

AI-powered RFP/Tender analysis platform using IBM watsonx Orchestrate.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- IBM watsonx API credentials

### Backend Setup

1. Navigate to server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file with your IBM credentials:

```env
IBM_API_KEY=your_ibm_api_key_here
IBM_PROJECT_ID=your_project_id_here
IBM_URL=https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29
PORT=5000
```

4. Start the server:

```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file (optional - defaults to localhost:5000):

```env
VITE_API_URL=http://localhost:5000
```

4. Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📋 Features

### Demo Mode (Default)

- Pre-configured scenarios (GO and NO-GO bids)
- Instant results without backend
- Perfect for demonstrations

### Real Backend Mode

- Upload actual PDF files
- Real-time AI analysis using IBM watsonx
- Automatic eligibility scoring
- Risk detection
- Proposal generation

## 🔧 Usage

1. **Demo Mode**: Click on "Good Fit Tender" or "High Risk Tender" buttons
2. **Real AI Mode**:
   - Ensure backend server is running
   - Toggle "Use Real AI Analysis" checkbox
   - Upload your PDF file
   - Wait for IBM watsonx analysis

## 🏗️ Architecture

```
BidRightAI/
├── frontend/          # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── data/       # Mock scenarios
│   │   ├── services/   # API integration
│   │   └── App.jsx
│   └── package.json
│
└── server/            # Express.js backend
    ├── server.js      # Main API server
    ├── uploads/       # Temporary PDF storage
    └── package.json
```

## 🔌 API Endpoints

### GET /

- Health check endpoint
- Returns server status

### POST /api/analyze

- Analyzes RFP documents
- Accepts: PDF file or text
- Returns: JSON analysis with decision, risks, tech stack, and strategy

## 🛠️ Technologies

- **Frontend**: React, Vite, TailwindCSS, Lucide Icons
- **Backend**: Node.js, Express, Multer, PDF-Parse
- **AI**: IBM watsonx Granite 3.3 8B Instruct
- **Other**: Axios, CORS, dotenv

## 📝 Environment Variables

### Backend (.env)

- `IBM_API_KEY`: Your IBM Cloud API key
- `IBM_PROJECT_ID`: Your IBM watsonx project ID
- `IBM_URL`: IBM watsonx endpoint URL
- `PORT`: Server port (default: 5000)

### Frontend (.env)

- `VITE_API_URL`: Backend API URL (default: http://localhost:5000)

## 🚨 Troubleshooting

### Backend not connecting

1. Check if `.env` file exists in server directory
2. Verify IBM credentials are correct
3. Ensure port 5000 is not in use

### Frontend can't reach backend

1. Verify backend is running on port 5000
2. Check CORS settings in `server.js`
3. Confirm `VITE_API_URL` in frontend `.env`

## 📦 Production Deployment

### Backend

```bash
cd server
npm install --production
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run build
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Built for IBM watsonx Integration Challenge

## 🙏 Acknowledgments

- IBM watsonx Orchestrate team
- React and Vite communities
- TailwindCSS team
