import React, { useState, useEffect } from 'react';
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
  Download,
  Clock,
  Settings as SettingsIcon,
  User,
  X,
  Mail,
  Building,
  Calendar,
  Key,
  Bell,
  Globe,
  Save
} from 'lucide-react';
import { GO_BID_SCENARIO } from './data/goBidScenario';
import { NO_BID_SCENARIO } from './data/noBidScenario';
import { checkServerStatus, analyzeRFP } from './services/api';

const App = () => {
  // State Management
  const [appState, setAppState] = useState('idle'); // idle, uploading, processing, complete
  const [processingStep, setProcessingStep] = useState(0);
  const [fileName, setFileName] = useState("");
  const [currentScenario, setCurrentScenario] = useState(null);
  const [serverOnline, setServerOnline] = useState(false);
  const [useRealBackend, setUseRealBackend] = useState(false);
  const [history, setHistory] = useState([
    {
      id: 1,
      fileName: "Telecom_Tender_2024.pdf",
      date: "2026-01-28",
      time: "14:30",
      status: "GO",
      score: 88,
      value: "₹2.5 Cr"
    },
    {
      id: 2,
      fileName: "Railway_Infrastructure_RFP.pdf",
      date: "2026-01-25",
      time: "10:15",
      status: "NO-GO",
      score: 45,
      value: "₹500 Cr"
    },
    {
      id: 3,
      fileName: "Smart_City_Project.pdf",
      date: "2026-01-22",
      time: "16:45",
      status: "GO",
      score: 92,
      value: "₹1.8 Cr"
    }
  ]);

  // Modal states
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Check server status on mount
  useEffect(() => {
    const checkServer = async () => {
      const result = await checkServerStatus();
      setServerOnline(result.success);
      if (result.success) {
        console.log('✅ Backend server is online:', result.data);
      }
    };
    checkServer();
  }, []);

  // Simulation Logic for the "AI Processing" Visual
  const startSimulation = async (file, scenario) => {
    setFileName(file.name);
    setCurrentScenario(scenario);
    setAppState('uploading');

    // Simulate Upload
    setTimeout(async () => {
      setAppState('processing');
      await runProcessingSteps(file);
    }, 1500);
  };

  const runProcessingSteps = async (file) => {
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
      }
    }, 1200); // Speed of each step

    // If real backend is enabled and server is online, call the API
    if (useRealBackend && serverOnline && file instanceof File) {
      try {
        const result = await analyzeRFP(file);
        clearInterval(interval);

        if (result.success && result.data.analysis) {
          // Transform backend response to frontend format
          const analysis = result.data.analysis;
          const transformedScenario = {
            fileName: file.name,
            eligibility: {
              status: analysis.decision === "GO" ? "GO" : "NO-GO",
              score: analysis.decision === "GO" ? 85 : 40,
              reason: analysis.strategy || "Analysis completed"
            },
            client: analysis.title || "Government Tender",
            projectValue: "₹2.5 Cr - ₹3.0 Cr",
            deadline: "Feb 15, 2026 (14 Days left)",
            requirements: analysis.tech_stack ? analysis.tech_stack.map((tech, idx) => ({
              id: idx + 1,
              text: tech,
              met: analysis.decision === "GO"
            })) : [],
            risks: analysis.red_flags ? analysis.red_flags.map((flag, idx) => ({
              id: idx + 1,
              level: analysis.risk_score || "Medium",
              text: flag
            })) : [],
            proposalDraft: analysis.strategy || "Proposal draft generated..."
          };

          setCurrentScenario(transformedScenario);

          // Add to history
          const newHistoryItem = {
            id: history.length + 1,
            fileName: file.name,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
            status: analysis.decision === "GO" ? "GO" : "NO-GO",
            score: analysis.decision === "GO" ? 85 : 40,
            value: "₹2.5 Cr"
          };
          setHistory([newHistoryItem, ...history]);
        }
      } catch (error) {
        console.error('Backend analysis failed, using mock data:', error);
      }
    }

    // Wait for animation to complete
    setTimeout(() => setAppState('complete'), 1000);
  };

  const handleReset = () => {
    setAppState('idle');
    setProcessingStep(0);
    setFileName("");
  };

  // Handle real file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      startSimulation(file, null);
    } else {
      alert('Please upload a valid PDF file');
    }
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
          <span onClick={() => setShowHistory(true)} className="hover:text-blue-600 cursor-pointer transition flex items-center gap-1">
            <Clock className="w-4 h-4" /> History
          </span>
          <span onClick={() => setShowSettings(true)} className="hover:text-blue-600 cursor-pointer transition flex items-center gap-1">
            <SettingsIcon className="w-4 h-4" /> Settings
          </span>
          <div onClick={() => setShowProfile(true)} className="h-8 w-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-xs hover:bg-slate-300 cursor-pointer transition">
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

          {/* Backend Status & Mode Toggle */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <div className="flex items-center gap-2 text-sm">
              <div className={`w-2 h-2 rounded-full ${serverOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-slate-600">Backend: {serverOnline ? 'Online' : 'Offline'}</span>
            </div>
            {serverOnline && (
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={useRealBackend}
                  onChange={(e) => setUseRealBackend(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-slate-600">Use Real AI Analysis</span>
              </label>
            )}
          </div>
        </div>

        {/* --- DYNAMIC VIEWPORT --- */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden min-h-[600px] flex flex-col">

          {/* STATE 1: IDLE / UPLOAD */}
          {appState === 'idle' && (
            <div className="flex-1 flex flex-col items-center justify-center p-12 m-4">
              <div className="bg-blue-50 p-6 rounded-full shadow-lg mb-6">
                <UploadCloud className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Upload RFP Document</h3>
              <p className="text-slate-600 mb-8 text-center max-w-md">
                {useRealBackend ? (
                  <>Upload your PDF file for real AI analysis <br />
                    <span className="text-xs text-slate-500 mt-2 block">Supported: PDF (Max 50MB)</span></>
                ) : (
                  <>Select a sample tender to analyze with AI. <br />
                    <span className="text-xs text-slate-500 mt-2 block">Demo: Choose GO or NO-GO scenario</span></>
                )}
              </p>

              {/* Demo Mode: Scenario Selection Buttons */}
              {!useRealBackend && (
                <div className="flex gap-4">
                  <button
                    onClick={() => startSimulation({ name: GO_BID_SCENARIO.fileName }, GO_BID_SCENARIO)}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg shadow-green-600/30 transition-all flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Good Fit Tender
                  </button>
                  <button
                    onClick={() => startSimulation({ name: NO_BID_SCENARIO.fileName }, NO_BID_SCENARIO)}
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg shadow-red-600/30 transition-all flex items-center gap-2">
                    <XCircle className="w-4 h-4" /> High Risk Tender
                  </button>
                </div>
              )}

              {/* Real Backend Mode: File Upload */}
              {useRealBackend && (
                <div>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="pdf-upload"
                  />
                  <label
                    htmlFor="pdf-upload"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer">
                    <UploadCloud className="w-4 h-4" /> Select PDF File
                  </label>
                </div>
              )}
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
          {appState === 'complete' && currentScenario && (
            <div className="flex flex-col h-full">
              {/* Top Summary Bar */}
              <div className="bg-white border-b border-slate-200 p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="col-span-1 md:col-span-1">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Recommendation</p>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold border flex items-center gap-1 ${currentScenario.eligibility.status === 'GO'
                        ? 'bg-green-100 text-green-700 border-green-200'
                        : 'bg-red-100 text-red-700 border-red-200'
                      }`}>
                      {currentScenario.eligibility.status === 'GO' ? (
                        <><CheckCircle className="w-4 h-4" /> GO BID</>
                      ) : (
                        <><XCircle className="w-4 h-4" /> NO-GO</>
                      )}
                    </span>
                    <span className="text-2xl font-bold text-slate-800">{currentScenario.eligibility.score}/100</span>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-1">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Est. Value</p>
                  <p className="text-xl font-bold text-slate-800">{currentScenario.projectValue}</p>
                </div>

                <div className="col-span-1 md:col-span-1">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Deadline</p>
                  <p className="text-xl font-bold text-orange-600">{currentScenario.deadline}</p>
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
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded font-medium">{currentScenario.requirements.length} Found</span>
                      </div>
                      <div className="space-y-3">
                        {currentScenario.requirements.map((req) => (
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
                        <span className={`text-xs px-2 py-1 rounded font-medium ${currentScenario.eligibility.status === 'GO'
                            ? 'bg-orange-50 text-orange-700'
                            : 'bg-red-50 text-red-700'
                          }`}>{currentScenario.risks.length} Critical</span>
                      </div>
                      <div className="space-y-3">
                        {currentScenario.risks.map((risk) => (
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
                            {currentScenario.proposalDraft}
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

      {/* --- HISTORY MODAL --- */}
      {showHistory && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowHistory(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-white" />
                <h2 className="text-2xl font-bold text-white">Analysis History</h2>
              </div>
              <button onClick={() => setShowHistory(false)} className="text-white hover:bg-white/20 p-2 rounded-lg transition">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
              {history.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No analysis history yet. Upload your first RFP!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {history.map((item) => (
                    <div key={item.id} className="bg-slate-50 rounded-xl p-5 border border-slate-200 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <FileText className="w-5 h-5 text-slate-400" />
                            <h3 className="font-semibold text-slate-900">{item.fileName}</h3>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" /> {item.date}
                            </span>
                            <span>{item.time}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 ${item.status === 'GO'
                                ? 'bg-green-100 text-green-700 border border-green-200'
                                : 'bg-red-100 text-red-700 border border-red-200'
                              }`}>
                              {item.status === 'GO' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                              {item.status} BID
                            </span>
                            <span className="text-slate-600 font-medium">Score: {item.score}/100</span>
                            <span className="text-slate-600">Value: {item.value}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- SETTINGS MODAL --- */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowSettings(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SettingsIcon className="w-6 h-6 text-white" />
                <h2 className="text-2xl font-bold text-white">Settings</h2>
              </div>
              <button onClick={() => setShowSettings(false)} className="text-white hover:bg-white/20 p-2 rounded-lg transition">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)] space-y-6">

              {/* API Configuration */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Key className="w-5 h-5 text-blue-600" /> API Configuration
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">IBM watsonx API Key</label>
                    <input
                      type="password"
                      placeholder="••••••••••••••••"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Orchestrate Endpoint</label>
                    <input
                      type="text"
                      placeholder="https://api.watsonx.ibm.com/..."
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-orange-600" /> Notifications
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-slate-700">Email notifications for new tenders</span>
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-slate-700">Alert on high-risk clauses detected</span>
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-slate-700">Weekly analysis summary</span>
                    <input type="checkbox" className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
                  </label>
                </div>
              </div>

              {/* Language & Region */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-green-600" /> Language & Region
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Language</label>
                    <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>English (US)</option>
                      <option>Hindi (भारत)</option>
                      <option>English (UK)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Currency</label>
                    <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>INR (₹)</option>
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                    </select>
                  </div>
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition">
                <Save className="w-5 h-5" /> Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- PROFILE MODAL --- */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowProfile(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center relative">
              <button onClick={() => setShowProfile(false)} className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-lg transition">
                <X className="w-5 h-5" />
              </button>
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">John Doe</h2>
              <p className="text-blue-100">Bid Manager</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <Mail className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="text-sm font-medium text-slate-900">john.doe@company.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <Building className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">Organization</p>
                  <p className="text-sm font-medium text-slate-900">TechSolutions Pvt. Ltd.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <Calendar className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">Member Since</p>
                  <p className="text-sm font-medium text-slate-900">January 2025</p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-200 space-y-2">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition">
                  Edit Profile
                </button>
                <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg font-medium transition">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;