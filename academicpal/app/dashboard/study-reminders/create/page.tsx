'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { PlusCircle } from 'lucide-react';
import { Toaster, toast } from 'sonner';

export default function CreateReminderPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [remindAt, setRemindAt] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/study-reminders/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, remindAt }),
    });

    const data = await res.json();
    if (data.success) {
      toast.success('Reminder created successfully!');
      router.push('/dashboard/study-reminders');
    } else {
      toast.error('Failed to create reminder.');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 py-10">
      <Toaster position="top-right" />
      <div className="w-full max-w-md sm:max-w-xl bg-black bg-opacity-80 rounded-xl p-6 sm:p-8 shadow-lg">
        <h2 className="flex items-center text-2xl sm:text-3xl font-extrabold text-white mb-6 sm:mb-8 gap-2">
          <PlusCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          New Study Reminder
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-5 sm:gap-6">
          <div className="flex flex-col">
            <Label className="text-white mb-1 sm:mb-2">Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g., Finish Algorithms chapter"
              className="bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <Label className="text-white mb-1 sm:mb-2">Description (optional)</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Details about the reminder"
              className="bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:border-blue-500 resize-none"
              rows={4}
            />
          </div>

          <div className="flex flex-col">
            <Label className="text-white mb-1 sm:mb-2">Remind At</Label>
            <Input
              type="datetime-local"
              value={remindAt}
              onChange={(e) => setRemindAt(e.target.value)}
              required
              className="bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:border-blue-500"
            />
          </div>

          <Button
            type="submit"
            className="bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
          >
            Create Reminder
          </Button>
        </form>
      </div>
    </div>
  );
}
