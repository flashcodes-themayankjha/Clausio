import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-gray-950 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
  to="/"
  className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
  onClick={closeMenu}
>
  Clausio.ai
</Link>


        {/* Hamburger Icon */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-300 focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 font-medium text-sm">
          <li>
            <Link to="/" className="hover:text-blue-400 transition" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/analyze" className="hover:text-blue-400 transition" onClick={closeMenu}>
              Analyzer
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-400 transition" onClick={closeMenu}>
              About
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 px-4 pb-4">
          <ul className="flex flex-col gap-4 text-sm">
            <li>
              <Link to="/" onClick={closeMenu} className="block hover:text-blue-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/analyze" onClick={closeMenu} className="block hover:text-blue-400">
                Analyzer
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={closeMenu} className="block hover:text-blue-400">
                About
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

