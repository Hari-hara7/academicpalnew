'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { TimetableType } from '@/types/timetable';

export default function EditTimetablePage() {
  const { id } = useParams();
  const router = useRouter();

  const [timetable, setTimetable] = useState<TimetableType | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/timetable/get');
      const all = await res.json();
      const current = all.find((t: TimetableType) => t._id === id);
      setTimetable(current);
    }
    load();
  }, [id]);

  const updateDay = (index: number, field: string, value: string) => {
    const updated = { ...timetable! };
    updated.days[index][field] = value;
    setTimetable(updated);
  };

  const updateSubject = (dIndex: number, sIndex: number, field: string, value: string) => {
    const updated = { ...timetable! };
    updated.days[dIndex].subjects[sIndex][field] = value;
    setTimetable(updated);
  };

  const addSubject = (dIndex: number) => {
    const updated = { ...timetable! };
    updated.days[dIndex].subjects.push({ name: '', time: '' });
    setTimetable(updated);
  };

  const handleSubmit = async () => {
    const res = await fetch('/api/timetable/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, title: timetable?.title, days: timetable?.days }),
    });

    if (res.ok) {
      router.push('/dashboard/timetable');
    }
  };

  if (!timetable) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Timetable</h1>

      <Input
        className="mb-4"
        value={timetable.title}
        onChange={(e) => setTimetable({ ...timetable, title: e.target.value })}
      />

      {timetable.days.map((day, dIndex) => (
        <Card key={dIndex} className="mb-4">
          <CardContent className="p-4 space-y-2">
            <Input
              placeholder="Day (e.g. Monday)"
              value={day.day}
              onChange={(e) => updateDay(dIndex, 'day', e.target.value)}
            />

            {day.subjects.map((subject, sIndex) => (
              <div key={sIndex} className="flex gap-2">
                <Input
                  placeholder="Subject"
                  value={subject.name}
                  onChange={(e) => updateSubject(dIndex, sIndex, 'name', e.target.value)}
                />
                <Input
                  placeholder="Time"
                  value={subject.time}
                  onChange={(e) => updateSubject(dIndex, sIndex, 'time', e.target.value)}
                />
              </div>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => addSubject(dIndex)}
            >
              + Add Subject
            </Button>
          </CardContent>
        </Card>
      ))}

      <Button onClick={handleSubmit}>Save Changes</Button>
    </div>
  );
}
