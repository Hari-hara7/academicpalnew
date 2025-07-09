'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { GraduationCap, User, BookOpenCheck, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const BTECH_SUBJECTS = {
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

  const toggleOption = (
    option: string,
    list: string[],
    setList: (list: string[]) => void
  ) => {
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
      toast.success('🎉 You are now a registered tutor!');
      router.push('/dashboard/tutoring/find-tutor');
    } else {
      toast.error('❌ Failed to register. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-white">
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <GraduationCap className="w-6 h-6" />
          Become a Tutor
        </h1>
        <p className="text-gray-400 mb-10 max-w-xl">
          Share your skills and help your peers thrive. Register now to become a tutor.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <Card className="bg-white/5 backdrop-blur-md border border-white/10">
            <CardContent className="p-6 space-y-4">
              <div>
                <Label className="text-white">Name</Label>
                <Input
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-black border-white/20 text-white placeholder:text-gray-400"
                  required
                />
              </div>
              <div>
                <Label className="text-white">Branch</Label>
                <Input
                  placeholder="CSE, ECE, etc."
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="bg-black border-white/20 text-white placeholder:text-gray-400"
                  required
                />
              </div>
              <div>
                <Label className="text-white">Year</Label>
                <Input
                  type="number"
                  min={1}
                  max={4}
                  placeholder="1 to 4"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="bg-black border-white/20 text-white placeholder:text-gray-400"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Subjects */}
          <Card className="bg-white/5 backdrop-blur-md border border-white/10">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg flex items-center gap-2 text-white">
                  <BookOpenCheck className="w-5 h-5" />
                  Subjects
                </Label>
                <Badge variant="outline" className="text-xs text-white border-white/30 bg-white/10">
                  B.Tech Subjects
                </Badge>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {Object.entries(BTECH_SUBJECTS).map(([yearLabel, subjectsArray]) => (
                  <div key={yearLabel}>
                    <h4 className="text-sm font-semibold mb-2 text-white/80">{yearLabel}</h4>
                    <div className="space-y-2">
                      {subjectsArray.map((subject) => (
                        <div key={subject} className="flex items-center gap-2">
                          <Checkbox
                            checked={subjects.includes(subject)}
                            onCheckedChange={() =>
                              toggleOption(subject, subjects, setSubjects)
                            }
                          />
                          <span className="text-sm text-white">{subject}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Availability */}
          <Card className="bg-white/5 backdrop-blur-md border border-white/10">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg flex items-center gap-2 text-white">
                  <Clock className="w-5 h-5" />
                  Availability
                </Label>
                <Badge variant="outline" className="text-xs text-white border-white/30 bg-white/10">
                  Flexible Time
                </Badge>
              </div>
              <div className="flex flex-wrap gap-4">
                {AVAILABILITY_OPTIONS.map((slot) => (
                  <div key={slot} className="flex items-center gap-2">
                    <Checkbox
                      checked={availability.includes(slot)}
                      onCheckedChange={() =>
                        toggleOption(slot, availability, setAvailability)
                      }
                    />
                    <span className="text-sm text-white">{slot}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Teaching Modes */}
          <Card className="bg-white/5 backdrop-blur-md border border-white/10">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg flex items-center gap-2 text-white">
                  <User className="w-5 h-5" />
                  Teaching Modes
                </Label>
                <Badge variant="outline" className="text-xs text-white border-white/30 bg-white/10">
                  Multiple Formats
                </Badge>
              </div>
              <div className="flex flex-wrap gap-4">
                {TEACHING_MODES.map((mode) => (
                  <div key={mode} className="flex items-center gap-2">
                    <Checkbox
                      checked={teachingModes.includes(mode)}
                      onCheckedChange={() =>
                        toggleOption(mode, teachingModes, setTeachingModes)
                      }
                    />
                    <span className="text-sm text-white">{mode}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="text-right">
            <Button
              type="submit"
              disabled={loading}
              className="bg-white text-black hover:bg-gray-200"
            >
              {loading ? 'Registering...' : 'Register as Tutor'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
