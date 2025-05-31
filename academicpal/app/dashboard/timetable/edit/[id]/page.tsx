'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { TimetableType } from '@/types/timetable';
import { Save, Plus } from 'lucide-react';

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
      toast.success('Timetable updated successfully!');
      router.push('/dashboard/timetable');
    } else {
      toast.error('Failed to update timetable.');
    }
  };

  if (!timetable)
    return <p className="text-white text-center">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-black p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 mt-8 text-white">Edit Timetable</h1>

        <Input
          className="mb-4 bg-transparent border border-white/30 text-white placeholder:text-white/50"
          value={timetable.title}
          onChange={(e) => setTimetable({ ...timetable, title: e.target.value })}
          placeholder="Timetable Title"
        />

        {timetable.days.map((day, dIndex) => (
          <Card
            key={dIndex}
            className="mb-4 border border-white/20 bg-black/40 text-white"
          >
            <CardContent className="p-4 space-y-3">
              <Input
                placeholder="Day (e.g. Monday)"
                className="bg-transparent border border-white/30 text-white placeholder:text-white/50"
                value={day.day}
                onChange={(e) => updateDay(dIndex, 'day', e.target.value)}
              />

              {day.subjects.map((subject, sIndex) => (
                <div key={sIndex} className="flex gap-2">
                  <Input
                    placeholder="Subject"
                    className="bg-transparent border border-white/30 text-white placeholder:text-white/50"
                    value={subject.name}
                    onChange={(e) => updateSubject(dIndex, sIndex, 'name', e.target.value)}
                  />
                  <Input
                    placeholder="Time"
                    className="bg-transparent border border-white/30 text-white placeholder:text-white/50"
                    value={subject.time}
                    onChange={(e) => updateSubject(dIndex, sIndex, 'time', e.target.value)}
                  />
                </div>
              ))}

              <Button
                variant="outline"
                size="sm"
                onClick={() => addSubject(dIndex)}
                className="border-white/30 text-black flex gap-2 items-center hover:bg-white hover:text-black"
              >
                <Plus className="w-4 h-4" />
                Add Subject
              </Button>
            </CardContent>
          </Card>
        ))}

        <Button
          onClick={handleSubmit}
          className="mt-4 w-full bg-white text-black flex gap-2 items-center hover:bg-gray-200"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
