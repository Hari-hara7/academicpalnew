'use client';

import { useEffect, useState } from 'react';
import { StudyReminder } from '@/types/studyReminder';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';

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
    <div className="min-h-screen bg-black p-4 sm:p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 mt-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-md">
             Study Reminders
          </h2>
          <Button
            className="bg-white text-black font-semibold hover:bg-gray-200 flex items-center gap-2"
            onClick={() => router.push('/dashboard/study-reminders/create')}
          >
            <PlusCircle className="w-5 h-5" />
            <span className="hidden sm:inline">Add Reminder</span>
          </Button>
        </div>

        {reminders.length === 0 ? (
          <p className="text-gray-400 text-center py-20 text-base sm:text-lg">
            No reminders yet.
          </p>
        ) : (
          <div className="space-y-5">
            {reminders.map((reminder) => (
              <Card
                key={reminder._id}
                className="bg-black bg-opacity-70 border border-white/30 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200"
              >
                <CardContent className="p-4 sm:p-6 space-y-3">
                  <h3 className="text-white text-lg sm:text-xl font-semibold">
                    {reminder.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {format(new Date(reminder.remindAt), 'PPpp')}
                  </p>
                  {reminder.description && (
                    <p className="text-gray-300 text-sm sm:text-base">
                      {reminder.description}
                    </p>
                  )}
                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="ghost"
                      className="border border-white/40 hover:bg-white text-white flex items-center gap-2 justify-center"
                      onClick={() =>
                        router.push(`/dashboard/study-reminders/edit/${reminder._id}`)
                      }
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      className="border border-red-500/30 hover:bg-red-500 text-red-400 flex items-center gap-2 justify-center"
                       onClick={() =>
                        router.push(`/dashboard/study-reminders/delete/${reminder._id}`)
                      }
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
