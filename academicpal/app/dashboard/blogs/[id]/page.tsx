'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Blog } from '@/types/blog';

export default function BlogDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const blogId = params.id;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await fetch(`/api/blogs/get/${blogId}`);
      const data = await res.json();
      if (data.success) {
        setBlog(data.blog);
      } else {
        setError('Failed to load blog');
      }
    };
    fetchBlog();
  }, [blogId]);

  const handleVote = async (type: 'upvote' | 'downvote') => {
    if (!blog) return;
    setLoading(true);
    const res = await fetch(`/api/blogs/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blogId: blog._id, voteType: type }),
    });
    const data = await res.json();
    if (data.success) {
      setBlog(data.blog);
    } else {
      setError(data.message || 'Failed to vote');
    }
    setLoading(false);
  };

  const handleAddComment = async () => {
    if (!comment.trim()) return;
    setLoading(true);
    const res = await fetch(`/api/blogs/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blogId: blog?._id, comment }),
    });
    const data = await res.json();
    if (data.success) {
      setBlog(data.blog);
      setComment('');
    } else {
      setError(data.message || 'Failed to add comment');
    }
    setLoading(false);
  };

  if (error) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-white text-center mt-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6 flex justify-center mt-8">
      <div className="max-w-3xl w-full bg-black/80 border border-white/40 rounded-lg p-8 shadow-lg text-white">
        <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
        <p className="text-sm text-white/70 mb-6">
          by {blog.authorName || 'Unknown'} on{' '}
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>

        <div className="mb-8 whitespace-pre-wrap">{blog.content}</div>

        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => handleVote('upvote')}
            disabled={loading}
            className="flex items-center gap-2 border-white/50 text-black hover:border-white hover:bg-white"
          >
            <ThumbsUp className="w-5 h-5" /> {blog.upvotes}
          </Button>
          <Button
            variant="outline"
            onClick={() => handleVote('downvote')}
            disabled={loading}
            className="flex items-center gap-2 border-white/50 text-black hover:border-white hover:bg-white"
          >
            <ThumbsDown className="w-5 h-5" /> {blog.downvotes}
          </Button>
        </div>

        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        <div className="mb-6 max-h-64 overflow-y-auto border border-white/30 rounded-md p-4 space-y-4 bg-black/60">
          {blog.comments.length === 0 && (
            <p className="text-white/70 italic">No comments yet.</p>
          )}
          {blog.comments.map((c) => (
            <div key={c._id} className="border-b border-white/20 pb-2 last:border-b-0">
              <p className="font-semibold">{c.username}</p>
              <p>{c.text}</p>
              <p className="text-xs text-white/50">
                {new Date(c.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <Textarea
          placeholder="Add a comment..."
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={loading}
          className="bg-black/60 border-white/50 text-white placeholder-white/70 focus:border-white focus:ring-white resize-none mb-4"
        />

        <Button
          onClick={handleAddComment}
          disabled={loading || !comment.trim()}
          className="w-full bg-white text-black hover:bg-yellow-400 hover:text-black transition"
        >
          Add Comment
        </Button>
      </div>
    </div>
  );
}
