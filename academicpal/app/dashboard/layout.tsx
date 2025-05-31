// app/dashboard/layout.tsx
import { ReactNode } from 'react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-6">
        <h2 className="text-xl font-bold mb-6">Academic Pal</h2>
        <nav className="space-y-4">
          <Link href="/dashboard" className="block hover:underline">Home</Link>
          <Link href="/dashboard/timetable" className="block hover:underline">Timetable</Link>
          <form method="POST" action="/api/auth/logout">
            <button type="submit" className="text-red-500 hover:underline">Logout</button>
          </form>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-white">{children}</main>
    </div>
  );
}
