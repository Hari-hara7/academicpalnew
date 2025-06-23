'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Toaster, toast } from 'sonner';

export default function DeleteReminderPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const res = await fetch('/api/study-reminders/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      toast.success('Reminder deleted successfully');
      setTimeout(() => {
        router.push('/dashboard/study-reminders');
      }, 1200);
    } else {
      toast.error('Failed to delete reminder');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6">
      <Toaster richColors position="top-center" />

      <div className="w-full max-w-md bg-black bg-opacity-80 text-center rounded-xl p-6 sm:p-8 shadow-lg border border-white/20">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-red-500">
          ⚠️ Delete Study Reminder
        </h2>
        <p className="mb-6 text-gray-300 text-sm sm:text-base">
          Are you sure you want to delete this reminder?
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            {loading ? 'Deleting...' : 'Yes, Delete'}
          </Button>
          <Button
            variant="secondary"
            onClick={() => router.push('/dashboard/study-reminders')}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
