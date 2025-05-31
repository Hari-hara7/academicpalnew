'use client';

import { useEffect, useState } from 'react';
import { TimetableType } from '@/types/timetable';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, CalendarPlus } from 'lucide-react';

export default function TimetableListPage() {
  const [timetables, setTimetables] = useState<TimetableType[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/timetable/get');
      const data = await res.json();
      setTimetables(data);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10 font-inter">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Your Timetables</h1>
          <Link href="/dashboard/timetable/create">
            <Button className="bg-white text-black font-medium hover:bg-gray-100 transition flex items-center gap-2 px-5 py-2 rounded-xl shadow-lg">
              <CalendarPlus className="w-4 h-4" />
              Create New
            </Button>
          </Link>
        </div>

        {/* Timetable Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {timetables.map((tt) => (
            <div
              key={tt._id}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-6 shadow-xl transition hover:border-white/20"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{tt.title}</h2>
                  <p className="text-sm text-white/60">{tt.days.length} days scheduled</p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/dashboard/timetable/edit/${tt._id}`}>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white/10 transition"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href={`/dashboard/timetable/delete/${tt._id}`}>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-400 hover:bg-red-500/10 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                {tt.days.map((day, dIdx) => (
                  <div key={dIdx}>
                    <h3 className="text-white/80 font-medium">{day.day}</h3>
                    <ul className="ml-4 list-disc text-sm text-white/60">
                      {day.subjects.map((subject, sIdx) => (
                        <li key={sIdx}>
                          <span className="text-white font-medium">{subject.name}</span> —{' '}
                          {subject.time}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
