'use client';

import Link from 'next/link';
import {
  GraduationCap,
  Search,
  CalendarPlus,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function TutoringHomePage() {
  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 flex items-center gap-3">
          <GraduationCap className="w-7 h-7 text-white" />
          Peer-to-Peer Tutoring
        </h1>
        <p className="text-gray-300 mb-10 text-sm sm:text-base max-w-2xl">
          Welcome to <span className="font-semibold text-white">AcademicPal</span>’s tutoring hub — where you can become a tutor, find help, and manage your learning journey.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Become a Tutor */}
          <Card className="bg-white/5 border border-white/10 backdrop-blur-lg h-full flex flex-col justify-between">
            <CardContent className="flex flex-col gap-4 h-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <Users className="w-5 h-5 text-white" />
                  Become a Tutor
                </div>
                <Badge className="bg-white/10 border border-white/20 text-white text-xs">
                  New
                </Badge>
              </div>
              <p className="text-gray-400 text-sm flex-grow">
                Help others in subjects you excel at and earn recognition in the community.
              </p>
              <Button asChild className="w-full mt-auto" variant="secondary">
                <Link href="/dashboard/tutoring/become">Get Started</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Find a Tutor */}
          <Card className="bg-white/5 border border-white/10 backdrop-blur-lg h-full flex flex-col justify-between">
            <CardContent className="flex flex-col gap-4 h-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <Search className="w-5 h-5 text-white" />
                  Find a Tutor
                </div>
                <Badge className="bg-white/10 border border-white/20 text-white text-xs">
                  Verified
                </Badge>
              </div>
              <p className="text-gray-400 text-sm flex-grow">
                Discover top-rated tutors by subject, skill level, or availability.
              </p>
              <Button asChild className="w-full mt-auto" variant="secondary">
                <Link href="/dashboard/tutoring/find-tutor">Browse Tutors</Link>
              </Button>
            </CardContent>
          </Card>

          

          {/* My Sessions */}
          <Card className="bg-white/5 border border-white/10 backdrop-blur-lg h-full flex flex-col justify-between">
            <CardContent className="flex flex-col gap-4 h-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <CalendarPlus className="w-5 h-5 text-white" />
                  My Sessions
                </div>
                <Badge className="bg-white/10 border border-white/20 text-white text-xs">
                  History
                </Badge>
              </div>
              <p className="text-gray-400 text-sm flex-grow">
                Track your upcoming and completed sessions, both as a tutor and a learner.
              </p>
              <Button asChild className="w-full mt-auto" variant="secondary">
                <Link href="/dashboard/tutoring/my-sessions">View Sessions</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
