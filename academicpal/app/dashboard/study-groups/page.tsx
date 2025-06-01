'use client';

import { useEffect, useState } from 'react';
import { StudyGroup } from '@/types/studyGroup';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
    <div className="min-h-screen bg-black text-white p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🔎 Browse Study Groups</h1>
        <Link href="/dashboard/study-groups/create">
          <Button
            variant="outline"
            className="flex gap-2 border border-white/20 hover:border-white/40 text-black"
          >
            <Plus size={16} />
            Create Group
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Input
          placeholder="Subject / Course"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="bg-transparent border border-white/20 focus:border-white/40 placeholder:text-white/40"
        />
        <Input
          placeholder="Location / Platform"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-transparent border border-white/20 focus:border-white/40 placeholder:text-white/40"
        />
        <Select value={isOpen} onValueChange={(value) => setIsOpen(value as any)}>
          <SelectTrigger className="bg-transparent border border-white/20 focus:border-white/40 text-white/80">
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
          className="flex gap-2 border text-black border-white/20 hover:border-white/40"
        >
          <Search size={16} />
          Search
        </Button>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-white/70">
          <Loader2 className="animate-spin" size={20} />
          Loading groups...
        </div>
      )}

      {error && (
        <p className="text-red-400">{error}</p>
      )}

      {!loading && !error && groups.length === 0 && (
        <p className="text-white">No groups found matching your criteria.</p>
      )}

      <div className="grid gap-4">
        {groups.map((group) => (
          <Card
            key={group._id}
            className="bg-transparent border border-white/20 hover:border-white/40 transition cursor-pointer"
            onClick={() => (window.location.href = `/dashboard/study-groups/${group._id}`)}
          >
            <CardHeader>
              <CardTitle className="text-white">{group.groupName}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm text-white/70">
              <p>{group.subject}</p>
              <p className="text-white/50">{group.description}</p>
              <p className="text-white/50">
                Meeting: {group.meetingTime} @ {group.location}
                {group.platform ? ` (${group.platform})` : ''}
              </p>
              <p className="text-white/50">
                Members: {group.members.length} / {group.maxMembers} — {group.isOpen ? 'Open' : 'Closed'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
