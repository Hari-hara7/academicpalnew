'use client';

import React from 'react';

const steps = [
  {
    step: 1,
    title: 'Choose Your Path',
    description: 'Select the development path or technology you want to master.',
  },
  {
    step: 2,
    title: 'Follow Roadmaps',
    description: 'Get detailed learning roadmaps curated by experts.',
  },
  {
    step: 3,
    title: 'Practice & Build',
    description: 'Complete projects and exercises to reinforce your skills.',
  },
  {
    step: 4,
    title: 'Join Community',
    description: 'Connect with peers and mentors for support and collaboration.',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 px-6 bg-gray-50 max-w-6xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-12">How It Works</h2>
      <div className="grid md:grid-cols-4 gap-10">
        {steps.map(({ step, title, description }) => (
          <div key={step} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
            <div className="text-indigo-600 font-bold text-4xl mb-4">{step}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
