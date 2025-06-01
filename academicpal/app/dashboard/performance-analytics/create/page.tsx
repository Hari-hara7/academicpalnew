'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Book, Clock, Calendar, BarChart } from 'lucide-react';

export default function CreateStudySession() {
  const router = useRouter();
  const [form, setForm] = useState({
    subject: '',
    hours: '',
    date: '',
    performance: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/performance-analytics/create', {
      method: 'POST',
      body: JSON.stringify({
        subject: form.subject,
        hours: parseFloat(form.hours),
        date: form.date,
        performance: form.performance ? parseInt(form.performance) : undefined,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      router.push('/dashboard/performance-analytics');
    } else {
      alert('Failed to log study session');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-black rounded-xl shadow-lg mt-8 text-white">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Book className="w-6 h-6 text-white" />
        Log Study Session
      </h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="subject" className="flex items-center gap-2 text-white">
            <Book className="w-4 h-4" />
            Subject
          </Label>
          <Input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
            className="bg-transparent border border-white text-white placeholder:text-white/70 rounded-lg px-4 py-2 mt-4 focus:outline-none focus:ring-2 focus:ring-white transition-colors"
            placeholder="Enter subject"
          />
        </div>
        <div>
          <Label htmlFor="hours" className="flex items-center gap-2 text-white">
            <Clock className="w-4 h-4" />
            Hours Studied
          </Label>
          <Input
            type="number"
            name="hours"
            value={form.hours}
            onChange={handleChange}
            required
            className="bg-transparent border border-white text-white placeholder:text-white/70 rounded-lg px-4 py-2 mt-4  focus:outline-none focus:ring-2 focus:ring-white transition-colors"
            placeholder="Hours"
          />
        </div>
        <div>
          <Label htmlFor="date" className="flex items-center gap-2 text-white">
            <Calendar className="w-4 h-4" />
            Date
          </Label>
          <Input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="bg-transparent border border-white text-white rounded-lg px-4 py-2 mt-4 focus:outline-none focus:ring-2 focus:ring-white transition-colors"
          />
        </div>
        <div>
          <Label htmlFor="performance" className="flex items-center gap-2 text-white">
            <BarChart className="w-4 h-4" />
            Performance (1-10, optional)
          </Label>
          <Input
            type="number"
            name="performance"
            value={form.performance}
            onChange={handleChange}
            min={1}
            max={10}
            className="bg-transparent border border-white text-white placeholder:text-white/70 mt-4 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white transition-colors"
            placeholder="Performance"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-white text-black rounded-lg font-semibold py-2 hover:bg-gray-300 transition-colors"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
