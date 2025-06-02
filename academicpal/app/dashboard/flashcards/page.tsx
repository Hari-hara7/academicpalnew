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
      <div className="min-h-screen bg-black text-white flex justify-center items-center text-lg">
        Loading flashcards...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-4 py-10 text-white font-sans">
    <div className="max-w-[1600px] w-full mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-center sm:text-left tracking-tight">
            Your Flashcards
          </h1>
          <Link href="/dashboard/flashcards/create">
            <Button className="bg-white text-black hover:bg-gray-200 flex items-center gap-2 shadow px-4 py-2 text-sm sm:text-base rounded-xl transition">
              <Plus className="w-4 h-4" />
              Create
            </Button>
          </Link>
        </div>

        <Separator className="bg-white/30" />

        {/* Flashcards Grid */}
        {flashcards.length === 0 ? (
          <p className="text-gray-400 text-center text-lg">No flashcards found. Create some!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-2 gap-6">
            {flashcards.map((f) => (
              <Card
                key={f._id}
                className="flex flex-col justify-between bg-black border border-white/20 rounded-2xl backdrop-blur-md shadow-md hover:shadow-lg hover:border-white/40 transition-all p-5"
              >
                <div>
                  <CardHeader className="p-0 mb-3">
                    <h2 className="text-xl font-semibold text-white break-words line-clamp-2">
                      Q: {f.question}
                    </h2>
                  </CardHeader>
                  <Separator className="bg-white/20 my-3" />
                  <CardContent className="p-0 text-white/80 text-sm sm:text-base break-words">
                    <p>
                      <span className="text-white font-medium">A:</span> {f.answer}
                    </p>
                  </CardContent>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 pt-4">
                  <Link href={`/dashboard/flashcards/edit/${f._id}`} className="w-full sm:w-auto">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-full sm:w-auto border border-white/40 hover:bg-white text-white hover:text-black flex items-center justify-center gap-2"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </Button>
                  </Link>
                  <Link href={`/dashboard/flashcards/delete/${f._id}`} className="w-full sm:w-auto">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-full sm:w-auto border border-red-500/30 hover:bg-red-500 text-red-400 hover:text-white flex items-center justify-center gap-2"
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
