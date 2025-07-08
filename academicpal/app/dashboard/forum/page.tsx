'use client';

import { useEffect, useState } from 'react';
import { ForumPost } from '@/types/forum';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';

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
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">💬 Student Forum</h2>
        <Button asChild>
          <Link href="/dashboard/forum/create">➕ New Thread</Link>
        </Button>
      </div>

      {threads.length === 0 ? (
        <p>No threads found.</p>
      ) : (
        <div className="grid gap-4">
          {threads.map((thread) => (
            <Card key={thread._id}>
              <CardContent className="p-4 space-y-2">
                <Link
                  href={`/dashboard/forum/${thread._id}`}
                  className="text-lg font-semibold hover:underline"
                >
                  {thread.title}
                </Link>
                <div className="text-sm text-gray-600">
                  Posted by {thread.username} •{' '}
                  {formatDistanceToNow(new Date(thread.createdAt ?? ''))} ago
                </div>
                <div className="flex gap-2 flex-wrap">
                  {thread.tags?.map((tag) => (
                    <Badge key={tag} variant="outline">
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
