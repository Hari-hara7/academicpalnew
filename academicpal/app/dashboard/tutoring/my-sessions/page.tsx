'use client';

import { useEffect, useState } from 'react';
import { SessionType } from '@/types/session';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';

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
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">My Tutoring Sessions</h2>

      {sessions.length === 0 ? (
        <p>No sessions yet.</p>
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => (
            <Card key={session._id} className="p-4">
              <CardContent>
                <h3 className="font-semibold text-lg">{session.subject}</h3>
                <p>
                  <strong>Date:</strong>{' '}
                  {format(new Date(session.scheduledAt), 'PPpp')}
                </p>
                <p>
                  <strong>Mode:</strong> {session.mode}
                </p>
                <p>
                  <strong>With:</strong>{' '}
                  {session.tutorId.name && session.learnerId.name
                    ? `${session.tutorId.name} / ${session.learnerId.name}`
                    : 'N/A'}
                </p>
                {session.meetingLink && (
                  <p>
                    <strong>Meeting Link:</strong>{' '}
                    <a
                      href={session.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Join
                    </a>
                  </p>
                )}
                {session.notes && (
                  <p className="mt-2">
                    <strong>Notes:</strong> {session.notes}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
