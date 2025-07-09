'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

import { Star, MessageCircleHeart } from 'lucide-react';

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
      toast.success('🎉 Thank you for your feedback!');
      router.push('/dashboard/tutoring/my-sessions');
    } else {
      toast.error('❌ Error submitting feedback');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-2xl mx-auto space-y-6">
        <h2 className="text-4xl font-bold flex items-center gap-3">
          <MessageCircleHeart className="w-6 h-6" />
          Session Feedback
        </h2>
        <p className="text-gray-400">
          Help us improve by rating your recent tutoring session.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="bg-white/5 backdrop-blur-md border border-white/10">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg flex items-center gap-2 text-white">
                  <Star className="w-5 h-5" />
                  Rating
                </Label>
                <Badge
                  variant="outline"
                  className="text-xs text-white border-white/30 bg-white/10"
                >
                  From 1 to 5
                </Badge>
              </div>
              <Input
                type="number"
                min={1}
                max={5}
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                className="bg-black text-white placeholder:text-gray-400 border-white/20"
                required
              />
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-md border border-white/10">
            <CardContent className="p-6 space-y-4">
              <Label className="text-lg flex items-center gap-2 text-white">
                <MessageCircleHeart className="w-5 h-5" />
                Write a Review
              </Label>
              <Textarea
                rows={4}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="bg-black text-white border-white/20 placeholder:text-gray-400"
                placeholder="Write a short review about your session..."
                required
              />
            </CardContent>
          </Card>

          <div className="text-right">
            <Button
              type="submit"
              disabled={loading}
              className="bg-white text-black hover:bg-gray-200"
            >
              {loading ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
