'use client';

import { useEffect, useState } from 'react';
import { StudyGroup } from '@/types/studyGroup';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Search, Plus } from 'lucide-react';
import Link from 'next/link';

export default function StudyGroupsPage() {
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters
  const [subject, setSubject] = useState('');
  const [location, setLocation] = useState('');
  const [isOpen, setIsOpen] = useState<'all' | 'open' | 'closed'>('all');

  const fetchGroups = async () => {
    setLoading(true);
    setError('');

    const params = new URLSearchParams();
    if (subject.trim()) params.append('subject', subject.trim());
    if (location.trim()) params.append('location', location.trim());
    if (isOpen !== 'all') params.append('isOpen', isOpen === 'open' ? 'true' : 'false');

    try {
      const res = await fetch('/api/study-groups/get?' + params.toString());
      const data = await res.json();

      if (data.success) {
        setGroups(data.groups);
      } else {
        setError(data.message || 'Failed to load study groups.');
      }
    } catch {
      setError('Failed to load study groups.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold whitespace-nowrap">
          🔎 Browse Study Groups
        </h1>
        <Link href="/dashboard/study-groups/create" className="w-full sm:w-auto">
          <Button
            variant="outline"
            className="flex gap-2 border border-white/20 hover:border-white/40 text-black justify-center w-full sm:w-auto"
          >
            <Plus size={16} />
            Create Group
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-8">
        <Input
          placeholder="Subject / Course"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="bg-transparent border border-white/20 focus:border-white/40 placeholder:text-white/40 flex-grow min-w-[150px]"
        />
        <Input
          placeholder="Location / Platform"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-transparent border border-white/20 focus:border-white/40 placeholder:text-white/40 flex-grow min-w-[150px]"
        />
        <Select
          value={isOpen}
          onValueChange={(value) => setIsOpen(value as any)}
          className="min-w-[150px] flex-grow sm:flex-grow-0"
        >
          <SelectTrigger className="bg-transparent border border-white/20 focus:border-white/40 text-white/80 w-full sm:w-auto">
            <SelectValue placeholder="Group Status" />
          </SelectTrigger>
          <SelectContent className="bg-black border border-white/20 text-white">
            <SelectItem value="all">All Groups</SelectItem>
            <SelectItem value="open">Open Groups</SelectItem>
            <SelectItem value="closed">Closed Groups</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={fetchGroups}
          className="flex gap-2 border text-black border-white/20 hover:border-white/40 justify-center w-full sm:w-auto"
        >
          <Search size={16} />
          Search
        </Button>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-white/70 justify-center">
          <Loader2 className="animate-spin" size={20} />
          Loading groups...
        </div>
      )}

      {error && <p className="text-red-400 text-center">{error}</p>}

      {!loading && !error && groups.length === 0 && (
        <p className="text-white text-center">No groups found matching your criteria.</p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {groups.map((group) => (
          <Card
            key={group._id}
            className="bg-transparent border border-white/20 hover:border-white/40 transition cursor-pointer"
            onClick={() => (window.location.href = `/dashboard/study-groups/${group._id}`)}
          >
            <CardHeader>
              <CardTitle className="text-white truncate">{group.groupName}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm text-white/70">
              <p className="truncate">{group.subject}</p>
              <p className="text-white/50 truncate">{group.description}</p>
              <p className="text-white/50 truncate">
                Meeting: {group.meetingTime} @ {group.location}
                {group.platform ? ` (${group.platform})` : ''}
              </p>
              <p className="text-white/50">
                Members: {group.members.length} / {group.maxMembers} —{' '}
                {group.isOpen ? 'Open' : 'Closed'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
