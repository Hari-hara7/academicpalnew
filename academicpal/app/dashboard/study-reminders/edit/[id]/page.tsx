'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Edit2, Loader2 } from 'lucide-react';
import { Toaster, toast } from 'sonner';

export default function EditReminderPage() {
  const router = useRouter();
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [remindAt, setRemindAt] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReminder() {
      try {
        const res = await fetch('/api/study-reminders/get');
        const data = await res.json();

        if (data.success) {
          const reminder = data.reminders.find((r: any) => r._id === id);
          if (reminder) {
            setTitle(reminder.title);
            setDescription(reminder.description || '');
            setRemindAt(reminder.remindAt.slice(0, 16)); // datetime-local format
          } else {
            toast.error('Reminder not found');
            router.push('/dashboard/study-reminders');
          }
        } else {
          toast.error('Failed to fetch reminders');
          router.push('/dashboard/study-reminders');
        }
      } catch {
        toast.error('Network error');
        router.push('/dashboard/study-reminders');
      } finally {
        setLoading(false);
      }
    }
    fetchReminder();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/study-reminders/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, title, description, remindAt }),
    });

    const data = await res.json();
    if (data.success) {
      toast.success('Reminder updated successfully!');
      router.push('/dashboard/study-reminders');
    } else {
      toast.error('Failed to update reminder.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <Loader2 className="animate-spin w-12 h-12 text-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <Toaster position="top-right" />
      <div className="w-full max-w-xl bg-black bg-opacity-80 rounded-xl p-8 shadow-lg">
        <h2 className="flex items-center text-3xl font-extrabold text-white mb-8 gap-2">
          <Edit2 className="w-8 h-8 text-white" />
          Edit Study Reminder
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="flex flex-col">
            <Label className="text-white mb-2">Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g., Finish Algorithms chapter"
              className="bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <Label className="text-white mb-2">Description (optional)</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Details about the reminder"
              className="bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:border-blue-500 resize-none"
              rows={4}
            />
          </div>

          <div className="flex flex-col">
            <Label className="text-white mb-2">Remind At</Label>
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
            Update Reminder
          </Button>
        </form>
      </div>
    </div>
  );
}
