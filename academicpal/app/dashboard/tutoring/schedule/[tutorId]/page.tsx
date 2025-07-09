'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarClock, BookOpenCheck, Video, FileText } from 'lucide-react';

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

  if (!tutor) return <p className="p-6 text-white">Loading tutor details...</p>;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <CalendarClock className="w-6 h-6 text-white" />
          Schedule Session with {tutor.name}
        </h2>

        <Card className="bg-black border border-white/20">
          <CardContent className="p-6 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label>Subject</Label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger className="bg-black text-white border-white/30">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent className="bg-black text-white border-white/30">
                    {tutor.subjects.map((subj: string) => (
                      <SelectItem key={subj} value={subj} className="hover:bg-white/10">
                        {subj}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Schedule Date & Time</Label>
                <Input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  className="bg-black text-white border-white/30"
                  required
                />
              </div>

              <div>
                <Label>Teaching Mode</Label>
                <Select value={mode} onValueChange={setMode}>
                  <SelectTrigger className="bg-black text-white border-white/30">
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent className="bg-black text-white border-white/30">
                    {TEACHING_MODES.map((m) => (
                      <SelectItem key={m} value={m} className="hover:bg-white/10">
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Meeting Link (optional)</Label>
                <Input
                  type="url"
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                  className="bg-black text-white border-white/30"
                  placeholder="Zoom, Google Meet, etc."
                />
              </div>

              <div>
                <Label>Additional Notes (optional)</Label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2 rounded bg-black text-white border border-white/30"
                  rows={3}
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full bg-white text-black hover:bg-gray-200">
                {loading ? 'Scheduling...' : 'Schedule Session'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
