'use client';

import { useEffect, useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/lib/firebase';
import { FaGoogle, FaCommentAlt, FaQuestionCircle } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

interface AuthProps {
  setUser: (user: any) => void;
}

const Auth = ({ setUser }: AuthProps) => {
  const [text, setText] = useState('');
  const welcomeMessage =
    'Welcome to Academic Pal Chat! ';

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

  const actionButtonClass =
    'bg-white text-white hover:bg-gray-200 transition-transform transform hover:scale-105 flex items-center gap-2';

  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-sans">
      {/* Header */}
      <header className="flex justify-end items-center mt-18 px-6">
        <Button onClick={signIn} className={actionButtonClass} aria-label="Sign in with Google">
          <FaGoogle className="text-black" />
          <span className="text-black font-semibold">Sign in with Google</span>
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 text-center">
        <section className="max-w-xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-white-400">{text}</span>
          </h1>
          <p className="text-base md:text-lg mb-8 text-neutral-200">
            Connect, collaborate, and access{' '}
            <span className="text-purple-400 font-semibold">valuable academic resources</span>{' '}
            effortlessly.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <Button onClick={handleProtectedAction} className={actionButtonClass} aria-label="Start Chat">
              <FaCommentAlt className="text-black" />
              <span className="text-black font-semibold">Start Chat</span>
            </Button>
            <Button onClick={handleProtectedAction} className={actionButtonClass} aria-label="Ask a Question">
              <FaQuestionCircle className="text-black" />
              <span className="text-black font-semibold">Ask a Question</span>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Auth;
