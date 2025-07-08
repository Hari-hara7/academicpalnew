'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ForumPost, ForumReply } from '@/types/forum';
import { initSocket } from '@/lib/socket';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Send, MessageCircleReply } from 'lucide-react';

export default function ThreadPage() {
  const { id } = useParams();
  const [thread, setThread] = useState<ForumPost | null>(null);
  const [newReply, setNewReply] = useState('');

  useEffect(() => {
    const fetchThread = async () => {
      const res = await fetch(`/api/forum/thread?id=${id}`);
      const data = await res.json();
      if (data.success) setThread(data.post);
    };
    fetchThread();

    const socket = initSocket();
    socket.emit('join-thread', id);

    socket.on('new-reply', (data: { threadId: string; reply: ForumReply }) => {
      if (data.threadId === id) {
        setThread((prev) =>
          prev ? { ...prev, replies: [...prev.replies, data.reply] } : prev
        );
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [id]);

  const handleReply = async () => {
    if (!newReply.trim()) return;
    const res = await fetch('/api/forum/reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ threadId: id, message: newReply }),
    });

    if (res.ok) setNewReply('');
  };

  if (!thread)
    return (
      <div className="min-h-screen flex justify-center items-center bg-black text-white">
        Loading thread...
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 max-w-3xl mx-auto">
      {/* Thread title */}
      <div className="mb-6 space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
          <MessageCircleReply className="h-5 w-5" />
          {thread.title}
        </h1>
        <p className="text-white/80">{thread.body}</p>
        <div className="flex gap-2 mt-2 flex-wrap">
          {thread.tags?.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="border-white/20 text-white/70 hover:border-white hover:text-white transition"
            >
              #{tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Replies */}
      <div className="space-y-4 mb-8">
        {thread.replies.map((reply, i) => (
          <Card
            key={i}
            className="bg-white/5 border border-white/10 backdrop-blur transition hover:border-white/30 rounded-lg"
          >
            <CardContent className="p-4 space-y-1">
              <p className="text-sm text-white font-semibold">{reply.username}</p>
              <p className="text-white/80">{reply.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reply input */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <Input
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          placeholder="Type your reply..."
          className="flex-1 bg-white/10 text-white placeholder:text-white/50 border border-white/20 focus:border-white/40"
        />
        <Button
          onClick={handleReply}
          variant="ghost"
          className="bg-white text-black hover:bg-white/90 flex items-center gap-2"
        >
          <Send className="h-4 w-4" />
          Reply
        </Button>
      </div>
    </div>
  );
}
