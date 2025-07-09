import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Clause-by-Clause Summary",
    description: "Get a breakdown of important contract terms instantly.",
    icon: "📑",
  },
  {
    title: "Risk Detection",
    description: "Identify clauses that may be risky or unfavorable.",
    icon: "⚠️",
  },
  {
    title: "Ask Wally Bot",
    description: "Get intelligent explanations and recommendations.",
    icon: "🤖",
  },
  {
    title: "Secure & Fast",
    description: "Your files stay private and are summarized quickly.",
    icon: "🔒",
  },
];

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-400">
          Clausio — AI-Powered Contract Intelligence
        </h1>
        <p className="text-gray-300 text-lg mb-8">
          Upload your contract. Get instant summaries, risk detection, and smart insights — all clause by clause.
        </p>
        <Link to="/analyze">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all">
            Get Started
          </button>
        </Link>
      </div>

      {/* Feature Cards with Hover Effects */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {features.map((f, idx) => (
          <div
            key={idx}
            className="bg-white/5 border border-white/10 rounded-xl p-6 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-blue-500 hover:bg-gradient-to-br from-gray-800/30 to-blue-800/10 group cursor-pointer"
          >
            <div className="text-3xl mb-2 group-hover:animate-bounce">{f.icon}</div>
            <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
              {f.title}
            </h3>
            <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
              {f.description}
            </p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-20 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Clausio By Team BrainFuse. Built at Walmart Sparkathon.
      </footer>
    </div>
  );
};

export default Homepage;

