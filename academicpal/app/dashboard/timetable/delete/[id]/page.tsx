'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { TimetableType } from '@/types/timetable';
import { Trash2, X } from 'lucide-react';

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
      toast.success('Timetable deleted successfully!');
      router.push('/dashboard/timetable');
    } else {
      toast.error('Failed to delete the timetable.');
    }
  };

  if (!timetable) return <p className="text-white text-center">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md border border-white/30 bg-black text-white shadow-xl rounded-xl">
        <CardContent className="p-6 space-y-4">
          <h1 className="text-2xl font-bold text-red-500">Confirm Deletion</h1>
          <p>Are you sure you want to delete the timetable:</p>
          <p className="font-semibold italic text-lg">{timetable.title}</p>

          <div className="flex justify-end gap-4 pt-4">
            <Button
              onClick={handleDelete}
              variant="destructive"
              className="bg-white text-black flex gap-2 items-center"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="border-white/40 text-black flex gap-2 items-center"
            >
              <X className="w-4 h-4 text-white" />
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
