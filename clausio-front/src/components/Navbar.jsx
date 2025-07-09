import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 px-6 py-4 flex justify-between items-center shadow-sm">
      {/* Logo */}
      <div className="text-xl font-bold text-blue-500 tracking-wide">
        Clausio
      </div>

      {/* Nav Items */}
      <div className="space-x-6 hidden sm:flex text-sm text-gray-300">
        <a href="#" className="hover:text-white transition">
          Home
        </a>
        <a href="#upload" className="hover:text-white transition">
          Upload
        </a>
        <a href="#summary" className="hover:text-white transition">
          Summary
        </a>
      </div>
    </nav>
  );
}

