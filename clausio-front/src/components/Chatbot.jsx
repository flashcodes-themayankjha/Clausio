
import React, { useState, useEffect } from "react";

const Chatbot = ({ onClose, question }) => {
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hi! I'm Wally. Ask me anything about your contract." }
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (question) {
      setMessages((prev) => [...prev, { role: "user", content: question }]);
      // Later: trigger real API call here
    }
  }, [question]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
  };

  return (
    <div className="fixed bottom-20 right-6 w-80 h-96 bg-gray-900 text-white rounded-lg shadow-lg flex flex-col">
      <div className="flex justify-between items-center p-3 bg-blue-600 rounded-t-lg">
        <h2 className="text-sm font-bold">Wally - Contract Assistant</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition"
        >
          ✕
        </button>
      </div>
      <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
        {messages.map((msg, idx) => (
          <div key={idx} className={`text-${msg.role === "user" ? "right" : "left"}`}>
            <div
              className={`inline-block px-3 py-2 rounded-md ${
                msg.role === "user" ? "bg-blue-700" : "bg-gray-700"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <div className="p-2 border-t border-gray-700">
        <input
          className="w-full px-3 py-2 rounded bg-gray-800 text-white text-sm outline-none"
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
      </div>
    </div>
  );
};

export default Chatbot;
