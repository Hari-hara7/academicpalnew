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
      }, 1200); // slight delay so toast shows before redirect
    } else {
      toast.error('Failed to delete reminder'); // ❌ Error toast
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <Toaster richColors position="top-center" /> {/* ✅ Toast container */}

      <h2 className="text-2xl font-bold mb-4 text-red-600">⚠️ Delete Study Reminder</h2>
      <p className="mb-6 text-gray-300">Are you sure you want to delete this reminder?</p>

      <div className="flex justify-center gap-4">
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? 'Deleting...' : 'Yes, Delete'}
        </Button>
        <Button
          variant="secondary"
          onClick={() => router.push('/dashboard/study-reminders')}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
