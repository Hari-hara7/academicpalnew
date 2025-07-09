'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star, Users, Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tutor } from '@/types/tutor';

const SUBJECT_OPTIONS: Record<string, string[]> = {
  '1st Year': [
    'Engineering Mathematics-I',
    'Engineering Physics',
    'Basic Electrical',
    'C Programming',
    'Environmental Science',
  ],
  '2nd Year': [
    'Data Structures',
    'Object-Oriented Programming',
    'Digital Logic Design',
    'Discrete Mathematics',
    'Database Systems',
  ],
  '3rd Year': [
    'Operating Systems',
    'Computer Networks',
    'Web Technologies',
    'Software Engineering',
    'Machine Learning',
  ],
  '4th Year': [
    'Cloud Computing',
    'Cyber Security',
    'Blockchain Technology',
    'Big Data Analytics',
    'Project Management',
  ],
};

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
    const query = [];

    if (subject) query.push(`subject=${encodeURIComponent(subject)}`);
    if (year) query.push(`year=${encodeURIComponent(year)}`);
    if (availability) query.push(`availability=${encodeURIComponent(availability)}`);

    const res = await fetch(`/api/tutoring/tutors/list?${query.join('&')}`);
    const data = await res.json();

    if (data.success) setTutors(data.tutors);
    setLoading(false);
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-white" />
            <h2 className="text-3xl sm:text-4xl font-bold">Find a Tutor</h2>
          </div>
          <p className="text-sm text-gray-400 max-w-md">
            Browse verified student tutors based on year, subject, and availability.
          </p>
        </div>

        {/* Filters */}
        <Card className="bg-black border border-white/20">
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm text-white mb-1 block">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-black text-white border border-white/30 rounded px-3 py-2"
              >
                <option value="">All Subjects</option>
                {Object.entries(SUBJECT_OPTIONS).map(([group, list]) => (
                  <optgroup key={group} label={group}>
                    {list.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-white mb-1 block">Year</label>
              <Input
                type="number"
                min={1}
                max={8}
                placeholder="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="bg-black text-white border-white/30 placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="text-sm text-white mb-1 block">Availability</label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full bg-black text-white border border-white/30 rounded px-3 py-2"
              >
                <option value="">Any</option>
                {AVAILABILITY_OPTIONS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>

            <div className="self-end">
              <Button
                onClick={fetchTutors}
                disabled={loading}
                className="w-full bg-white text-black hover:bg-gray-200"
              >
                <Search className="w-4 h-4 mr-2" />
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tutors List */}
        {tutors.length === 0 ? (
          <div className="text-center text-gray-500 text-sm">No tutors found. Try adjusting your filters.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tutors.map((tutor) => (
              <Card
                key={tutor._id}
                className="bg-black border border-white/20 hover:scale-[1.01] transition-all"
              >
                <CardContent className="p-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-white">{tutor.name}</h3>
                    <Badge variant="outline" className="bg-white/10 border-white/30 text-white">
                      {tutor.branch} - Year {tutor.year}
                    </Badge>
                  </div>

                  <div className="text-sm text-white/80 space-y-1">
                    <p><strong>Subjects:</strong> {tutor.subjects?.join(', ') || 'N/A'}</p>
                    <p><strong>Availability:</strong> {tutor.availability?.join(', ') || 'N/A'}</p>
                    <p><strong>Teaching Modes:</strong> {tutor.teachingModes?.join(', ') || 'N/A'}</p>
                  </div>

                  <div className="flex items-center gap-1 text-yellow-400 text-sm">
                    <Star className="h-4 w-4" />
                    {tutor.rating?.toFixed(1) || 'No rating yet'}
                  </div>

                  <Button
                    onClick={() => router.push(`/dashboard/tutoring/schedule/${tutor._id}`)}
                    className="w-full mt-3 bg-white text-black hover:bg-gray-200"
                  >
                    Connect
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
