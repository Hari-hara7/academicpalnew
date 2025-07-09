'use client';

import { useEffect, useState } from 'react';
import { Tutor } from '@/types/tutor';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const SUBJECT_OPTIONS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'English',
  'Economics',
  'History',
];

import { useRouter } from 'next/navigation';


const AVAILABILITY_OPTIONS = ['Mornings', 'Afternoons', 'Evenings', 'Weekends'];

export default function FindTutorPage() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [subject, setSubject] = useState('');
  const [year, setYear] = useState('');
  const [availability, setAvailability] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter(); 

  const fetchTutors = async () => {
    setLoading(true);
    let query = [];

    if (subject) query.push(`subject=${encodeURIComponent(subject)}`);
    if (year) query.push(`year=${encodeURIComponent(year)}`);
    if (availability) query.push(`availability=${encodeURIComponent(availability)}`);

    const res = await fetch(`/api/tutoring/tutors/list?${query.join('&')}`);
    const data = await res.json();

    if (data.success) {
      setTutors(data.tutors);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Find a Tutor</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="p-2 border border-gray-400 rounded"
        >
          <option value="">All Subjects</option>
          {SUBJECT_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <Input
          type="number"
          min={1}
          max={8}
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-24"
        />

        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className="p-2 border border-gray-400 rounded"
        >
          <option value="">Any Availability</option>
          {AVAILABILITY_OPTIONS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>

        <Button onClick={fetchTutors} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </div>

      {/* Tutor List */}
      {tutors.length === 0 ? (
        <p>No tutors found.</p>
      ) : (
        <div className="space-y-4">
          {tutors.map((tutor) => (
            <Card key={tutor._id} className="p-4">
              <CardContent>
                <h3 className="text-xl font-semibold">{tutor.name}</h3>
                <p>
                  <strong>Branch:</strong> {tutor.branch} | <strong>Year:</strong> {tutor.year}
                </p>
                <p>
                  <strong>Subjects:</strong> {tutor.subjects?.join(', ') || 'N/A'}
                </p>
                <p>
                  <strong>Availability:</strong> {tutor.availability?.join(', ') || 'N/A'}
                </p>
                <p>
                  <strong>Teaching Modes:</strong> {tutor.teachingModes?.join(', ') || 'N/A'}
                </p>
                <p className="flex items-center gap-1 mt-1">
                  <Star className="h-4 w-4 text-yellow-400" />{' '}
                  {tutor.rating?.toFixed(1) || 'N/A'}
                </p>
               <Button
  onClick={() => router.push(`/dashboard/tutoring/schedule/${tutor._id}`)}
  className="mt-2"
>
  Connect
</Button>

              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
