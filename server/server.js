require('dotenv').config();
console.log("Key Loaded Check:", process.env.IBM_API_KEY ? "YES" : "NO");
const express = require('express');
const multer = require('multer');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const pdfParse = require('pdf-parse');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// This handles the "Cannot GET /" issue in ngrok site
app.get('/', (req, res) => {
    res.json({
        status: "Online",
        message: "BidRight AI Backend is reachable!",
        timestamp: new Date().toISOString()
    });
});

// Set up storage for uploaded files
const upload = multer({ dest: 'uploads/' });

// --- CONFIGURATION ---
const IBM_API_KEY = process.env.IBM_API_KEY;
const IBM_PROJECT_ID = process.env.IBM_PROJECT_ID;
const IBM_URL = process.env.IBM_URL;

// --- HELPER: GET TOKEN ---
async function getIBMToken() {
    const params = new URLSearchParams();
    params.append('grant_type', 'urn:ibm:params:oauth:grant-type:apikey');
    params.append('apikey', IBM_API_KEY);

    const res = await axios.post('https://iam.cloud.ibm.com/identity/token', params);
    return res.data.access_token;
}

// --- API ENDPOINT ---
app.post('/api/analyze', upload.single('pdf'), async (req, res) => {
    try {
        let textToAnalyze = "";

        // IBM will hit this "else if" block when it sends text from its document reader
        if (req.file) {
            const dataBuffer = fs.readFileSync(req.file.path);
            const data = await pdfParse(dataBuffer);
            textToAnalyze = data.text;
            fs.unlinkSync(req.file.path);
        } else if (req.body.text) { // This must match "text" in your swagger.json
            textToAnalyze = req.body.text;
        } else {
            return res.status(400).json({ error: "No PDF or Text provided" });
        }

        // Truncate to avoid token limits (first ~3000 words)
        textToAnalyze = textToAnalyze.substring(0, 15000);

        // 2. The Prompt (The "Brain") - Full detailed instructions
        const prompt = `
Role: Expert Bid Manager for Indian Government Tenders.
Task: Analyze this RFP text and output JSON.

RFP TEXT:
"${textToAnalyze}"

INSTRUCTIONS:
1. Extract the Project Title.
2. Determine "Go/No-Go" status. (Go = Good fit, No-Go = High Risk).
3. Identify "Red Flags" (e.g., High Turnover required, strict deadlines).
4. List required Tech Stack.
5. Write a short "Winning Strategy" pitch.

OUTPUT JSON FORMAT ONLY:
{
    "title": "Project Name",
    "decision": "GO or NO-GO",
    "risk_score": "High/Medium/Low",
    "red_flags": ["Flag 1", "Flag 2"],
    "tech_stack": ["Tech 1", "Tech 2"],
    "strategy": "Your pitch here..."
}

Constraint: Output ONLY raw JSON. No conversational filler.`;

        // 3. Call IBM Watsonx with your specified parameters
        const token = await getIBMToken();
        const response = await axios.post(IBM_URL, {
            model_id: "ibm/granite-3-3-8b-instruct",
            input: prompt,
            parameters: {
                decoding_method: "greedy",
                max_new_tokens: 500,
                min_new_tokens: 0,
                repetition_penalty: 1.0,
                stop_sequences: ["}\n\n**Note:", "}\n\n}", "}\n}"]
            },
            project_id: IBM_PROJECT_ID
        }, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });

        // 4. Clean and Send Result
        const generatedText = response.data.results[0].generated_text;

        // Safety check to remove potential markdown code blocks
        const cleanedJson = generatedText.replace(/```json|```/g, "").trim();

        try {
            const finalData = JSON.parse(cleanedJson);
            res.json({ success: true, analysis: finalData });
        } catch (parseError) {
            // Fallback if AI output isn't perfect JSON
            res.json({ success: true, analysis: generatedText, isRawText: true });
        }

    } catch (error) {
        console.error("Analysis Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Analysis Failed" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));