'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

export default function CreateBlogPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/blogs/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      const data = await res.json();

      if (data.success) {
        router.push('/dashboard/blogs');
      } else {
        setError(data.message || 'Failed to create blog');
      }
    } catch {
      setError('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center p-6">
      <div className="max-w-3xl mx-auto w-full bg-black/80 border border-white/40 rounded-lg p-8 shadow-lg">
        <h1 className="text-white text-3xl font-bold mb-6 text-center">
          Create New Blog
        </h1>

        {error && (
          <p className="text-red-500 mb-4 text-center font-semibold">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            required
            className="bg-black/60 border-white/50 text-white placeholder-white/70 focus:border-white focus:ring-white"
          />

          <Textarea
            placeholder="Write your blog content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            disabled={loading}
            required
            className="bg-black/60 border-white/50 text-white placeholder-white/70 focus:border-white focus:ring-white resize-none"
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black hover:bg-yellow-400 hover:text-black transition"
          >
            {loading ? 'Publishing...' : 'Publish'}
          </Button>
        </form>
      </div>
    </div>
  );
}
