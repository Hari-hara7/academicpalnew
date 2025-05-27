'use client';

import React from 'react';

const testimonials = [
  {
    name: 'Anjali R.',
    role: 'Frontend Developer',
    photo: '/images/users/anjali.jpg',
    quote: 'Academic Pal made learning frontend frameworks so easy and enjoyable!',
  },
  {
    name: 'Ravi K.',
    role: 'Full Stack Developer',
    photo: '/images/users/ravi.jpg',
    quote: 'The roadmaps and resources helped me land my dream job.',
  },
  {
    name: 'Sneha P.',
    role: 'Backend Engineer',
    photo: '/images/users/sneha.jpg',
    quote: 'I love the chatbot! It’s like having a mentor available 24/7.',
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-center">What Our Users Say</h2>
      <div className="grid md:grid-cols-3 gap-10">
        {testimonials.map(({ name, role, photo, quote }) => (
          <div key={name} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition">
            <div className="flex items-center mb-4 gap-4">
              <img src={photo} alt={name} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <h3 className="text-xl font-semibold">{name}</h3>
                <p className="text-indigo-600">{role}</p>
              </div>
            </div>
            <p className="text-gray-700 italic">"{quote}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
