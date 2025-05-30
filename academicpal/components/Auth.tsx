'use client';

import { useEffect, useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/lib/firebase';
import Image from 'next/image';
import {
  FaGoogle,
  FaCommentAlt,
  FaQuestionCircle
} from 'react-icons/fa';
import {
  MdSchool,
  MdContactSupport
} from 'react-icons/md';
import { SiAcademia } from 'react-icons/si';

interface AuthProps {
  setUser: (user: any) => void;
}

const Auth = ({ setUser }: AuthProps) => {
  const [text, setText] = useState('');
  const welcomeMessage =
    'Welcome to Academic Pal! Your Ultimate Academic Companion';

  useEffect(() => {
    let index = 0;
    setText('');
    const intervalId = setInterval(() => {
      setText(welcomeMessage.slice(0, index + 1));
      index++;
      if (index === welcomeMessage.length) {
        clearInterval(intervalId);
      }
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleProtectedAction = () => {
    alert('Please sign in with Google to continue.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4 md:p-6 bg-transparent shadow-md">
     
        <button
          onClick={signIn}
          className="flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 md:px-6 md:py-3 text-sm md:text-base rounded-full hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg transition-transform transform hover:scale-105"
        >
          <FaGoogle className="mr-2 md:mr-3" />
          Sign in with Google
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center text-center px-4 md:px-6">
        <div className="max-w-lg">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 animate-text">
              {text}
            </span>
          </h1>
          <p className="text-sm md:text-lg mb-6 md:mb-8">
            Connect, collaborate, and access valuable academic resources effortlessly.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button
              onClick={handleProtectedAction}
              className="flex items-center justify-center bg-green-500 px-4 py-2 md:px-5 md:py-3 text-white text-sm md:text-base rounded-lg hover:bg-green-600 shadow-md transition-transform transform hover:scale-105"
            >
              <FaCommentAlt className="mr-2" />
              Start Chat
            </button>
            <button
              onClick={handleProtectedAction}
              className="flex items-center justify-center bg-blue-500 px-4 py-2 md:px-5 md:py-3 text-white text-sm md:text-base rounded-lg hover:bg-blue-600 shadow-md transition-transform transform hover:scale-105"
            >
              <FaQuestionCircle className="mr-2" />
              Ask a Question
            </button>
          </div>
        </div>
      </main>

   
    </div>
  );
};

export default Auth;
