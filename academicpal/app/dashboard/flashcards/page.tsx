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
    fetch('/api/flashcards/get')
      .then((res) => res.json())
      .then((data) => {
        setFlashcards(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        Loading flashcards...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-4 py-10 text-white font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Your Flashcards</h1>
          <Link href="/dashboard/flashcards/create">
            <Button className="bg-white text-black hover:bg-gray-200 flex items-center gap-2 shadow px-5">
              <Plus className="w-4 h-4" />
              Create
            </Button>
          </Link>
        </div>

        <Separator className="bg-gray-700" />

        {flashcards.length === 0 ? (
          <p className="text-gray-400 text-center">No flashcards found. Create some!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashcards.map((f) => (
              <Card
                key={f._id}
                className="bg-transparent border border-white/10 backdrop-blur-md transition hover:border-white/20"
              >
                <CardHeader>
                  <h2 className="text-lg font-semibold text-white">Q: {f.question}</h2>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300 mb-4">
                    <strong className="text-white">A:</strong> {f.answer}
                  </p>
                  <div className="flex gap-2">
                    <Link href={`/dashboard/flashcards/edit/${f._id}`}>
                      <Button
                        size="sm"
                        className="bg-white text-black hover:bg-gray-200 flex items-center gap-1"
                      >
                        <Pencil className="w-4 h-4" />
                        Edit
                      </Button>
                    </Link>
                    <Link href={`/dashboard/flashcards/delete/${f._id}`}>
                      <Button
                        size="sm"
                        className="bg-white text-black hover:bg-gray-200 flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
