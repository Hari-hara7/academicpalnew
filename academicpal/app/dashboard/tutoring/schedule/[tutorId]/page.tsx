'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TEACHING_MODES = ['Chat', 'Voice', 'Video', 'Notes Sharing'];

export default function ScheduleSessionPage() {
  const { tutorId } = useParams();
  const router = useRouter();

  const [tutor, setTutor] = useState<any>(null);
  const [subject, setSubject] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [mode, setMode] = useState(TEACHING_MODES[0]);
  const [meetingLink, setMeetingLink] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch tutor details
    async function fetchTutor() {
      const res = await fetch(`/api/tutoring/tutors/list?tutorId=${tutorId}`);
      const data = await res.json();
      if (data.success && data.tutors.length > 0) {
        setTutor(data.tutors[0]);
        setSubject(data.tutors[0].subjects[0] || '');
      }
    }
    fetchTutor();
  }, [tutorId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/tutoring/sessions/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tutorId, subject, scheduledAt, mode, meetingLink, notes }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      alert('Session request sent!');
      router.push('/dashboard/tutoring/my-sessions');
    } else {
      alert('Failed to schedule session.');
    }
  };

  if (!tutor) return <p className="p-6">Loading tutor details...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Schedule Session with {tutor.name}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label>Subject</Label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            {tutor.subjects.map((subj: string) => (
              <option key={subj} value={subj}>
                {subj}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label>Schedule Date & Time</Label>
          <Input
            type="datetime-local"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
            required
          />
        </div>

        <div>
          <Label>Teaching Mode</Label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            {TEACHING_MODES.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label>Meeting Link (optional)</Label>
          <Input
            type="url"
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
            placeholder="Zoom, Google Meet, etc."
          />
        </div>

        <div>
          <Label>Additional Notes (optional)</Label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2 border rounded"
            rows={3}
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? 'Scheduling...' : 'Schedule Session'}
        </Button>
      </form>
    </div>
  );
}
