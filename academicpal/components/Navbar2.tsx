'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGoogle, FaTimes, FaBars } from 'react-icons/fa';
import useFirebaseAuth from '@/hooks/useFirebaseAuth';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signInWithGoogle, signOutUser } = useFirebaseAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-black text-white">
      <div className="flex justify-between items-center p-6 shadow-lg">
        <Image src="/academicpal.jpg" alt="Logo" width={48} height={48} />

        <div className="hidden lg:flex space-x-4">
          {user ? (
            <button
              onClick={signOutUser}
              className="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 hover:text-black transition-all"
            >
              <FaGoogle className="inline-block mr-2" />
              Sign In with Google
            </button>
          )}
        </div>

        <button
          onClick={toggleMenu}
          className="lg:hidden"
          aria-label="Toggle menu"
        >
          <FaBars className="text-white text-3xl" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-black text-white p-6 transition-transform transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:hidden`}
      >
        <div className="flex justify-between items-center mb-8">
          <Image src="/academicpal.jpg" alt="Logo" width={48} height={48} />
          <button onClick={toggleMenu} aria-label="Close menu">
            <FaTimes className="text-white text-3xl" />
          </button>
        </div>

        <nav>
          <ul className="space-y-6">
            <li>
              <Link href="/resources" className="text-xl hover:text-gray-400">
                Resources
              </Link>
            </li>
            <li>
              <Link href="/upload" className="text-xl hover:text-gray-400">
                Upload
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-8">
          {user ? (
            <button
              onClick={signOutUser}
              className="w-full px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="w-full px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 hover:text-black transition-all"
            >
              <FaGoogle className="inline-block mr-2" />
              Sign In with Google
            </button>
          )}
        </div>
      </div>

      {/* Desktop Links */}
      <div className="hidden lg:flex justify-center space-x-6 mt-6">
        <Link href="/resources" className="text-xl text-white hover:text-gray-400">
          Resources
        </Link>
        <Link href="/upload" className="text-xl text-white hover:text-gray-400">
          Upload
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
