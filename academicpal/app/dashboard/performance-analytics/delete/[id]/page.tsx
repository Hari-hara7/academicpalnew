'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function DeleteStudySession() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [sessionSubject, setSessionSubject] = useState('');

  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch('/api/performance-analytics/get');
      const json = await res.json();
      const session = json.sessions.find((s: any) => s._id === id);
      if (session) {
        setSessionSubject(session.subject);
      }
    };
    fetchSession();
  }, [id]);

  const handleDelete = async () => {
    const res = await fetch('/api/performance-analytics/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      router.push('/dashboard/performance-analytics');
    } else {
      alert('Failed to delete session');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8 text-center">
      <h1 className="text-2xl font-semibold mb-4">Delete Study Session</h1>
      <p className="mb-6">
        Are you sure you want to delete the study session for <strong>{sessionSubject}</strong>?
      </p>
      <div className="flex justify-center gap-4">
        <Button variant="destructive" onClick={handleDelete}>
          Yes, Delete
        </Button>
        <Button variant="outline" onClick={() => router.push('/dashboard/performance-analytics')}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
