'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Menu, Home, Calendar, LogOut, BookOpen, ClipboardList,
  BellRing, BarChart2 
} from 'lucide-react';
import { FaProjectDiagram } from 'react-icons/fa';
import { FaPenNib, FaUsers } from 'react-icons/fa';
import { Toaster } from 'sonner';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { href: '/dashboard', icon: <Home className="h-4 w-4" />, label: 'Home' },
    { href: '/dashboard/timetable', icon: <Calendar className="h-4 w-4" />, label: 'Timetable' },
    { href: '/dashboard/flashcards', icon: <BookOpen className="h-4 w-4" />, label: 'Flashcards' },
    { href: '/dashboard/study-planner', icon: <ClipboardList className="h-4 w-4" />, label: 'Study Planner' },
    { href: '/dashboard/performance-analytics', icon: <BarChart2 className="h-4 w-4" />, label: 'Analytics' },
    { href: '/dashboard/study-reminders', icon: <BellRing className="h-4 w-4" />, label: 'Reminders' },
    { href: '/dashboard/blogs', icon: <FaPenNib className="h-4 w-4" />, label: 'Blogs' },
    { href: '/dashboard/study-groups', icon: <FaUsers className="h-4 w-4" />, label: 'Groups' },
     { href: '/dashboard/mind-map', icon: <FaProjectDiagram className="h-4 w-4" />, label: 'Mind-map' },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white relative overflow-hidden">
      <Toaster position="top-center" richColors />

      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-5 left-5 z-50 mt-8">
        <Button
          variant="outline"
          size="icon"
          className="bg-black text-white border border-white hover:bg-white hover:text-black"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-black border-r border-white/20 transition-transform duration-300 ease-in-out p-6 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <h1 className="text-3xl font-bold mb-8 tracking-tight mt-16 font-bold font-poppins">
          Academic <span className="text-blue-400">Pal</span>
        </h1>

        <nav className="space-y-2">
          {navItems.map(({ href, icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white hover:text-black transition"
              onClick={() => setIsSidebarOpen(false)}
            >
              {icon}
              <span className="text-sm font-medium">{label}</span>
            </Link>
          ))}

          <form method="POST" action="/api/auth/logout" className="pt-6">
            <Button
              type="submit"
              variant="outline"
              className="w-full flex items-center gap-2 bg-white text-black hover:bg-gray-200"
              onClick={() => setIsSidebarOpen(false)}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </form>
        </nav>
      </aside>

    
      <div className="hidden lg:block fixed top-0 left-64 h-full w-[1px] bg-white/20 z-30"></div>

     
      <main className="flex-1 px-6 py-10 mt-16 lg:mt-0 lg:ml-64 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
