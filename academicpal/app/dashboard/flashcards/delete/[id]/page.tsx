'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function DeleteFlashcardPage() {
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    async function deleteFlashcard() {
      const res = await fetch('/api/flashcards/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (res.ok) router.push('/dashboard/flashcards');
    }
    deleteFlashcard();
  }, [id, router]);

  return (
    <div>
      <p>Deleting flashcard...</p>
    </div>
  );
}
