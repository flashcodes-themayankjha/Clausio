
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
import { MacbookScroll } from "./ui/MacbookScroll"; // Aceternity UI component

// Features List
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
    <div className="relative min-h-screen w-full overflow-hidden text-white flex flex-col">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url('/bgg.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-start px-6 pt-16 text-center">
        {/* Hero Text */}
        <h1
          className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4"
          data-aos="fade-up"
        >
          Simplify Contract Analysis with Clausio
        </h1>
        <p
          className="text-gray-300 text-lg sm:text-xl mb-10"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Clausio helps you summarize, understand, and assess legal documents in seconds.
        </p>

        {/* Macbook Scroll (Enlarged) */}
        <div className="w-full max-w-6xl mb-16 px-4" data-aos="fade-up" data-aos-delay="150">
          <MacbookScroll
            title={
              <span>
                Powered by AI.
                <br />
                Built with TailwindCSS.
              </span>
            }
            badge={
              <a href="https://peerlist.io/manuarora">
                <Badge className="h-10 w-10 transform -rotate-12" />
              </a>
            }
            src="/macbook.png"
            showGradient={false}
          />
        </div>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-12"
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

        {/* Features Grid */}
        <div className="mt-4 w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 pb-20">
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

      {/* Footer */}
      <footer className="relative z-20 w-full text-center text-gray-400 text-sm py-6 bg-black/30 backdrop-blur-md border-t border-white/10">
        © {new Date().getFullYear()} Clausio • Built with 💙 by Team BrainFuse.
      </footer>
    </div>
  );
};

export default Homepage;

// Badge component
const Badge = ({ className }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28Z" fill="#00AA45" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M28 54C42.3594 54 54 42.3594 54 28C54 13.6406 42.3594 2 28 2C13.6406 2 2 13.6406 2 28C2 42.3594 13.6406 54 28 54ZM28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56Z"
      fill="#219653"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M27.0769 12H15V46H24.3846V38.8889H27.0769C34.7305 38.8889 41 32.9048 41 25.4444C41 17.984 34.7305 12 27.0769 12ZM24.3846 29.7778V21.1111H27.0769C29.6194 21.1111 31.6154 23.0864 31.6154 25.4444C31.6154 27.8024 29.6194 29.7778 27.0769 29.7778H24.3846Z"
      fill="#24292E"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 11H29.0769C36.2141 11 42 16.5716 42 23.4444C42 30.3173 36.2141 35.8889 29.0769 35.8889H25.3846V43H18V11ZM25.3846 28.7778H29.0769C32.1357 28.7778 34.6154 26.39 34.6154 23.4444C34.6154 20.4989 32.1357 18.1111 29.0769 18.1111H25.3846V28.7778Z"
      fill="white"
    />
  </svg>
);
