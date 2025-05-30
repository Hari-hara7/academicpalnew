'use client';

import { useEffect, useState } from 'react';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth, googleProvider, githubProvider } from '@/services/firebaseConfig';
import { LogOut, User, Github, Google } from 'lucide-react';

const SignInPage = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Google Sign-in Error', error);
    }
  };

  const signInWithGitHub = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
    } catch (error) {
      console.error('GitHub Sign-in Error', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign-out Error', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      {user ? (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center w-80">
          <User size={48} className="mx-auto mb-3 text-cyan-400" />
          <h2 className="text-2xl font-semibold">Welcome, {user.displayName}</h2>
          <p className="text-gray-400">{user.email}</p>
          <button
            onClick={handleSignOut}
            className="mt-4 flex items-center justify-center gap-2 bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      ) : (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center w-80">
          <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
          <button
            onClick={signInWithGoogle}
            className="flex items-center justify-center gap-2 w-full bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition mb-3"
          >
            <Google size={18} /> Sign in with Google
          </button>
          <button
            onClick={signInWithGitHub}
            className="flex items-center justify-center gap-2 w-full bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600 transition"
          >
            <Github size={18} /> Sign in with GitHub
          </button>
        </div>
      )}
    </div>
  );
};

export default SignInPage;
