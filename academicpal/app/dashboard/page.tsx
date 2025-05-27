'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/signup');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/signup');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (!user) return <div className="text-white p-10">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6">🎉 Welcome to your Dashboard</h1>

      <div className="bg-gray-900 p-6 rounded-xl shadow-xl text-center w-full max-w-sm">
        <Image
          src={user.photoURL}
          alt="Profile Picture"
          width={100}
          height={100}
          className="rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-semibold">{user.displayName}</h2>
        <p className="text-gray-400">{user.email}</p>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded text-white font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
