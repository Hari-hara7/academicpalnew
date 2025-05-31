// app/dashboard/timetable/page.tsx
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
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">{tt.title}</h2>
              <p className="text-sm text-gray-500">{tt.days.length} days scheduled</p>
              <div className="mt-2 space-x-2">
                <Link href={`/dashboard/timetable/edit/${tt._id}`}>
                  <Button size="sm" variant="outline">Edit</Button>
                </Link>
                <Link href={`/dashboard/timetable/delete/${tt._id}`}>
                  <Button size="sm" variant="destructive">Delete</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
