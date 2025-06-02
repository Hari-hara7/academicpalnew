'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { StudyGroup } from '@/types/studyGroup';
import {
  Loader2,
  Users,
  Calendar,
  MapPin,
  Laptop2,
  Info,
  CheckCircle,
  AlertTriangle,
  BookOpen,
} from 'lucide-react';

export default function StudyGroupDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const groupId = params?.id as string;

  const [group, setGroup] = useState<StudyGroup | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchGroup = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/study-groups/getById?id=${groupId}`);
      const data = await res.json();
      if (data.success) {
        setGroup(data.group);
      } else {
        setError(data.message || 'Group not found');
      }
    } catch {
      setError('Failed to fetch group details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (groupId) {
      fetchGroup();
    }
  }, [groupId]);

  const handleJoin = async () => {
    if (!group) return;
    setActionLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/study-groups/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groupId }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(data.message || 'Request successful');
        fetchGroup();
      } else {
        setMessage(data.message || 'Failed to join group');
      }
    } catch {
      setMessage('Failed to send join request');
    } finally {
      setActionLoading(false);
    }
  };

  // Replace with actual user id logic
  const isMember = group?.members.includes('currentUserId');
  const hasRequested = group?.joinRequests.includes('currentUserId');

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 text-white/70 p-6 min-h-screen bg-black">
        <Loader2 className="animate-spin" size={24} />
        <span className="text-lg">Loading group details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-6 min-h-screen bg-black">
        <p className="text-red-500 text-center text-base sm:text-lg max-w-md">{error}</p>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="flex items-center justify-center p-6 min-h-screen bg-black">
        <p className="text-white/60 text-center text-base sm:text-lg max-w-md">Group not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-3xl bg-black/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 flex flex-col gap-6">
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3 text-white">
          <BookOpen size={28} /> {group.groupName}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white/80">
          <p className="flex items-center gap-2 text-sm sm:text-base">
            <Users size={18} className="text-white/60" />
            <span className="font-medium">Members:</span> {group.members.length} / {group.maxMembers}
          </p>
          <p className="flex items-center gap-2 text-sm sm:text-base">
            <Calendar size={18} className="text-white/60" />
            <span className="font-medium">Meeting Time:</span> {group.meetingTime}
          </p>
          <p className="flex items-center gap-2 text-sm sm:text-base">
            <MapPin size={18} className="text-white/60" />
            <span className="font-medium">Location:</span> {group.location}
          </p>
          {group.platform && (
            <p className="flex items-center gap-2 text-sm sm:text-base">
              <Laptop2 size={18} className="text-white/60" />
              <span className="font-medium">Platform:</span> {group.platform}
            </p>
          )}
          <p className="flex items-center gap-2 text-sm sm:text-base col-span-full">
            <Info size={18} className="text-white/60" />
            <span className="font-medium">Subject:</span> {group.subject}
          </p>
          <p className="flex items-center gap-2 text-sm sm:text-base col-span-full whitespace-pre-wrap">
            <Info size={18} className="text-white/60" />
            <span className="font-medium">Description:</span> {group.description}
          </p>
          <p className="flex items-center gap-2 text-sm sm:text-base col-span-full">
            <Info size={18} className="text-white/60" />
            <span className="font-medium">Group Status:</span> {group.isOpen ? 'Open' : 'Closed'}
          </p>
        </div>

        {message && (
          <p className="my-4 text-blue-400 font-semibold flex items-center gap-2 text-center">
            <Info size={20} /> {message}
          </p>
        )}

        <div className="mt-2">
          {!isMember && !hasRequested && (
            <Button
              disabled={actionLoading}
              onClick={handleJoin}
              className="bg-transparent border border-white/30 text-white hover:border-white hover:bg-white/10 transition-colors flex items-center gap-2 w-full py-3 rounded-lg text-base sm:text-lg justify-center"
            >
              {group.isOpen ? <Users size={20} /> : <AlertTriangle size={20} />}
              {group.isOpen ? 'Join Group' : 'Request to Join'}
            </Button>
          )}

          {isMember && (
            <p className="mt-4 flex items-center gap-2 text-green-500 font-semibold justify-center text-center">
              <CheckCircle size={20} /> You are already a member of this group.
            </p>
          )}

          {hasRequested && !isMember && (
            <p className="mt-4 flex items-center gap-2 text-yellow-400 font-semibold justify-center text-center">
              <AlertTriangle size={20} /> Join request sent. Waiting for approval.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
