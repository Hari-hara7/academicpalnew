'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, Home, Calendar, LogOut,BookOpen,ClipboardList,BellRing,BarChart2 } from 'lucide-react';
import { FaPenNib , FaUsers } from 'react-icons/fa';
import { Toaster } from 'sonner';


export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-black text-white relative">
      {/* Mobile toggle button */}
       <Toaster position="top-center" richColors />
      <div className="lg:hidden absolute top-4 left-4 z-50 mt-8">
        <Button
          variant="outline"
          size="icon"
          className="bg-white text-black hover:bg-gray-200"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative z-40 h-full w-64 bg-black p-6 transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <h2 className="text-2xl font-extrabold mb-8 tracking-wide">Academic Pal</h2>
        <nav className="space-y-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded px-3 py-2 hover:bg-white hover:text-black transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <Link
            href="/dashboard/timetable"
            className="flex items-center gap-2 rounded px-3 py-2 hover:bg-white hover:text-black transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <Calendar className="h-4 w-4" />
            <span>Timetable</span>
          </Link>

          <Link
  href="/dashboard/flashcards"
  className="flex items-center gap-2 rounded px-3 py-2 hover:bg-white hover:text-black transition-colors"
  onClick={() => setIsSidebarOpen(false)} // if you have sidebar toggle state
>
  <BookOpen className="h-4 w-4" />
  <span>Flashcards</span>
</Link>
<Link
  href="/dashboard/study-planner"
  className="flex items-center gap-2 rounded px-3 py-2 hover:bg-white hover:text-black transition-colors"
  onClick={() => setIsSidebarOpen(false)} // if you have sidebar toggle state
>
  <ClipboardList className="h-4 w-4" />
  <span>Study Planner</span>
</Link>

<Link
  href="/dashboard/performance-analytics"
  className="flex items-center gap-2 rounded px-3 py-2 hover:bg-white hover:text-black transition-colors"
  onClick={() => setIsSidebarOpen(false)} // if you have sidebar toggle state
>
  <BarChart2 className="h-4 w-4" />
  <span>Performance Analytics</span>
</Link>


<Link
  href="/dashboard/study-reminders"
  className="flex items-center gap-2 rounded px-3 py-2 hover:bg-white hover:text-black transition-colors"
  onClick={() => setIsSidebarOpen(false)} // if you have sidebar toggle state
>
  <BellRing className="h-4 w-4" />
  <span>Study Reminders</span>
</Link>
        
<Link
  href="/dashboard/blogs"
  className="flex items-center gap-2 rounded px-3 py-2 hover:bg-white hover:text-black transition-colors"
  onClick={() => setIsSidebarOpen(false)}
>
  <FaPenNib className="h-4 w-4" />
  <span>Blogs</span>
</Link>
<Link
  href="/dashboard/study-groups"
  className="flex items-center gap-2 rounded px-3 py-2 hover:bg-white hover:text-black transition-colors"
  onClick={() => setIsSidebarOpen(false)}
>
  <FaUsers className="h-4 w-4" />
  <span>Study Groups</span>
</Link>


          <form method="POST" action="/api/auth/logout" className="mt-4">
            <Button
              type="submit"
              variant="outline"
              className="bg-white text-black hover:bg-gray-200 w-full flex items-center gap-2"
              onClick={() => setIsSidebarOpen(false)}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </form>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-6 py-10 lg:ml-5 mt-16 lg:mt-0">{children}</main>
    </div>
  );
}
