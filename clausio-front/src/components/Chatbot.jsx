import React, { useState, useEffect } from "react";

const Chatbot = ({ onClose, question, contractText, clauses }) => {
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hi! I'm Wally. Ask me anything about your contract." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendToBackend = async (msgToSend) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/contract/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: msgToSend,
          context: "",
          contract_text: contractText,
          clauses: clauses,
        }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "user", content: msgToSend },
        { role: "bot", content: data.response },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "user", content: msgToSend },
        { role: "bot", content: "⚠️ Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    sendToBackend(input.trim());
    setInput("");
  };

  useEffect(() => {
    if (question) {
      sendToBackend(question);
    }
  }, [question]);

  return (
    <div className="fixed bottom-20 right-6 w-80 h-96 bg-gray-900 text-white rounded-lg shadow-lg flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-3 bg-blue-600 rounded-t-lg">
        <h2 className="text-sm font-bold">Wally - Contract Assistant</h2>
        <button
          onClick={onClose}
          className="text-gray-300 hover:text-white transition"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
        {messages.map((msg, idx) => (
          <div key={idx} className={`text-${msg.role === "user" ? "right" : "left"}`}>
            <div
              className={`inline-block px-3 py-2 rounded-md max-w-[80%] ${msg.role === "user" ? "bg-blue-700" : "bg-gray-700"
                }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-left text-gray-400 italic">Wally is thinking...</div>
        )}
      </div>

      {/* Input */}
      <div className="p-2 border-t border-gray-700">
        <input
          className="w-full px-3 py-2 rounded bg-gray-800 text-white text-sm outline-none"
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
      </div>
    </div>
  );
};

export default Chatbot;
