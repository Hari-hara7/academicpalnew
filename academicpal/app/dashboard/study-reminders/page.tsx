'use client';

import { useEffect, useState } from 'react';
import { StudyReminder } from '@/types/studyReminder';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {
  PlusCircle,
  Pencil,
  Trash2
} from 'lucide-react'; // 👈 Import Lucide icons

export default function StudyRemindersPage() {
  const [reminders, setReminders] = useState<StudyReminder[]>([]);
  const [notifiedIds, setNotifiedIds] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const fetchReminders = async () => {
      const res = await fetch('/api/study-reminders/get');
      const data = await res.json();
      if (data.success) {
        setReminders(data.reminders);
      }
    };
    fetchReminders();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      reminders.forEach((reminder) => {
        const remindTime = new Date(reminder.remindAt);
        if (
          Math.abs(remindTime.getTime() - now.getTime()) <= 1000 * 60 &&
          !notifiedIds.includes(reminder._id)
        ) {
          if (Notification.permission === 'granted') {
            new Notification(`⏰ Reminder: ${reminder.title}`, {
              body: reminder.description || '',
            });
            setNotifiedIds((prev) => [...prev, reminder._id]);
          }
        }
      });
    }, 30 * 1000);

    return () => clearInterval(interval);
  }, [reminders, notifiedIds]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this reminder?')) return;

    const res = await fetch('/api/study-reminders/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (data.success) {
      setReminders(reminders.filter((r) => r._id !== id));
    } else {
      alert('Failed to delete reminder.');
    }
  };

  return (
    <div className="min-h-screen bg-black p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        {/* Header with title on left and button on right */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-extrabold text-white drop-shadow-md">
            📅 Study Reminders
          </h2>
          <Button
            className="bg-white text-black font-semibold hover:bg-gray-200 flex items-center gap-2"
            onClick={() => router.push('/dashboard/study-reminders/create')}
          >
            <PlusCircle className="w-5 h-5" />
            Add Reminder
          </Button>
        </div>

        {reminders.length === 0 ? (
          <p className="text-gray-400 text-center py-20 text-lg">No reminders yet.</p>
        ) : (
          <div className="space-y-5">
            {reminders.map((reminder) => (
              <Card
                key={reminder._id}
                className="bg-black bg-opacity-70 border border-white/30 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200"
              >
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-white text-xl font-semibold">{reminder.title}</h3>
                  <p className="text-gray-400 text-sm">
                    {format(new Date(reminder.remindAt), 'PPpp')}
                  </p>
                  {reminder.description && (
                    <p className="text-gray-300">{reminder.description}</p>
                  )}
                  <div className="mt-5 flex gap-4">
                    <Button
                      variant="outline"
                      className="bg-white text-black border-white hover:bg-black-100 flex items-center gap-2"
                      onClick={() =>
                        router.push(`/dashboard/study-reminders/edit/${reminder._id}`)
                      }
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      className="bg-white text-red-600 hover:bg-red-100 flex items-center gap-2"
                      onClick={() => handleDelete(reminder._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
