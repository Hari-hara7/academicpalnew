'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

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

const AVAILABILITY_OPTIONS = ['Mornings', 'Afternoons', 'Evenings', 'Weekends'];

const TEACHING_MODES = ['Chat', 'Voice', 'Video', 'Notes Sharing'];

export default function BecomeTutorPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  const [subjects, setSubjects] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);
  const [teachingModes, setTeachingModes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleOption = (option: string, list: string[], setList: (list: string[]) => void) => {
    if (list.includes(option)) {
      setList(list.filter((item) => item !== option));
    } else {
      setList([...list, option]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/tutoring/tutors/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        branch,
        year: Number(year),
        subjects,
        availability,
        teachingModes,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      alert('Successfully registered as tutor!');
      router.push('/dashboard/tutoring/find-tutor');
    } else {
      alert('Failed to register. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Become a Tutor</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label>Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div>
          <Label>Branch</Label>
          <Input value={branch} onChange={(e) => setBranch(e.target.value)} required />
        </div>

        <div>
          <Label>Year</Label>
          <Input
            type="number"
            min={1}
            max={8}
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>

        <div>
          <Label>Subjects you’re good at</Label>
          <div className="flex flex-wrap gap-4 mt-2">
            {SUBJECT_OPTIONS.map((subject) => (
              <label key={subject} className="flex items-center space-x-2">
                <Checkbox
                  checked={subjects.includes(subject)}
                  onCheckedChange={() => toggleOption(subject, subjects, setSubjects)}
                />
                <span>{subject}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <Label>Availability</Label>
          <div className="flex flex-wrap gap-4 mt-2">
            {AVAILABILITY_OPTIONS.map((slot) => (
              <label key={slot} className="flex items-center space-x-2">
                <Checkbox
                  checked={availability.includes(slot)}
                  onCheckedChange={() => toggleOption(slot, availability, setAvailability)}
                />
                <span>{slot}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <Label>Teaching Modes</Label>
          <div className="flex flex-wrap gap-4 mt-2">
            {TEACHING_MODES.map((mode) => (
              <label key={mode} className="flex items-center space-x-2">
                <Checkbox
                  checked={teachingModes.includes(mode)}
                  onCheckedChange={() => toggleOption(mode, teachingModes, setTeachingModes)}
                />
                <span>{mode}</span>
              </label>
            ))}
          </div>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register as Tutor'}
        </Button>
      </form>
    </div>
  );
}
