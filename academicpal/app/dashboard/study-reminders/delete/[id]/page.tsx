'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

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
      router.push('/dashboard/study-reminders');
    } else {
      alert('Failed to delete reminder.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">⚠️ Delete Study Reminder</h2>
      <p className="mb-6">Are you sure you want to delete this reminder?</p>

      <div className="flex justify-center gap-4">
        <Button variant="destructive" onClick={handleDelete} disabled={loading}>
          {loading ? 'Deleting...' : 'Yes, Delete'}
        </Button>
        <Button onClick={() => router.push('/dashboard/study-reminders')}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
