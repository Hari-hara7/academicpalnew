'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap, Search, CalendarPlus, Users } from 'lucide-react';

export default function TutoringHomePage() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <GraduationCap className="w-6 h-6" />
        Peer-to-Peer Tutoring
      </h1>
      <p className="text-gray-600 mb-6">
        Welcome to AcademicPal’s peer tutoring hub! Here, you can become a tutor, find help, schedule sessions, or view your tutoring history.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 border rounded-lg bg-white shadow">
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Become a Tutor
          </h3>
          <p className="text-sm text-gray-500 mb-3">Offer help in subjects you’re confident in and earn peer recognition.</p>
          <Button asChild>
            <Link href="/dashboard/tutoring/become">Get Started</Link>
          </Button>
        </div>

        <div className="p-6 border rounded-lg bg-white shadow">
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
            <Search className="w-5 h-5" />
            Find a Tutor
          </h3>
          <p className="text-sm text-gray-500 mb-3">Search and connect with tutors based on subject and availability.</p>
          <Button asChild variant="secondary">
            <Link href="/dashboard/tutoring/find-tutor">Browse Tutors</Link>
          </Button>
        </div>

        <div className="p-6 border rounded-lg bg-white shadow">
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
            <CalendarPlus className="w-5 h-5" />
            My Sessions
          </h3>
          <p className="text-sm text-gray-500 mb-3">View your scheduled or past tutoring sessions as a tutor or learner.</p>
          <Button asChild>
            <Link href="/dashboard/tutoring/my-sessions">View Sessions</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
