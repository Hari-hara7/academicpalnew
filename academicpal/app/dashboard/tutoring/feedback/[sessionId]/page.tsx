'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function FeedbackPage() {
  const { sessionId } = useParams();
  const router = useRouter();

  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/tutoring/sessions/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, rating, review }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      alert('Thank you for your feedback!');
      router.push('/dashboard/tutoring/my-sessions');
    } else {
      alert('Error submitting feedback');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Rate Your Session</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Rating (1-5)</Label>
          <Input
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            required
          />
        </div>

        <div>
          <Label>Review</Label>
          <textarea
            rows={4}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Write a short review..."
            required
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </Button>
      </form>
    </div>
  );
}
