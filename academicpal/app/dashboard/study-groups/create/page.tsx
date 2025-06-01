'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

export default function CreateStudyGroupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    subject: '',
    groupName: '',
    description: '',
    meetingTime: '',
    location: '',
    platform: '',
    maxMembers: 10,
    isOpen: true,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!form.subject || !form.groupName || !form.meetingTime || !form.location) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/study-groups/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        router.push(`/dashboard/study-groups/${data.group._id}`);
      } else {
        setError(data.message || 'Failed to create group');
      }
    } catch {
      setError('Failed to create group');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-2xl border border-white/20 rounded-2xl p-8 shadow-lg space-y-6">
        <h1 className="text-3xl font-semibold">➕ Create New Study Group</h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="subject"
            placeholder="Subject / Course / Topic *"
            value={form.subject}
            onChange={handleChange}
            required
            className="bg-transparent border border-white/20 text-white placeholder-white/50 focus:ring-white/50"
          />
          <Input
            name="groupName"
            placeholder="Group Name *"
            value={form.groupName}
            onChange={handleChange}
            required
            className="bg-transparent border border-white/20 text-white placeholder-white/50"
          />
          <Textarea
            name="description"
            placeholder="Phone Number & Date"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="bg-transparent border border-white/20 text-white placeholder-white/50"
          />
          <Input
            name="meetingTime"
            placeholder="Meeting Time(s) * (e.g. Mon 5-6pm)"
            value={form.meetingTime}
            onChange={handleChange}
            required
            className="bg-transparent border border-white/20 text-white placeholder-white/50"
          />
          <Input
            name="location"
            placeholder="Location or Platform *"
            value={form.location}
            onChange={handleChange}
            required
            className="bg-transparent border border-white/20 text-white placeholder-white/50"
          />
          <Input
            name="platform"
            placeholder="Platform (Zoom, Discord, etc.)"
            value={form.platform}
            onChange={handleChange}
            className="bg-transparent border border-white/20 text-white placeholder-white/50"
          />
          <Input
            type="number"
            name="maxMembers"
            placeholder="Max Members"
            value={form.maxMembers}
            onChange={handleChange}
            min={1}
            max={1000}
            required
            className="bg-transparent border border-white/20 text-white placeholder-white/50"
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isOpen"
              name="isOpen"
              checked={form.isOpen}
              onCheckedChange={(checked) =>
                setForm((prev) => ({ ...prev, isOpen: !!checked }))
              }
            />
            <label htmlFor="isOpen" className="text-sm text-white">
              Open Group (anyone can join)
            </label>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black hover:bg-white/80 transition"
          >
            {loading ? 'Creating...' : 'Create Group'}
          </Button>
        </form>
      </div>
    </div>
  );
}
