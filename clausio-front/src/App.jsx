import React, { useState, useRef } from "react";
import './App.css';
import Chatbot from './components/Chatbot';
import Navbar from "./components/Navbar";


function App() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const [chatOpen, setChatOpen] = useState(false);

  const mockSummary = `
🔹 Payment Terms: Net 30 days.
🔹 Delivery Timeline: Goods delivered within 7 days.
🔹 SLA: 99.9% uptime required.
🔹 Penalties: 5% per week late.
🔹 Liability: Limited to contract value.
`;

  const handleSummarize = () => {
    if (!file) return;
    setLoading(true);
    setSummary("");

    setTimeout(() => {
      setSummary(mockSummary);
      setLoading(false);
    }, 1500);
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

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
       <Navbar />

      {/* Main Section */}
      <div className="flex flex-col items-center justify-center px-4 py-10">
        {/* Upload Box */}
        <div
          id="upload"
          className={`w-full max-w-xl border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${
            dragOver ? "border-blue-500 bg-gray-800" : "border-gray-600"
          }`}
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
          <p className="text-sm text-gray-400">
            Drag & Drop a contract here, or{" "}
            <span className="text-blue-400 underline">click to upload</span>
          </p>
          {file && (
            <p className="mt-2 text-xs text-gray-300">
              Selected File: <span className="text-white">{file.name}</span>
            </p>
          )}
        </div>

        {/* Summarize Button */}
        <button
          onClick={handleSummarize}
          disabled={!file || loading}
          className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-sm font-semibold disabled:opacity-40 transition"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="loader h-4 w-4 border-2 border-t-white border-white border-opacity-30 rounded-full animate-spin"></span>
              Summarizing...
            </span>
          ) : (
            "Summarize Contract"
          )}
        </button>

        {/* Summary Display as Cards */}
        {summary && (
          <div id="summary" className="mt-6 w-full max-w-xl text-left">
            <h2 className="text-blue-400 text-sm font-bold mb-2">Summary:</h2>
            <div className="grid gap-4">
              {summary
                .trim()
                .split("🔹")
                .filter(Boolean)
                .map((clause, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-900 p-4 rounded-lg shadow-md border border-gray-700"
                  >
                    <h3 className="font-semibold text-white text-sm mb-1">
                      {clause.split(":")[0].trim()}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {clause.split(":").slice(1).join(":").trim()}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
           {/* Chat Bubble Button */}
<button
  onClick={() => setChatOpen(!chatOpen)}
  className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-br from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-full shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none"
  title="Chat with Clausio"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8-1.577 0-3.05-.368-4.29-1.01L3 21l1.334-3.447C3.489 16.53 3 14.823 3 13c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
</button>

{/* Chatbot Component */}
{chatOpen && <Chatbot onClose={() => setChatOpen(false)} />}
   </div>
  );
}

export default App;

