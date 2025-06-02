'use client';

import { useEffect, useState } from 'react';
import { TimetableType } from '@/types/timetable';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, CalendarPlus } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export default function TimetableListPage() {
  const [timetables, setTimetables] = useState<TimetableType[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/timetable/get');
        const data = await res.json();
        console.log('Fetched data:', data);

        if (Array.isArray(data)) {
          setTimetables(data);
        } else if (Array.isArray(data.timetables)) {
          setTimetables(data.timetables);
        } else {
          setTimetables([]);
        }
      } catch (error) {
        console.error('Error fetching timetables:', error);
        setTimetables([]);
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10 font-inter">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Your Timetables</h1>
          <Link href="/dashboard/timetable/create" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-white text-black font-medium hover:bg-gray-100 transition flex items-center justify-center sm:justify-start gap-2 px-5 py-2 rounded-xl shadow-lg">
              <CalendarPlus className="w-4 h-4" />
              Create New
            </Button>
          </Link>
        </div>

        {/* Timetable Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {timetables.length > 0 ? (
            timetables.map((tt) => (
              <Card
                key={tt._id}
                className="bg-transparent border border-white/20 backdrop-blur-md shadow-md hover:scale-[1.01] transition-transform"
              >
                <CardHeader>
                  <div className="flex justify-between items-center gap-2 flex-wrap">
                    <h2 className="text-lg md:text-xl font-semibold text-white break-words">{tt.title}</h2>
                    <Badge className="bg-white/10 text-white border border-white/40 whitespace-nowrap">
                      {tt.days.length} days
                    </Badge>
                  </div>
                </CardHeader>
                <Separator className="bg-white/40" />
                <CardContent className="space-y-3 pt-4 text-white/90 text-sm sm:text-base">
                  {tt.days.map((day, dIdx) => (
                    <div key={dIdx} className="space-y-1">
                      <h3 className="text-white/80 font-medium">{day.day}</h3>
                      <ul className="ml-4 list-disc text-white/60">
                        {day.subjects.map((subject, sIdx) => (
                          <li key={sIdx}>
                            <span className="text-white font-medium">{subject.name}</span> —{' '}
                            {subject.time}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Link href={`/dashboard/timetable/edit/${tt._id}`}>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="border border-white/40 hover:bg-white text-white flex items-center gap-2"
                      >
                        <Pencil className="w-4 h-4" />
                        Edit
                      </Button>
                    </Link>
                    <Link href={`/dashboard/timetable/delete/${tt._id}`}>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="border border-red-500/30 hover:bg-red-500 text-red-400 flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center text-white/60">No timetables found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
