import React from "react";

const developers = [
  {
    name: "Mayank Jha",
    role: "Frontend and AI Engineer",
    github: "https://github.com/flashcodes-themayankjha",
    linkedin: "https://linkedin.com/in/mayankjha-dev",
    instagram: "https://instagram.com/mayankjha.dev",
    threads: "https://www.threads.net/@mayankjha.dev",
    avatar: "https://avatars.githubusercontent.com/u/00000000?v=4", // replace with your GitHub avatar
  },
  {
    name: "Srija Ghosh",
    role: "UI/UX Designer and Frontend Engineer",
    github: "https://github.com/Srijaghosh04",
    linkedin: "https://linkedin.com/in/srijaghosh",
    instagram: "https://instagram.com/srija.designs",
    threads: "https://www.threads.net/@srija.designs",
    avatar: "https://avatars.githubusercontent.com/u/00000000?v=4",
  },
  {
    name: "Amit Dao",
    role: "Backend and AI Engineer",
    github: "https://github.com/22AmitDeo",
    linkedin: "https://linkedin.com/in/amitdeo",
    instagram: "https://instagram.com/amit.backend",
    threads: "https://www.threads.net/@amit.backend",
    avatar: "https://avatars.githubusercontent.com/u/00000000?v=4",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white py-10 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-400 mb-6">Meet the Developers</h1>
        <p className="text-gray-400 mb-12 text-lg">
          Built with 💙 during Walmart Sparkathon to simplify retail contract analysis.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {developers.map((dev, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md text-center transition-transform duration-300 transform hover:scale-105 hover:-rotate-1 shadow-sm hover:shadow-xl"
            >
              <img
                src={dev.avatar}
                alt={dev.name}
                className="w-20 h-20 mx-auto rounded-full mb-4 border-2 border-blue-500"
              />
              <h3 className="text-white font-semibold text-lg">{dev.name}</h3>
              <p className="text-sm text-gray-300 mb-4">{dev.role}</p>
              <div className="flex justify-center gap-4 text-xl">
                <a href={dev.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition">
                  <i className="fab fa-github"></i>
                </a>
                <a href={dev.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href={dev.instagram} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href={dev.threads} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition">
                  <i className="fa-brands fa-threads"></i>
                </a>
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-20 text-gray-500 text-sm">
          © {new Date().getFullYear()} Clausio by Team BrainFuse. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default About;

