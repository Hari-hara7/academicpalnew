// app/dashboard/layout.tsx
'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalendarAlt, faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Mobile Hamburger */}
      <div className="lg:hidden absolute top-4 left-4 z-50 mt-8">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-white text-black rounded-md focus:outline-none"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative z-40 bg-black w-64 p-6 transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <h2 className="text-2xl font-extrabold mb-8 tracking-wide">Academic Pal</h2>
        <nav className="space-y-6">
          <Link href="/dashboard" className="flex items-center space-x-2 hover:text-gray-300">
            <FontAwesomeIcon icon={faHome} />
            <span>Home</span>
          </Link>
          <Link href="/dashboard/timetable" className="flex items-center space-x-2 hover:text-gray-300">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span>Timetable</span>
          </Link>
          <form method="POST" action="/api/auth/logout">
            <button
              type="submit"
              className="flex items-center space-x-2 bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-all duration-300"
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Logout</span>
            </button>
          </form>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-6 py-10 lg:ml-5 mt-16 lg:mt-0 bg-black text-white">{children}</main>
    </div>
  );
}
