'use client';

import { useEffect, useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/lib/firebase';
import { FaGoogle, FaCommentAlt, FaQuestionCircle } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { NeonGradientCard } from '@/components/magicui/neon-gradient-card'; // Make sure the path is correct

interface AuthProps {
  setUser: (user: any) => void;
}

const Auth = ({ setUser }: AuthProps) => {
  const [text, setText] = useState('');
  const welcomeMessage = 'Welcome to Academic Pal Chat!';

  useEffect(() => {
    let index = 0;
    let animationFrameId: number;

    const animateText = () => {
      setText(welcomeMessage.slice(0, index + 1));
      index++;
      if (index < welcomeMessage.length) {
        animationFrameId = window.setTimeout(animateText, 50);
      }
    };

    setText('');
    animationFrameId = window.setTimeout(animateText, 200);
    return () => clearTimeout(animationFrameId);
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
    <div className="min-h-screen bg-black text-white font-sans flex flex-col justify-between">
      {/* Header */}
      <header className="w-full p-4 border-b border-white/10 backdrop-blur-md flex justify-end">
        <Button
          onClick={signIn}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black font-semibold rounded-lg hover:scale-105 transition-transform shadow"
        >
          <FaGoogle />
          Sign in with Google
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 text-center">
        <NeonGradientCard className="w-full max-w-xl p-[1px] rounded-2xl">
          <section className="space-y-6  backdrop-blur-md bg-black p-8 rounded-2xl shadow-md">
            <h1 className="text-3xl md:text-4xl font-bold text-white">{text}</h1>
            <p className="text-gray-300 text-base md:text-lg">
              Connect, collaborate, and access{' '}
              <span className="text-blue-400 font-semibold">
                valuable academic resources
              </span>{' '}
              effortlessly.
            </p>

            {/* Responsive Button Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <Button
                onClick={handleProtectedAction}
                className="w-full flex items-center justify-center gap-2 px-12 sm:px-8 py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition"
              >
                <FaCommentAlt />
                <span>Start Chat</span>
              </Button>
              <Button
                onClick={handleProtectedAction}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition"
              >
                <FaQuestionCircle />
                <span>Ask </span>
              </Button>
            </div>
          </section>
        </NeonGradientCard>
      </main>

      {/* Footer */}
      <footer className="text-center p-4 text-sm text-gray-500 border-t border-white/10 backdrop-blur-md">
        &copy; {new Date().getFullYear()} Academic Pal. All rights reserved.
      </footer>
    </div>
  );
};

export default Auth;
