'use client';

import { useEffect, useState } from 'react';
import { ForumPost } from '@/types/forum';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Plus, MessageCircle } from 'lucide-react';

export default function ForumPage() {
  const [threads, setThreads] = useState<ForumPost[]>([]);

  useEffect(() => {
    const fetchThreads = async () => {
      const res = await fetch('/api/forum/get');
      const data = await res.json();
      if (data.success) {
        setThreads(data.posts);
      }
    };

    fetchThreads();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 sm:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-3">
          <MessageCircle className="h-6 w-6 text-white/80" />
          <h1 className="text-3xl font-semibold tracking-tight mt-4">Student Forum</h1>
        </div>
        <Button
          variant="ghost"
          className="bg-white text-black hover:bg-white/90 transition"
          asChild
        >
          <Link href="/dashboard/forum/create" className="flex items-center gap-2 font-medium">
            <Plus className="h-4 w-4" />
            New Thread
          </Link>
        </Button>
      </div>

      {/* Threads */}
      {threads.length === 0 ? (
        <p className="text-white/60 text-center">No threads found.</p>
      ) : (
        <div className="space-y-4">
          {threads.map((thread) => (
            <Card
              key={thread._id}
              className="bg-white/5 border border-white/10 backdrop-blur-md transition hover:border-white/30 rounded-xl"
            >
              <CardContent className="p-5 space-y-3">
                <Link
                  href={`/dashboard/forum/${thread._id}`}
                  className="text-lg font-semibold text-white hover:underline underline-offset-4 transition"
                >
                  {thread.title}
                </Link>

                <div className="text-sm text-white/70">
                  Posted by <span className="text-white font-medium">{thread.username}</span> •{' '}
                  {formatDistanceToNow(new Date(thread.createdAt ?? ''))} ago
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {thread.tags?.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-white/20 text-white/80 hover:border-white hover:text-white transition"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
