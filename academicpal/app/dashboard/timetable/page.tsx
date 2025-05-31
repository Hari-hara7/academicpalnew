'use client';

import { useEffect, useState } from 'react';
import { TimetableType } from '@/types/timetable';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Timetables</h1>

      <Link href="/dashboard/timetable/create">
        <Button className="mb-4">+ Create New</Button>
      </Link>

      <div className="grid grid-cols-1 gap-4">
        {timetables.map((tt) => (
          <Card key={tt._id}>
            <CardContent className="p-4 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{tt.title}</h2>
                  <p className="text-sm text-gray-500">{tt.days.length} days scheduled</p>
                </div>
                <div className="space-x-2">
                  <Link href={`/dashboard/timetable/edit/${tt._id}`}>
                    <Button size="sm" variant="outline">Edit</Button>
                  </Link>
                  <Link href={`/dashboard/timetable/delete/${tt._id}`}>
                    <Button size="sm" variant="destructive">Delete</Button>
                  </Link>
                </div>
              </div>

              {/* Timetable Day and Subjects */}
              <div className="space-y-2">
                {tt.days.map((day, dIdx) => (
                  <div key={dIdx}>
                    <h3 className="font-medium">{day.day}</h3>
                    <ul className="ml-4 list-disc text-sm text-gray-700">
                      {day.subjects.map((subject, sIdx) => (
                        <li key={sIdx}>
                          <span className="font-semibold">{subject.name}</span> — {subject.time}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
