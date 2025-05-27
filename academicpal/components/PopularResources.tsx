'use client';

import React from 'react';

const resources = [
  { title: 'Frontend Development', description: 'React, Next.js, Tailwind CSS', link: '/frontend' },
  { title: 'Backend Development', description: 'Node.js, Express, Databases', link: '/backend' },
  { title: 'Full Stack Roadmap', description: 'End-to-end web development', link: '/fullstack' },
  { title: 'Android Development', description: 'Kotlin, Jetpack Compose', link: '/android' },
];

const PopularResources = () => {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-center">Popular Resources</h2>
      <div className="grid md:grid-cols-4 gap-8">
        {resources.map(({ title, description, link }) => (
          <a
            key={title}
            href={link}
            className="block bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
          >
            <h3 className="text-2xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default PopularResources;
