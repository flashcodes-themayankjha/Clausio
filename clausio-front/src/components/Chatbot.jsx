import React, { useState } from "react";

export default function Chatbot({ onClose }) {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi! I’m Clausio, your contract assistant." },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "This clause limits vendor liability to contract value.",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-20 right-6 w-80 bg-gray-900 text-white rounded-xl shadow-2xl flex flex-col overflow-hidden z-50">
      {/* Header */}
      <div className="bg-blue-600 px-4 py-3 text-sm font-semibold flex justify-between items-center">
        Clausio Bot 🤖
        <button
          onClick={onClose}
          className="text-white opacity-70 hover:opacity-100"
        >
          ✖
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto max-h-60 px-3 py-2 space-y-2 text-sm">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg ${
              msg.sender === "user"
                ? "bg-blue-700 text-right ml-auto w-fit max-w-[80%]"
                : "bg-gray-700 text-left mr-auto w-fit max-w-[80%]"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-gray-700 p-2 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 bg-gray-800 px-3 py-1 rounded-lg text-sm text-white outline-none"
          placeholder="Ask something..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
}

