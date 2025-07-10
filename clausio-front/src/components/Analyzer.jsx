import React, { useState, useRef, useEffect } from "react";
import Chatbot from './Chatbot';
import { getClauseIcon } from "../utils/clauseIcons";
import NProgress from "nprogress";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "nprogress/nprogress.css";
import llmErrorIcon from "../assets/error.png"; // ✅ Add your custom error image here

NProgress.configure({ showSpinner: false });

function Analyzer() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [analyzingPhase, setAnalyzingPhase] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [expandedCards, setExpandedCards] = useState([]);
  const [riskFlags, setRiskFlags] = useState([]);
  const [pendingQuestion, setPendingQuestion] = useState("");
  const [parsedClauses, setParsedClauses] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const handleSummarize = async () => {
    if (!file) {
      setErrorMessage("🚫 Please upload a PDF contract before summarizing.");
      return;
    }

    setLoading(true);
    setAnalyzingPhase(true);
    setSummary("");
    setErrorMessage("");
    NProgress.start();

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:8000/contract/upload", {
        method: "POST",
        body: formData,
      });

      setAnalyzingPhase(false);

      const data = await response.json();

      if (data.content?.error) {
        setErrorMessage(data.content.error);
        return;
      }

      try {
        const parsed = JSON.parse(data.content);
        setParsedClauses(parsed);

        const formatted = Object.entries(parsed)
          .map(([key, value]) => `🔹 ${key}: ${value}`)
          .join("\n");

        setSummary(formatted);
      } catch {
        setSummary("📄❌ Invalid clause format returned by LLM.");
      }
    } catch (err) {
      console.error("Failed to summarize:", err);
      setErrorMessage("❌ Something went wrong while extracting summary.");
    } finally {
      setAnalyzingPhase(false);
      setLoading(false);
      NProgress.done();
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setFile(droppedFile);
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const toggleExpand = (idx) => {
    setExpandedCards((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const toggleRisk = (idx) => {
    setRiskFlags((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const askWally = (clauseText) => {
    setChatOpen(true);
    setTimeout(() => {
      setPendingQuestion(`Can you explain this clause: "${clauseText}"?`);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white relative px-4 py-10">
      <div className="flex flex-col items-center justify-center">

        {/* Upload UI */}
        <div
          id="upload"
          data-aos="fade-up"
          className={`w-full max-w-xl h-60 flex flex-col justify-center items-center border-2 border-dashed rounded-xl text-center cursor-pointer transition ${dragOver ? "border-blue-500 bg-gray-800" : "border-gray-600"}`}
          onClick={handleFileClick}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleFileDrop}
        >
          <input
            type="file"
            accept=".pdf,.docx"
            ref={fileInputRef}
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
          />

                    <svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-12 w-12 text-blue-400 mb-3 animate-pulse"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  strokeWidth={1.5}
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M7 16h10M12 12v8m0 0l-3-3m3 3l3-3m0-8a5 5 0 00-9.9-1.25M15 7a3 3 0 013 3c0 1.27-.43 2.44-1.14 3.38"
  />
</svg>


          <p className="text-sm text-gray-400">
            Drag & Drop a contract here, or <span className="text-blue-400 underline">click to upload</span>
          </p>
          {file && (
            <p className="mt-2 text-xs text-gray-300">
              Selected File: <span className="text-white">{file.name}</span>
            </p>
          )}
        </div>

        {/* General Error Card */}
        {errorMessage && (
          <div className="mt-5 w-full max-w-xl" data-aos="fade-down">
            <div className="relative bg-red-800/30 border border-red-500 text-red-100 px-4 py-3 rounded-md shadow-lg transition-all">
              <strong className="font-semibold">Error:</strong> {errorMessage}
              <button
                className="absolute top-2 right-3 text-red-200 hover:text-white text-lg"
                onClick={() => setErrorMessage("")}
                title="Dismiss"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSummarize}
          disabled={loading}
          data-aos="zoom-in"
          className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-sm font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 border-2 border-t-white border-white border-opacity-30 rounded-full animate-spin inline-block"></span>
              {analyzingPhase ? "Analyzing..." : "Summarizing..."}
            </span>
          ) : (
            "Summarize Contract"
          )}
        </button>

        {/* Summary */}
        {summary && (
          <div id="summary" className="mt-6 w-full max-w-xl text-left" data-aos="fade-up">
            <h2 className="text-blue-400 text-sm font-bold mb-4">Summary:</h2>

           {summary.includes("Invalid clause format returned by LLM") ? (
  <div className="bg-red-800/40 border border-red-500 px-5 py-4 rounded-xl shadow-lg">
    <div className="flex items-start gap-4">
      <img
        src={llmErrorIcon}
        alt="LLM Error"
        className="w-10 h-10 mt-1 animate-bounce" // 👈 Bounce here only
      />
      <div className="flex-1">
        <h3 className="text-lg font-bold text-red-100">LLM Format Error</h3>
        <p className="mt-1 text-sm text-red-100">
         The summary format returned by the AI could not be parsed. This may happen with unusual contract layouts.
        </p>
        <div className="mt-3 flex gap-3">
          <button
            onClick={handleSummarize}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
          >
            🔁 Try Again
          </button>
          <button
            onClick={() => setSummary("")}
            className="text-xs text-red-200 hover:text-white underline"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  </div>
) : (
                        <div className="grid gap-4">
                {summary
                  .trim()
                  .split("🔹")
                  .filter(Boolean)
                  .map((clause, idx) => {
                    const [title, ...rest] = clause.split(":");
                    const icon = getClauseIcon(title);
                    const value = rest.join(":").trim();
                    const isExpanded = expandedCards.includes(idx);
                    const isRisky = riskFlags.includes(idx);

                    return (
                      <div
                        key={idx}
                        data-aos="fade-up"
                        className={`bg-white/5 backdrop-blur-md border ${isRisky ? "border-red-400" : "border-white/10"} rounded-xl p-4 shadow-sm hover:shadow-lg transition cursor-pointer`}
                        onClick={() => toggleExpand(idx)}
                      >
                        <h3 className="flex items-center gap-2 text-sm font-semibold text-white mb-1">
                          <span className="text-xl">{icon}</span>
                          {title.trim()}
                          {isRisky && <span className="text-red-400 text-xs ml-2">⚠️ Risk</span>}
                        </h3>
                        {isExpanded ? (
                          <>
                            <p className="text-sm text-gray-300">{value}</p>
                            <div className="flex gap-4 mt-3">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  askWally(value);
                                }}
                                className="text-xs bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded"
                              >
                                Ask Wally
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleRisk(idx);
                                }}
                                className={`text-xs px-3 py-1 rounded ${isRisky ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-800"}`}
                              >
                                {isRisky ? "Unmark Risk" : "Mark as Risk"}
                              </button>
                            </div>
                          </>
                        ) : (
                          <p className="text-xs text-gray-500 italic">Click to expand</p>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}

            {riskFlags.length > 2 && (
              <div className="mt-4 bg-red-900/50 border border-red-400 text-red-300 px-4 py-3 rounded-lg shadow text-sm">
                ⚠️ <strong>Contract Status:</strong> <span className="text-white font-semibold">Not Recommended</span> — Too many high-risk clauses detected.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Chat Bubble */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-br from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-full shadow-xl hover:scale-105 transition-all duration-300"
        title="Chat with Clausio"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8-1.577 0-3.05-.368-4.29-1.01L3 21l1.334-3.447C3.489 16.53 3 14.823 3 13c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {/* Chatbot */}
      {chatOpen && (
        <Chatbot
          onClose={() => {
            setChatOpen(false);
            setPendingQuestion("");
          }}
          question={pendingQuestion}
          contractText={summary}
          clauses={parsedClauses}
        />
      )}
    </div>
  );
}

export default Analyzer;

