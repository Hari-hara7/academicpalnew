'use client';

import React from 'react';

const features = [
  {
    title: 'Curated Roadmaps',
    description: 'Step-by-step guides for frontend, backend, full stack, and more.',
    icon: '🗺️',
  },
  {
    title: 'Expert Resources',
    description: 'High-quality tutorials, videos, and articles handpicked for you.',
    icon: '📚',
  },
  {
    title: 'Interactive Chatbot',
    description: 'Get instant help and suggestions with our AI-powered assistant.',
    icon: '🤖',
  },
  {
    title: 'Community Support',
    description: 'Connect with peers and mentors to accelerate your learning.',
    icon: '👥',
  },
];

const KeyFeatures = () => {
  return (
    <section className="py-20 px-6 bg-gray-100 text-center max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-12">Key Features</h2>
      <div className="grid md:grid-cols-4 gap-10">
        {features.map(({ title, description, icon }) => (
          <div key={title} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="text-5xl mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KeyFeatures;
