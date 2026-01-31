import React, { useState } from 'react';
import {
  FileText,
  UploadCloud,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Loader2,
  ChevronRight,
  FileCheck,
  BrainCircuit,
  ShieldAlert,
  Bot,
  ArrowRight,
  RefreshCw,
  Download
} from 'lucide-react';

/**
 * MOCK DATA - Simulating the IBM Granite Analysis
 */
const MOCK_ANALYSIS_RESULT = {
  eligibility: {
    status: "GO",
    score: 88,
    reason: "Company meets technical & financial criteria."
  },
  client: "Department of Telecommunications, Govt. of India",
  projectValue: "₹ 2.5 Cr - ₹ 3.0 Cr",
  deadline: "Feb 15, 2026 (14 Days left)",
  requirements: [
    { id: 1, text: "Must have ISO 27001 Certification", met: true },
    { id: 2, text: "Experience in React & Node.js (3+ Projects)", met: true },
    { id: 3, text: "Minimum Annual Turnover: ₹5 Crore in FY 2024-25", met: true },
    { id: 4, text: "Must have local office in Delhi NCR", met: true },
  ],
  risks: [
    { id: 1, level: "High", text: "Penalty Clause: 10% deduction for >1 week delay." },
    { id: 2, level: "Medium", text: "Payment Terms: Net 90 Days (Standard is 30)." }
  ],
  proposalDraft: `Subject: Proposal for Digital Transformation Initiative

Dear Hiring Committee,

We are pleased to submit our proposal for the Digital Transformation Initiative. Having reviewed the RFP documents, we confirm that [Your Company Name] meets all eligibility criteria, including ISO 27001 certification and extensive experience in the MERN stack.

Our approach focuses on rapid deployment using...`
};

