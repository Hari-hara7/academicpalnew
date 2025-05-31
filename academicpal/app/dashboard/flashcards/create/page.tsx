'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function CreateFlashcardPage() {
  const router = useRouter();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = async () => {
    const res = await fetch('/api/flashcards/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, answer }),
    });

    if (res.ok) {
      router.push('/dashboard/flashcards');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Create Flashcard</h1>
          <Link href="/dashboard/flashcards">
            <Button
              variant="ghost"
              className="text-white hover:bg-white flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4 " />
              Back
            </Button>
          </Link>
        </div>

        <Card className="bg-transparent border border-white/10 backdrop-blur-md shadow-md">
          <CardHeader>
            <h2 className="text-xl font-semibold text-white">New Flashcard</h2>
          </CardHeader>
          <Separator className="bg-white/10" />
          <CardContent className="space-y-4 pt-4">
            <Input
              placeholder="Enter question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="bg-black text-white border-white/10 focus:ring-white/20 focus:border-white"
            />
            <Input
              placeholder="Enter answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="bg-black text-white border-white/10 focus:ring-white/20 focus:border-white"
            />
            <Button
              onClick={handleSubmit}
              className="w-full bg-white text-black hover:bg-gray-200 flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              Create Flashcard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
