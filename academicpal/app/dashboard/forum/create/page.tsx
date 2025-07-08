'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

export default function CreateForumThreadPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/forum/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        body,
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      router.push('/dashboard/forum');
    } else {
      alert('Failed to create thread');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">📝 Create New Thread</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6 space-y-4 bg-black/70 border border-white/20 text-white">
          <div>
            <Label>Thread Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g. How to prepare for semester exams?"
              className="text-white"
            />
          </div>

          <div>
            <Label>Discussion Body</Label>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows={6}
              placeholder="Explain your question or start the discussion..."
              className="text-white"
            />
          </div>

          <div>
            <Label>Tags (comma separated)</Label>
            <Input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. math, exams, notes"
              className="text-white"
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? 'Posting...' : 'Post Thread'}
          </Button>
        </Card>
      </form>
    </div>
  );
}
