'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

export default function CreateTimetablePage() {
  const [title, setTitle] = useState('');
  const [days, setDays] = useState([{ day: '', subjects: [{ name: '', time: '' }] }]);
  const router = useRouter();

  const addDay = () => setDays([...days, { day: '', subjects: [{ name: '', time: '' }] }]);

  const updateDay = (index: number, field: string, value: string) => {
    const updated = [...days];
    updated[index][field] = value;
    setDays(updated);
  };

  const updateSubject = (dIndex: number, sIndex: number, field: string, value: string) => {
    const updated = [...days];
    updated[dIndex].subjects[sIndex][field] = value;
    setDays(updated);
  };

  const addSubject = (dIndex: number) => {
    const updated = [...days];
    updated[dIndex].subjects.push({ name: '', time: '' });
    setDays(updated);
  };

  const handleSubmit = async () => {
    const res = await fetch('/api/timetable/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, days }),
    });

    if (res.ok) {
      router.push('/dashboard/timetable');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Timetable</h1>

      <Input
        className="mb-4"
        placeholder="Timetable Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {days.map((day, dIndex) => (
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
                  placeholder="Time (e.g. 10:00AM)"
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

      <div className="flex gap-2">
        <Button onClick={addDay} variant="secondary">+ Add Day</Button>
        <Button onClick={handleSubmit}>Save Timetable</Button>
      </div>
    </div>
  );
}
