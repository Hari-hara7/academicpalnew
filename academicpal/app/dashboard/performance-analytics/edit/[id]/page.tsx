'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { StudySession } from '@/types/studySession';

export default function EditStudySession() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [form, setForm] = useState<StudySession>({
    _id: '',
    subject: '',
    hours: 0,
    date: '',
    performance: undefined,
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/performance-analytics/get');
      const json = await res.json();
      const target = json.sessions.find((s: StudySession) => s._id === id);
      if (target) {
        setForm({
          ...target,
          date: target.date.slice(0, 10), // format date for input
        });
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/performance-analytics/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: form._id,
        subject: form.subject,
        hours: parseFloat(form.hours.toString()),
        date: form.date,
        performance: form.performance ? parseInt(form.performance.toString()) : undefined,
      }),
    });

    if (res.ok) {
      router.push('/dashboard/performance-analytics');
    } else {
      alert('Failed to update session');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-semibold mb-4">Edit Study Session</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input name="subject" value={form.subject} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="hours">Hours Studied</Label>
          <Input
            type="number"
            name="hours"
            value={form.hours}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="date">Date</Label>
          <Input type="date" name="date" value={form.date} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="performance">Performance (1–10)</Label>
          <Input
            type="number"
            name="performance"
            min={1}
            max={10}
            value={form.performance || ''}
            onChange={handleChange}
          />
        </div>
        <Button type="submit" className="w-full">
          Update
        </Button>
      </form>
    </div>
  );
}
