'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Pencil, Trash2, Plus } from 'lucide-react';

interface Flashcard {
  _id: string;
  question: string;
  answer: string;
}

export default function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFlashcards() {
      try {
        const res = await fetch('/api/flashcards/get');
        const data = await res.json();
        console.log('Fetched flashcards data:', data);

        if (Array.isArray(data)) {
          setFlashcards(data);
        } else if (Array.isArray(data.flashcards)) {
          setFlashcards(data.flashcards);
        } else {
          setFlashcards([]);
        }
      } catch (error) {
        console.error('Error fetching flashcards:', error);
        setFlashcards([]);
      } finally {
        setLoading(false);
      }
    }

    loadFlashcards();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        Loading flashcards...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-4 py-8 text-white font-sans">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
            Your Flashcards
          </h1>
          <Link href="/dashboard/flashcards/create">
            <Button className="bg-white text-black hover:bg-gray-200 flex items-center gap-2 shadow px-4 py-2 text-sm sm:text-base">
              <Plus className="w-4 h-4" />
              Create
            </Button>
          </Link>
        </div>

        <Separator className="bg-white/40" />

        {flashcards.length === 0 ? (
          <p className="text-gray-400 text-center">No flashcards found. Create some!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {flashcards.map((f) => (
              <Card
                key={f._id}
                className="flex flex-col justify-between bg-transparent border border-white/20 backdrop-blur-md shadow hover:border-white/40 transition p-4 sm:p-6"
              >
                <div>
                  <CardHeader className="p-0 mb-2">
                    <h2 className="text-lg sm:text-xl font-semibold text-white break-words">
                      Q: {f.question}
                    </h2>
                  </CardHeader>
                  <Separator className="bg-white/20 my-2" />
                  <CardContent className="p-0 text-sm sm:text-base text-white/80 break-words">
                    <p>
                      <strong className="text-white">A:</strong> {f.answer}
                    </p>
                  </CardContent>
                </div>
                <div className="flex gap-2 pt-4">
                  <Link href={`/dashboard/flashcards/edit/${f._id}`}>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="border border-white/40 hover:bg-white text-white hover:text-black flex items-center gap-2 w-full sm:w-auto"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </Button>
                  </Link>
                  <Link href={`/dashboard/flashcards/delete/${f._id}`}>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="border border-red-500/30 hover:bg-red-500 text-red-400 hover:text-white flex items-center gap-2 w-full sm:w-auto"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
