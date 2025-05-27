'use client';

import React from 'react';

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 text-center">
      <h1 className="text-5xl font-extrabold mb-4">
        Academic Pal - Your Ultimate Learning Companion
      </h1>
      <p className="text-xl max-w-xl mb-8">
        Find curated roadmaps, resources, and interactive tools to master your tech skills.
      </p>
      <div>
        <button className="bg-white text-indigo-700 font-bold px-6 py-3 rounded-lg mr-4 hover:bg-gray-100 transition">
          Get Started
        </button>
        <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-indigo-700 transition">
          Learn More
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
