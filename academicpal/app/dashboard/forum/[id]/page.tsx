'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ForumPost, ForumReply } from '@/types/forum';
import { initSocket, getSocket } from '@/lib/socket';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
    const res = await fetch('/api/forum/reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ threadId: id, message: newReply }),
    });

    if (res.ok) setNewReply('');
  };

  if (!thread) return <p className="p-6">Loading thread...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{thread.title}</h2>
      <p className="mb-4">{thread.body}</p>

      <div className="space-y-4">
        {thread.replies.map((reply, i) => (
          <div key={i} className="bg-gray-100 p-3 rounded">
            <p className="text-sm font-semibold">{reply.username}</p>
            <p>{reply.message}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-2">
        <Input
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          placeholder="Type your reply"
        />
        <Button onClick={handleReply}>Reply</Button>
      </div>
    </div>
  );
}
