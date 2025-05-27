'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-indigo-700 text-white fixed w-full top-0 left-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
      

        {/* Desktop Menu */}
      <div className="hidden md:flex space-x-8 text-lg">
  <Link href="/" className="hover:text-indigo-300 transition">Home</Link>
  <Link href="/roadmaps" className="hover:text-indigo-300 transition">Roadmaps</Link>
  <Link href="/resources" className="hover:text-indigo-300 transition">Resources</Link>
  <Link href="/blog" className="hover:text-indigo-300 transition">Blog</Link>
  <Link href="/about" className="hover:text-indigo-300 transition">About</Link>
  <Link href="/contact" className="hover:text-indigo-300 transition">Contact</Link>
   <Link href="/dashboard" className="hover:text-indigo-300 transition">Dashboard</Link>
</div>


        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
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
      </div>

      {/* Mobile Menu */}
      {isOpen && (
       <div className="md:hidden bg-indigo-800 text-white px-6 py-4 space-y-4">
  <Link
    href="/"
    onClick={() => setIsOpen(false)}
    className="block hover:text-indigo-300 transition"
  >
    Home
  </Link>
  <Link
    href="/roadmaps"
    onClick={() => setIsOpen(false)}
    className="block hover:text-indigo-300 transition"
  >
    Roadmaps
  </Link>
  <Link
    href="/resources"
    onClick={() => setIsOpen(false)}
    className="block hover:text-indigo-300 transition"
  >
    Resources
  </Link>
  <Link
    href="/blog"
    onClick={() => setIsOpen(false)}
    className="block hover:text-indigo-300 transition"
  >
    Blog
  </Link>
  <Link
    href="/about"
    onClick={() => setIsOpen(false)}
    className="block hover:text-indigo-300 transition"
  >
    About
  </Link>
  <Link
    href="/contact"
    onClick={() => setIsOpen(false)}
    className="block hover:text-indigo-300 transition"
  >
    Contact
  </Link>
</div>

      )}
    </nav>
  );
};

export default NavBar;
