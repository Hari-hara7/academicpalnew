'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function DeleteStudyTaskPage() {
  const { id } = useParams();
  const router = useRouter();
  const [taskTitle, setTaskTitle] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch('/api/study-planner/get');
        const data = await res.json();
        if (data.success) {
          const task = data.tasks.find((t: any) => t._id === id);
          if (task) {
            setTaskTitle(task.title);
          }
        }
      } catch (err) {
        console.error('Failed to fetch task title');
      }
    };

    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/study-planner/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (data.success) {
        router.push('/dashboard/study-planner');
      } else {
        alert('Delete failed');
      }
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-black min-h-screen text-white flex items-center justify-center">
      <Card className="bg-transparent border border-white/40 backdrop-blur-md shadow-md w-full">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-xl font-semibold text-red-500">⚠️ Confirm Deletion</h2>
          <p className="text-white">Are you sure you want to delete this task?</p>
          <p className="font-semibold text-lg text-white/80">📝 {taskTitle || 'Loading task...'}</p>

          <div className="flex gap-4">
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Deleting...' : 'Yes, Delete'}
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/dashboard/study-planner')}
              className="border-white/60 text-black hover:bg-white"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