const App = () => {
  // State Management
  const [appState, setAppState] = useState('idle'); // idle, uploading, processing, complete
  const [processingStep, setProcessingStep] = useState(0);
  const [fileName, setFileName] = useState("");

  // Simulation Logic for the "AI Processing" Visual
  const startSimulation = (file) => {
    setFileName(file.name);
    setAppState('uploading');

    // Simulate Upload
    setTimeout(() => {
      setAppState('processing');
      runProcessingSteps();
    }, 1500);
  };

  const runProcessingSteps = () => {
    const steps = [
      "Extracting text from PDF (IBM Granite)...",
      "Analyzing Eligibility Criteria...",
      "Identifying Legal Risks...",
      "Drafting Technical Proposal..."
    ];

    let current = 0;
    const interval = setInterval(() => {
      setProcessingStep(current);
      current++;
      if (current >= steps.length) {
        clearInterval(interval);
        setTimeout(() => setAppState('complete'), 1000);
      }
    }, 1200); // Speed of each step
  };

  const handleReset = () => {
    setAppState('idle');
    setProcessingStep(0);
    setFileName("");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">

      {/* --- NAVIGATION --- */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">Bidright<span className="text-blue-600">AI</span></span>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200 font-semibold">Powered by IBM watsonx Orchestrate</span>
          <span className="hover:text-blue-600 cursor-pointer transition">History</span>
          <span className="hover:text-blue-600 cursor-pointer transition">Settings</span>
          <div className="h-8 w-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-xs">
            JD
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-6xl mx-auto px-6 py-12">

        {/* Header Section */}
        <div className="mb-10 text-center space-y-3">
          <h1 className="text-4xl font-extrabold text-slate-900">
            Bid Smarter, Not Harder.
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Upload any Tender/RFP document. Our Agent checks eligibility, finds risks, and writes your proposal in seconds.
          </p>
        </div>

        {/* --- DYNAMIC VIEWPORT --- */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden min-h-[600px] flex flex-col">

          {/* STATE 1: IDLE / UPLOAD */}
          {appState === 'idle' && (
            <div className="flex-1 flex flex-col items-center justify-center p-12 border-2 border-dashed border-blue-300 m-4 rounded-xl bg-white hover:bg-blue-50/30 transition-all group cursor-pointer"
              onClick={() => startSimulation({ name: "Government_Tender_RFP_v2.pdf" })}>
              <div className="bg-blue-50 p-6 rounded-full shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                <UploadCloud className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Upload RFP Document</h3>
              <p className="text-slate-600 mb-8 text-center max-w-md">
                Drag & drop your PDF here, or click to browse. <br />
                <span className="text-xs text-slate-500 mt-2 block">Supported formats: PDF, DOCX (Max 50MB)</span>
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2">
                Select Document <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STATE 2: PROCESSING / VISUALIZATION */}
          {(appState === 'uploading' || appState === 'processing') && (
            <div className="flex-1 flex flex-col items-center justify-center p-12 relative overflow-hidden">
              {/* Animated Background Mesh */}
              <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>

              <div className="z-10 w-full max-w-lg">
                <div className="flex items-center justify-center mb-8">
                  <div className="relative">
                    <FileText className="w-20 h-20 text-slate-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-6 space-y-6">
                  <div className="flex items-center justify-between text-sm font-medium text-slate-600 border-b border-slate-100 pb-4">
                    <span>Processing: {fileName}</span>
                    <span className="text-blue-600 animate-pulse">Orchestrating BidRight Agent (IBM watsonx)...</span>
                  </div>

                  <div className="space-y-4">
                    {[
                      "Extracting text (IBM Granite)...",
                      "Checking Eligibility Criteria...",
                      "Analyzing Risk Clauses...",
                      "Generating Proposal Draft..."
                    ].map((step, idx) => (
                      <div key={idx} className={`flex items-center gap-3 transition-all duration-500 ${idx === processingStep ? 'opacity-100 translate-x-0' :
                        idx < processingStep ? 'opacity-50' : 'opacity-20'
                        }`}>
                        {idx < processingStep ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : idx === processingStep ? (
                          <BrainCircuit className="w-5 h-5 text-blue-600 animate-pulse" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-slate-200" />
                        )}
                        <span className={`font-medium ${idx === processingStep ? 'text-slate-900' : 'text-slate-500'}`}>
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STATE 3: COMPLETE / DASHBOARD */}
          {appState === 'complete' && (
            <div className="flex flex-col h-full">
              {/* Top Summary Bar */}
              <div className="bg-white border-b border-slate-200 p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="col-span-1 md:col-span-1">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Recommendation</p>
                  <div className="flex items-center gap-2">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold border border-green-200 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> GO BID
                    </span>
                    <span className="text-2xl font-bold text-slate-800">88/100</span>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-1">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Est. Value</p>
                  <p className="text-xl font-bold text-slate-800">{MOCK_ANALYSIS_RESULT.projectValue}</p>
                </div>

                <div className="col-span-1 md:col-span-1">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Deadline</p>
                  <p className="text-xl font-bold text-slate-800 text-orange-600">{MOCK_ANALYSIS_RESULT.deadline}</p>
                </div>

                <div className="col-span-1 flex items-center justify-end">
                  <button
                    onClick={handleReset}
                    className="text-slate-500 hover:text-blue-600 flex items-center gap-2 text-sm font-medium transition"
                  >
                    <RefreshCw className="w-4 h-4" /> New Scan
                  </button>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="flex-1 bg-slate-50 p-6 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">

                  {/* Left Column: Requirements & Risks */}
                  <div className="lg:col-span-2 space-y-6">

                    {/* Requirements Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                          <FileCheck className="w-5 h-5 text-blue-600" /> Mandatory Requirements
                        </h3>
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded font-medium">4 Found</span>
                      </div>
                      <div className="space-y-3">
                        {MOCK_ANALYSIS_RESULT.requirements.map((req) => (
                          <div key={req.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                            <div className="mt-0.5">
                              {req.met ? (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-500" />
                              )}
                            </div>
                            <span className="text-sm text-slate-700 font-medium">{req.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Risks Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                          <ShieldAlert className="w-5 h-5 text-orange-600" /> Detected Risks
                        </h3>
                        <span className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded font-medium">2 Critical</span>
                      </div>
                      <div className="space-y-3">
                        {MOCK_ANALYSIS_RESULT.risks.map((risk) => (
                          <div key={risk.id} className="flex items-start gap-3 p-3 bg-orange-50/50 rounded-lg border border-orange-100">
                            <AlertTriangle className={`w-5 h-5 ${risk.level === 'High' ? 'text-red-500' : 'text-orange-500'}`} />
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${risk.level === 'High' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                                  }`}>
                                  {risk.level} Impact
                                </span>
                              </div>
                              <p className="text-sm text-slate-800">{risk.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Generated Proposal */}
                  <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-full overflow-hidden">
                      <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                        <h3 className="font-bold text-slate-800 text-sm">AI Drafted Proposal</h3>
                        <button className="text-blue-600 hover:text-blue-700 text-xs font-semibold flex items-center gap-1">
                          <Download className="w-3 h-3" /> Export DOCX
                        </button>
                      </div>
                      <div className="p-5 flex-1 overflow-auto bg-white">
                        <div className="prose prose-sm prose-slate max-w-none">
                          <p className="text-xs text-slate-400 mb-4 uppercase tracking-widest font-semibold">Preview</p>
                          <div className="whitespace-pre-wrap font-mono text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded border border-slate-100">
                            {MOCK_ANALYSIS_RESULT.proposalDraft}
                            <span className="animate-pulse">|</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border-t border-slate-100 bg-slate-50">
                        <button className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-lg font-medium text-sm transition-colors">
                          Open in Editor
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default App;