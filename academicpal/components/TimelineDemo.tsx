"use client";

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";
import {
  Upload,
  FileText,
  BookOpen,
  ScrollText,
  MessageCircle,
  Search,
  BarChart2,
  Brain,
  CalendarClock,
  Users2,
} from "lucide-react";


export function TimelineDemo() {
  const data = [
    {
      title: "2023",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-neutral-200 md:text-sm">
            Academic Pal started with the aim of providing students with quality study materials online.
            The platform was initially built using simple technologies like <strong>HTML, CSS, JavaScript</strong>,
            and some third-party APIs.
          </p>
          <p className="mb-4 text-xs font-normal text-neutral-200 md:text-sm">
            Despite the minimal stack, it was <strong>approved for Google AdSense</strong> and attracted
            <strong> 1,000+ users</strong> within a few months of launch.
          </p>
         
<div className="grid grid-cols-2 gap-4">
  <Image
    src="/adso.jpg"
    alt="2023 Screenshot 1"
    width={500}
    height={300}
    className="h-20 w-full rounded-lg object-cover shadow-lg md:h-44 lg:h-60"
  />
  <Image
    src="/1.1k.jpg"
    alt="2023 Screenshot 2"
    width={500}
    height={300}
    className="h-20 w-full rounded-lg object-cover shadow-lg md:h-44 lg:h-60"
  />
</div>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-neutral-200 md:text-sm">
            In 2024, the platform evolved. The tech stack was upgraded to <strong>Vite + React, TypeScript, Firebase, TailwindCSS</strong>.
            Key features like <strong>dynamic notes upload</strong> and other enhancements were added.
          </p>
          <p className="mb-4 text-xs font-normal text-neutral-200 md:text-sm">
            This modernized version reached over <strong>2,000 users</strong> and introduced improved design and better performance.
          </p>
         
<div className="grid grid-cols-2 gap-4">
  <Image
    src="/2k.jpg"
    alt="2023 Screenshot 1"
    width={500}
    height={300}
    className="h-20 w-full rounded-lg object-cover shadow-lg md:h-44 lg:h-60"
  />
 
</div>
        </div>
      ),
    },
    {
      title: "2025",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-neutral-200 md:text-sm">
            In 2025, Academic Pal shifted to an <strong>advanced tech stack</strong> with <strong>Next.js 15, TailwindCSS, Supabase, Firebase, MongoDB, TypeScript, ShadCN UI, Magic UI, and Machine Learning</strong> integration.
          </p>
          <p className="mb-4 text-xs font-normal text-neutral-200 md:text-sm">
            These advancements elevated user experience and scalability, growing the platform to <strong>4,000+ users</strong>.
          </p>
          
<div className="grid grid-cols-2 gap-4">
  <Image
    src="/4k.png"
    alt="2023 Screenshot 1"
    width={500}
    height={300}
    className="h-20 w-full rounded-lg object-cover shadow-lg md:h-44 lg:h-60"
  />
 
</div>
        </div>
      ),
    },
    {
      title: "Changelog",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-neutral-200 md:text-sm">
            Recent Academic Pal updates:
          </p>
          <div className="mb-8 space-y-2">
       <div className="mb-8 space-y-3">
  <div className="flex items-center gap-2 text-sm text-neutral-300">
    <Upload className="w-4 h-4" /> Upload Your Notes & Materials – Grow the community, contribute easily
  </div>
  <div className="flex items-center gap-2 text-sm text-neutral-300">
    <FileText className="w-4 h-4" /> Read & Write Blogs – Share strategies, tips, and experiences
  </div>
  <div className="flex items-center gap-2 text-sm text-neutral-300">
    <BookOpen className="w-4 h-4" /> Access Crisp, Comprehensive Notes
  </div>
  <div className="flex items-center gap-2 text-sm text-neutral-300">
    <ScrollText className="w-4 h-4" /> View Past Question Papers
  </div>
  <div className="flex items-center gap-2 text-sm text-neutral-300">
    <MessageCircle className="w-4 h-4" /> Real-Time Chat
  </div>
  <div className="flex items-center gap-2 text-sm text-neutral-300">
    <Search className="w-4 h-4" /> AI Smart Search Tool
  </div>
  <div className="flex items-center gap-2 text-sm text-neutral-300">
    <BarChart2 className="w-4 h-4" /> Performance Analytics & Study Reminders
  </div>
  <div className="flex items-center gap-2 text-sm text-neutral-300">
    <Brain className="w-4 h-4" /> Flashcards & Study Planner
  </div>
  <div className="flex items-center gap-2 text-sm text-neutral-300">
    <CalendarClock className="w-4 h-4" /> Timetable Generator
  </div>
  <div className="flex items-center gap-2 text-sm text-neutral-300">
    <Users2 className="w-4 h-4" /> Join or Create Study Groups
  </div>
</div>

          </div>
       
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-black py-10 px-4 md:px-8">
      <Timeline data={data} />
    </div>
  );
}
