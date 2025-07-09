'use client';

import { useEffect, useState } from 'react';
import { SessionType } from '@/types/session';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarClock, Video, User, NotebookPen } from 'lucide-react';

export default function MySessionsPage() {
  const [sessions, setSessions] = useState<SessionType[]>([]);

  useEffect(() => {
    const fetchSessions = async () => {
      const res = await fetch('/api/tutoring/sessions/my');
      const data = await res.json();
      if (data.success) {
        setSessions(data.sessions);
      }
    };
    fetchSessions();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-12">
      <div className="max-w-5xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <CalendarClock className="w-6 h-6" />
          My Tutoring Sessions
        </h2>

        {sessions.length === 0 ? (
          <p className="text-gray-400">You haven’t scheduled or joined any sessions yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sessions.map((session) => (
              <Card
                key={session._id}
                className="bg-black border border-white/20 hover:border-white/40 transition-all"
              >
                <CardContent className="p-5 space-y-3 text-white">
                  <h3 className="text-xl font-semibold">{session.subject}</h3>

                  <p className="text-sm">
                    <span className="font-medium text-white/70">📅 Date:</span>{' '}
                    {format(new Date(session.scheduledAt), 'PPpp')}
                  </p>

                  <p className="text-sm">
                    <span className="font-medium text-white/70">🎥 Mode:</span> {session.mode}
                  </p>

                  <p className="text-sm">
                    <span className="font-medium text-white/70">👥 With:</span>{' '}
                    {session.tutorId.name && session.learnerId.name
                      ? `${session.tutorId.name} / ${session.learnerId.name}`
                      : 'N/A'}
                  </p>

                  {session.meetingLink && (
                    <p className="text-sm">
                      <span className="font-medium text-white/70">🔗 Meeting Link:</span>{' '}
                      <a
                        href={session.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline"
                      >
                        Join
                      </a>
                    </p>
                  )}

                  {session.notes && (
                    <p className="text-sm">
                      <span className="font-medium text-white/70">📝 Notes:</span> {session.notes}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
