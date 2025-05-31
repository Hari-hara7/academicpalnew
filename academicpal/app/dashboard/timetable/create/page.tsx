'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Save } from 'lucide-react';
import { toast } from 'sonner';

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
      toast.success('Timetable saved successfully!', { duration: 3000 });
      router.push('/dashboard/timetable');
    } else {
      toast.error('Failed to save timetable.', { duration: 3000 });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col gap-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mt-8">Create Timetable</h1>

      <Input
        className="bg-transparent border border-white/20 text-white placeholder-gray-400 focus:ring-white"
        placeholder="Timetable Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {days.map((day, dIndex) => (
        <Card
          key={dIndex}
          className="bg-transparent border border-white/20 shadow-none"
        >
          <CardHeader>
            <CardTitle className="text-lg text-white">Day {dIndex + 1}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Input
              className="bg-transparent border border-white/20 text-white placeholder-gray-400 focus:ring-white"
              placeholder="Day (e.g. Monday)"
              value={day.day}
              onChange={(e) => updateDay(dIndex, 'day', e.target.value)}
            />

            {day.subjects.map((subject, sIndex) => (
              <div
                key={sIndex}
                className="flex flex-col sm:flex-row gap-2"
              >
                <Input
                  className="bg-transparent border border-white/20 text-white placeholder-gray-400 focus:ring-white"
                  placeholder="Subject"
                  value={subject.name}
                  onChange={(e) => updateSubject(dIndex, sIndex, 'name', e.target.value)}
                />
                <Input
                  className="bg-transparent border border-white/20 text-white placeholder-gray-400 focus:ring-white"
                  placeholder="Time (e.g. 10:00AM)"
                  value={subject.time}
                  onChange={(e) => updateSubject(dIndex, sIndex, 'time', e.target.value)}
                />
              </div>
            ))}

            <Button
              variant="ghost"
              size="sm"
              className="border border-white/20 text-white hover:bg-white/10 mt-2 flex items-center gap-1"
              onClick={() => addSubject(dIndex)}
            >
              <Plus className="h-4 w-4 text-white" />
              Add Subject
            </Button>
          </CardContent>
        </Card>
      ))}

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="ghost"
          className="border border-white/20 text-white hover:bg-white/10 flex items-center gap-2"
          onClick={addDay}
        >
          <Plus className="h-4 w-4 text-white" />
          Add Day
        </Button>
        <Button
          className="bg-white text-black hover:bg-gray-200 flex items-center gap-2"
          onClick={handleSubmit}
        >
          <Save className="h-4 w-4" />
          Save Timetable
        </Button>
      </div>
    </div>
  );
}
