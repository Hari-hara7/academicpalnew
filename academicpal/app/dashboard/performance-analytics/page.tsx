'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { StudySession } from '@/types/studySession';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid,
} from 'recharts';

export default function PerformanceAnalytics() {
  const [data, setData] = useState<StudySession[]>([]);
  const router = useRouter();

  // Fetch data
  const fetchData = async () => {
    const res = await fetch('/api/performance-analytics/get');
    const json = await res.json();
    if (json.success) setData(json.sessions);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete handler
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this session?')) return;

    const res = await fetch(`/api/performance-analytics/delete`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    const json = await res.json();
    if (json.success) {
      alert('Deleted successfully');
      fetchData(); // refresh list
    } else {
      alert('Delete failed');
    }
  };

  const totalHoursPerSubject = data.reduce((acc, session) => {
    acc[session.subject] = (acc[session.subject] || 0) + session.hours;
    return acc;
  }, {} as Record<string, number>);

  const averagePerformance = data.reduce((acc, session) => {
    if (session.performance !== undefined) {
      acc[session.subject] = acc[session.subject] || [];
      acc[session.subject].push(session.performance);
    }
    return acc;
  }, {} as Record<string, number[]>);

  const subjectPerformance = Object.entries(averagePerformance).map(([subject, scores]) => {
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    return { subject, avg: parseFloat(avg.toFixed(2)) };
  });

  const barChartData = Object.entries(totalHoursPerSubject).map(([subject, hours]) => ({
    subject,
    hours,
  }));

  return (
    <div className="max-w-5xl mx-auto space-y-10  mt-10">
      <div className="flex flex items-center justify-between items-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-2">Performance & Analytics</h1>
        <Button onClick={() => router.push('/dashboard/performance-analytics/create')}>
          + Add Session
        </Button>
      </div>

      <h2 className="text-lg font-semibold mb-2">Study Hours by Subject</h2>
      <div className="h-64 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barChartData}>
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="hours" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {subjectPerformance.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mb-2">Average Performance by Subject</h2>
          <div className="h-64 mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={subjectPerformance}>
                <XAxis dataKey="subject" />
                <YAxis domain={[1, 10]} />
                <Tooltip />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="avg" stroke="#ef4444" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {/* List study sessions with Update/Delete */}
      <div>
        <h2 className="text-lg font-semibold mb-2">All Study Sessions</h2>
        {data.length === 0 && <p>No study sessions found.</p>}
        <ul>
          {data.map((session) => (
            <li key={session._id} className="flex justify-between items-center py-2 border-b">
              <div>
                <strong>{session.subject}</strong> - {session.hours} hrs, Performance: {session.performance ?? 'N/A'}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push(`/dashboard/performance-analytics/edit/${session._id}`)}
                >
                  Update
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(session._id)}
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
