'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import {
  FileText,
  AlignLeft,
  Tag,
  Send,
} from 'lucide-react';

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
      toast.success('Thread posted successfully!');
      router.push('/dashboard/forum');
    } else {
      toast.error('Failed to post thread.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FileText className="h-5 w-5 text-white/80" />
        Create New Thread
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="bg-black border border-white/20 backdrop-blur-md rounded-xl">
          <CardContent className="p-6 space-y-5">
            {/* Title */}
            <div className="space-y-2">
              <Label className="text-white flex items-center gap-1">
                <FileText className="h-4 w-4" />
                Thread Title
              </Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="e.g. How to prepare for semester exams?"
                className="bg-black text-white placeholder:text-white/60 border border-white/20 focus-visible:ring-white/30"
              />
            </div>

            {/* Body */}
            <div className="space-y-2">
              <Label className="text-white flex items-center gap-1">
                <AlignLeft className="h-4 w-4" />
                Discussion Body
              </Label>
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
                rows={6}
                placeholder="Explain your question or start the discussion..."
                className="bg-black text-white placeholder:text-white/60 border border-white/20 focus-visible:ring-white/30"
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label className="text-white flex items-center gap-1">
                <Tag className="h-4 w-4" />
                Tags (comma separated)
              </Label>
              <Input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g. math, exams, notes"
                className="bg-black text-white placeholder:text-white/60 border border-white/20 focus-visible:ring-white/30"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              variant="ghost"
              className="bg-white text-black hover:bg-white/90 flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              {loading ? 'Posting...' : 'Post Thread'}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
