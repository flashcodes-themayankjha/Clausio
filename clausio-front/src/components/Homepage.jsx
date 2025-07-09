
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FileText,
  ShieldAlert,
  Bot,
  Timer,
  CheckCircle,
  FileSearch,
} from "lucide-react";


const features = [
  {
    icon: <FileText className="h-8 w-8 text-blue-400" />,
    title: "Clause Detection",
    desc: "Extract key clauses in seconds.",
  },
  {
    icon: <ShieldAlert className="h-8 w-8 text-red-400" />,
    title: "Risk Flagging",
    desc: "Highlight risky or ambiguous terms.",
  },
  {
    icon: <Bot className="h-8 w-8 text-purple-400" />,
    title: "Ask Wally",
    desc: "Smart chatbot for contract Q&A.",
  },
  {
    icon: <Timer className="h-8 w-8 text-yellow-400" />,
    title: "Instant Summary",
    desc: "Generate summaries in less than 10 seconds.",
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-green-400" />,
    title: "Clause Validation",
    desc: "Verify clause compliance with industry standards.",
  },
  {
    icon: <FileSearch className="h-8 w-8 text-pink-400" />,
    title: "Smart Search",
    desc: "Find specific clauses using natural language.",
  },
];

const Homepage = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url('/bgg.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10"></div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 py-16 text-center">
        <h1
          className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4"
          data-aos="fade-up"
        >
          Simplify Contract Analysis with Clausio
        </h1>
        <p
          className="text-gray-300 text-lg sm:text-xl mb-8"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Clausio helps you summarize, understand, and assess legal documents in seconds.
        </p>
             
{/* Rectangular Buttons with Rounded Corners */}
<div
  className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-4"
  data-aos="fade-up"
  data-aos-delay="200"
>
  <Link
    to="/analyze"
    className="px-6 py-3 sm:px-8 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105"
  >
    🚀 Get Started with AI
  </Link>

  <Link
    to="/signup"
    className="px-6 py-3 sm:px-8 sm:py-4 border border-white/20 hover:border-blue-500 text-white text-sm sm:text-base font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105"
  >
    ✨ Start for Free
  </Link>
</div>


        {/* Feature Cards */}
        <div className="mt-16 w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {features.map(({ icon, title, desc }, i) => (
            <div
              key={i}
              className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:border-blue-500 hover:shadow-xl"
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className="mb-4">{icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition">
                {title}
              </h3>
              <p className="text-gray-300">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
