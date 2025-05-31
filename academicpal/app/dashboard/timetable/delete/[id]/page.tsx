'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { TimetableType } from '@/types/timetable';

export default function DeleteTimetablePage() {
  const { id } = useParams();
  const router = useRouter();
  const [timetable, setTimetable] = useState<TimetableType | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/timetable/get');
      const all = await res.json();
      const current = all.find((t: TimetableType) => t._id === id);
      setTimetable(current);
    }
    load();
  }, [id]);

  const handleDelete = async () => {
    const res = await fetch('/api/timetable/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      router.push('/dashboard/timetable');
    }
  };

  if (!timetable) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4 text-red-600">Confirm Deletion</h1>
      <p>Are you sure you want to delete the timetable:</p>
      <p className="font-semibold my-2">{timetable.title}</p>

      <div className="flex gap-4 mt-4">
        <Button variant="destructive" onClick={handleDelete}>
          Yes, Delete
        </Button>
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
