'use client';

import React from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BorderBeam } from '@/components/magicui/border-beam';
import {
  Compass,
  BookOpen,
  Bot,
  Users,
  NotebookText,
  FileText,
  MessageCircle,
  Search,
  UploadCloud,
  ArrowRightCircle,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const features = [
  {
    title: '📌 Curated Roadmaps',
    description:
      'Navigate your journey with structured roadmaps for frontend, backend, full stack, and more. Learn in a goal-oriented path tailored for students and professionals alike.',
    icon: Compass,
    iconColor: 'text-blue-500',
    image: '/roadmap.webp',
    link: '/roadmaps',
    buttonText: 'Explore Now',
  },
  
 
  {
    title: '🌐 Community Support',
    description:
      'Connect with a vibrant student community. Join discussions, get mentorship, and stay motivated with peers who share your passion.',
    icon: Users,
    iconColor: 'text-pink-500',
    image: '/rtc.jpeg',//academicpal/public/rtc.jpeg
    link: '/community',
    buttonText: 'Join Now',
  },
  {
    title: '📚 Comprehensive Notes',
    description:
      'Access crisp, well-organized notes for all subjects. Designed for clarity and speed, these notes help you revise smarter before exams.',
    icon: NotebookText,
    iconColor: 'text-purple-500',
    image: '/notes.jpeg',
    link: '/notes',
    buttonText: 'Access Notes',
  },
  {
    title: '📝 Past Question Papers',
    description:
      'Prepare with confidence using past papers. Understand frequently asked questions and get familiar with real exam patterns.',
    icon: FileText,
    iconColor: 'text-orange-500',
    image: '/pyqs.jpeg',//academicpal/public/pyqs.jpeg
    link: '/past-papers',
    buttonText: 'View Papers',
  },
  {
    title: '💬 Real-Time Chat',
    description:
      'Engage with peers instantly. Ask questions, share insights, and get help right when you need it — without the wait.',
    icon: MessageCircle,
    iconColor: 'text-cyan-500',
    image: '/rtc.jpeg',
    link: '/chat',
    buttonText: 'Chat Now',
  },
  {
    title: '🔍 AcademicPal AI - Smart Notes Search',
    description:
      'Powered by AI, our search tool delivers exactly what you need — whether it’s notes, references, or key materials — in seconds.',
    icon: Search,
    iconColor: 'text-lime-500',
    image: '/ai.jpeg',
    link: '/ai-search',
    buttonText: 'Start Searching',
  },
  {
    title: '📤 Access & Contribute Materials',
    description:
      'Give back to the community! Upload your resources and gain access to a growing collection of shared study content.',
    icon: UploadCloud,
    iconColor: 'text-red-500',
    image: '/upload.jpeg',
    link: '/contribute',
    buttonText: 'Upload or Explore',
  },
];

const KeyFeatures = () => {
  return (
      <section className="py-20 px-4 bg-black text-white font-display">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center tracking-tight">📌 Key Features</h2>
      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {features.map((feature) => {
          const IconComponent = feature.icon;
          return (
            <Card
              key={feature.title}
              className="relative bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between mt-4"
            >
              <Link href={feature.link}>
                <div className="relative w-full h-80">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover rounded-t-3xl"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md rounded-full p-1 shadow-lg">
                    <Image
                      src="/academicpal.jpg"
                      alt="AcademicPal Logo"
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                  </div>
                </div>
              </Link>
              <CardContent className="p-6 flex-1 flex flex-col justify-between">
                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <IconComponent className={`w-6 h-6 ${feature.iconColor}`} />
                    <CardTitle className="text-lg md:text-xl font-semibold text-white">
                      {feature.title}
                    </CardTitle>
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed">{feature.description}</p>
                </div>
                <Link href={feature.link}>
                  <Button className="mt-4 w-full flex items-center justify-center gap-2 text-sm font-medium rounded-lg">
                    <IconComponent className={`w-4 h-4 ${feature.iconColor}`} />
                    {feature.buttonText} <ArrowRightCircle size={16} />
                  </Button>
                </Link>
              </CardContent>
              <BorderBeam
                duration={6}
                size={400}
                className="from-transparent via-pink-500 to-transparent"
              />
              <BorderBeam
                duration={6}
                delay={3}
                size={400}
                className="from-transparent via-purple-500 to-transparent"
              />
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default KeyFeatures;