'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { Toaster, toast } from 'sonner';

export default function EditFlashcardPage() {
  const { id } = useParams();
  const router = useRouter();
  const [flashcard, setFlashcard] = useState<{ question: string; answer: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchFlashcard() {
      try {
        const res = await fetch('/api/flashcards/get');
        const data = await res.json();
        const found = data.find((f: any) => f._id === id);
        if (found) setFlashcard(found);
        else toast.error('Flashcard not found!');
      } catch (error) {
        toast.error('Failed to fetch flashcard');
      }
    }
    fetchFlashcard();
  }, [id]);

  const handleSubmit = async () => {
    if (!flashcard?.question || !flashcard?.answer) {
      toast.error('Both question and answer are required');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/flashcards/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          question: flashcard.question,
          answer: flashcard.answer,
        }),
      });

      if (res.ok) {
        toast.success('Flashcard updated!');
        setTimeout(() => router.push('/dashboard/flashcards'), 1000);
      } else {
        toast.error('Update failed. Try again.');
      }
    } catch (err) {
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  if (!flashcard) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        <p className="text-gray-300">Loading flashcard...</p>
        <Toaster position="top-right" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <Toaster position="top-right" />
      <div className="max-w-xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Edit Flashcard</h1>
          <Link href="/dashboard/flashcards">
            <Button
              variant="ghost"
              className="text-white hover:bg-white flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        </div>

        <Card className="bg-transparent border border-white/10 backdrop-blur-md shadow-md">
          <CardHeader>
            <h2 className="text-xl font-semibold text-white">Update Details</h2>
          </CardHeader>
          <Separator className="bg-white/10" />
          <CardContent className="space-y-4 pt-4">
            <Input
              placeholder="Enter updated question"
              value={flashcard.question}
              onChange={(e) =>
                setFlashcard({ ...flashcard, question: e.target.value })
              }
              className="bg-black text-white border-white/10 focus:ring-white/20 focus:border-white"
            />
            <Input
              placeholder="Enter updated answer"
              value={flashcard.answer}
              onChange={(e) =>
                setFlashcard({ ...flashcard, answer: e.target.value })
              }
              className="bg-black text-white border-white/10 focus:ring-white/20 focus:border-white"
            />
            <Button
              onClick={handleSubmit}
              className="w-full bg-white text-black hover:bg-gray-200 flex items-center gap-2"
              disabled={loading}
            >
              <Save className="w-4 h-4" />
              {loading ? 'Saving...' : 'Save Flashcard'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
