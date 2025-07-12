'use client';

import React from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BorderBeam } from '@/components/magicui/border-beam';
import {
  Users,
  NotebookText,
  FileText,
  MessageCircle,
  Search,
  UploadCloud,
  ArrowRightCircle,
  Brain,
  CalendarCheck,
  BarChart4,
  AlarmClock,
  Users2,
  CalendarDays,
  Map,
  BrainCircuit,
  MessageSquareMore,
  GraduationCap
} from 'lucide-react';
import Link from 'next/link';

const features = [
    {
    title: ' Comprehensive Notes',
    description:
      'Access crisp, well-organized notes for all subjects. Designed for clarity and speed, these notes help you revise smarter before exams.',
    icon: NotebookText,
    iconColor: 'text-purple-500',
    link: 'https://academicpal.vercel.app/notes.html',
    buttonText: 'Access Notes',
  },
    {
    title: ' Past Question Papers',
    description:
      'Prepare with confidence using past papers. Understand frequently asked questions and get familiar with real exam patterns.',
    icon: FileText,
    iconColor: 'text-orange-500',
    link: 'https://academicpal.vercel.app/Pyq.html',
    buttonText: 'View Papers',
  },
    {
    title: ' Access & Contribute Materials',
    description:
      'Give back to the community! Upload your resources and gain access to a growing collection of shared study content.',
    icon: UploadCloud,
    iconColor: 'text-red-500',
    link: '/upload',
    buttonText: 'Upload or Explore',
  },
  {
  title: 'Create & Explore Mindtrees',
  description:
    'Visualize your learning! Design and browse interactive mind maps crafted by students to simplify complex topics.',
  icon: BrainCircuit, // Lucide icon suggestion
  iconColor: 'text-indigo-500',
  link: '/register',
  buttonText: 'Start Mapping',
}
,
{
  title: 'Peer-to-Peer Tutoring',
  description:
    'Share your knowledge! Become a tutor or find one to guide you through tough subjects and concepts.',
  icon: GraduationCap, // Lucide icon suggestion
  iconColor: 'text-green-600',
  link: '/register',
  buttonText: 'Become or Find a Tutor',
},
{
  title: 'Ask & Answer in Forums',
  description:
    'Got questions? Post them in the community forum and get answers from fellow students, mentors, and enthusiasts.',
  icon: MessageSquareMore, // Lucide icon suggestion
  iconColor: 'text-blue-600',
  link: '/register',
  buttonText: 'Join the Discussion',
},
  {
    title: ' Blogs',
    description:
      'Read and write blogs on study strategies, academic tips, and personal experiences.',
    icon: FileText,
    iconColor: 'text-pink-500',
    link: '/register',
    buttonText: 'Explore Blogs',
  },
  {
  title: 'Tech Roadmaps',
  description:
    'Explore structured roadmaps for various technologies. Stay on track with curated paths for frontend, backend, DevOps, AI, and more.',
  icon: Map, // you can replace this with any Lucide icon
  iconColor: 'text-yellow-500',
  link: '/roadmaps', // or wherever your page lives
  buttonText: 'Explore Roadmaps',
}
,


  {
    title: ' Real-Time Chat',
    description:
      'Engage with peers instantly. Ask questions, share insights, and get help right when you need it — without the wait.',
    icon: MessageCircle,
    iconColor: 'text-cyan-500',
    link: '/chat',
    buttonText: 'Chat Now',
  },
  {
    title: ' AcademicPal AI - Smart Notes Search',
    description:
      'Powered by AI, our search tool delivers exactly what you need — whether it’s notes, references, or key materials — in seconds.',
    icon: Search,
    iconColor: 'text-lime-500',
    link: 'https://academicpal-ml-chatbot-g6gn.vercel.app/',
    buttonText: 'Start Searching',
  },

  {
    title: ' Flashcards',
    description:
      'Memorize key concepts with interactive flashcards tailored to your subjects and topics.',
    icon: Brain, // import from lucide-react or use your own icon
    iconColor: 'text-purple-500',
    link: '/register',
    buttonText: 'Start Reviewing',
  },
  {
    title: ' Study Planner',
    description:
      'Plan your study schedule efficiently with customizable timetables and task lists.',
    icon: CalendarCheck,
    iconColor: 'text-blue-500',
    link: '/register',
    buttonText: 'Plan Now',
  },
  {
    title: ' Performance Analytics',
    description:
      'Track your study hours, identify weak areas, and visualize your progress with detailed charts.',
    icon: BarChart4,
    iconColor: 'text-green-500',
    link: '/register',
    buttonText: 'View Stats',
  },
  {
    title: ' Study Reminders',
    description:
      'Stay on track with personalized study notifications and reminders sent directly to your browser.',
    icon: AlarmClock,
    iconColor: 'text-yellow-500',
    link: '/register',
    buttonText: 'Set Reminders',
  },
 
  {
    title: ' Study Groups',
    description:
      'Join or create study groups with like-minded peers to collaborate, discuss, and grow together.',
    icon: Users2,
    iconColor: 'text-pink-500',
    link: '/register',
    buttonText: 'Join a Group',
  },
 {
    title: ' Timetable Generator',
    description:
      'Create and customize your academic timetable based on your course structure and preferences.',
    icon: CalendarDays,
    iconColor: 'text-indigo-500',
    link: '/register',
    buttonText: 'Generate Timetable',
  }
];

const KeyFeatures = () => {
  return (
    <section className="py-20 px-4 bg-black text-white font-display">
      <h2 className="text-4xl md:text-5xl  mb-12 text-center tracking-tight font-bold font-poppins">
         Key Features
      </h2>
      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {features.map((feature) => {
          const IconComponent = feature.icon;
          return (
            <Card
              key={feature.title}
              className="relative bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between mt-4 font-montserrat"
            >
              <div className="flex justify-center items-center p-6">
                <IconComponent className={`w-16 h-16 ${feature.iconColor}`} />
              </div>
              <CardContent className="px-6 pb-6 flex-1 flex flex-col justify-between">
                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <IconComponent className={`w-6 h-6 ${feature.iconColor}`} />
                    <CardTitle className="text-lg md:text-xl font-semibold text-white font-montserrat">
                      {feature.title}
                    </CardTitle>
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed font-lato">{feature.description}</p>
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
