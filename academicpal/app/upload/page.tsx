'use client';

import React, { useState } from 'react';
import { FaGoogle, FaUpload, FaLock, FaEye, FaGithub, FaLinkedin, FaHandshake } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image';

import useFirebaseAuth from '@/hooks/useFirebaseAuth';
import Home from '@/components/Home';
import AdminPanel from '@/components/AdminPanel';

const UploadPage = () => {
  const { user, signInWithGoogle, signOutUser } = useFirebaseAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="flex justify-between items-center p-4 md:p-6 bg-black shadow-lg">
     


        <div className="hidden sm:flex space-x-4 items-center">
          {user ? (
            <div className="flex items-center space-x-4">
             <Image
  src="/academicpal.jpg"
  alt="Logo"
  width={48}     // Add width here
  height={48}
  className="h-10 md:h-12 w-auto"
/>
              <span className="text-white text-sm md:text-base">{user.displayName}</span>
              <button
                onClick={signOutUser}
                className="px-5 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="px-5 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-all"
            >
              <FaGoogle className="inline-block mr-2" />
              Sign In
            </button>
          )}
        </div>

        <div className="sm:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white text-2xl">
            ☰
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="absolute top-16 right-4 bg-black text-white w-48 rounded-lg shadow-lg p-4 sm:hidden z-50">
            {user ? (
              <>
                <div className="flex items-center space-x-3 mb-4">
                  <Image
                    src={user.photoURL}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full border border-gray-400"
                  />
                  <span className="text-sm">{user.displayName}</span>
                </div>
                <button
                  onClick={signOutUser}
                  className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="w-full py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-all"
              >
                <FaGoogle className="inline-block mr-2" />
                Sign In
              </button>
            )}
          </div>
        )}
      </header>

      {user && (
        <section className="text-center py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-black">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
            Welcome, {user.displayName}!
            <motion.div
              className="inline-block ml-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
              whileHover={{ scale: 1.2, rotate: 15, color: '#ff00ff' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaHandshake />
            </motion.div>
          </h1>
          <p className="text-md sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-300 mt-4 px-6">
            Let’s get started! Upload your resources to help others.
          </p>
        </section>
      )}

      {user?.email?.endsWith('@nmamit.in') && <AdminPanel user={user} />}

      <main className="mt-8 px-4">
        {!user && (
          <section className="py-12">
            <h2 className="text-3xl font-bold text-gray-200 mb-10 text-center">Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
              {[
                {
                  icon: <FaLock className="text-blue-400 text-4xl mr-4" />,
                  title: 'How to Use This Website',
                  desc:
                    'Easily upload and manage educational resources, share valuable content, and securely sign in using your Google account.',
                },
                {
                  icon: <FaUpload className="text-green-400 text-4xl mr-4" />,
                  title: 'How It Helps Other Students',
                  desc:
                    'Shared resources benefit the student community by making valuable materials accessible to everyone.',
                },
                {
                  icon: <FaEye className="text-yellow-400 text-4xl mr-4" />,
                  title: 'Public Access',
                  desc:
                    'Share resources publicly and ensure everyone has access to crucial educational content.',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-dark backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center mb-4">{item.icon}<h3 className="text-xl font-semibold text-white">{item.title}</h3></div>
                  <p className="text-gray-300">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}
        <Home />
      </main>

      
    </div>
  );
};

export default UploadPage;
