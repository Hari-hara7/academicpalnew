import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Sparkles, Share2, ArrowRight, BookOpen, CalendarCheck, BarChart3, BellRing, Newspaper, Users } from 'lucide-react';
import { NeonGradientCard } from '@/components/magicui/neon-gradient-card';
import Link from 'next/link';

export default function DashboardHome() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  let email = 'Guest';
  try {
    if (token) {
      const decoded = verifyToken(token) as any;
      email = decoded.email;
    }
  } catch {
    // fallback to guest
  }

  const features = [
    { name: 'Flashcards', icon: <BookOpen className="h-5 w-5" />, href: '/dashboard/flashcards' },
    { name: 'Study Planner', icon: <CalendarCheck className="h-5 w-5" />, href: '/dashboard/study-planner' },
    { name: 'Performance Analytics', icon: <BarChart3 className="h-5 w-5" />, href: '/dashboard/performance-analytics' },
    { name: 'Study Reminders', icon: <BellRing className="h-5 w-5" />, href: '/dashboard/study-reminders' },
    { name: 'Blogs', icon: <Newspaper className="h-5 w-5" />, href: '/dashboard/blogs' },
    { name: 'Study Groups', icon: <Users className="h-5 w-5" />, href: '/dashboard/study-groups' },
  ];

  return (
    <section className="min-h-screen px-4 py-10 md:px-8 bg-black text-white">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-2">
              <Sparkles className="text-blue-500" />
              Welcome Back 👋
            </h1>
            <p className="text-gray-400 mt-2 text-base sm:text-lg">
              Logged in as <span className="font-semibold text-blue-500">{email}</span>
            </p>
          </div>
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-blue-600 text-white text-xl font-bold">
              {email.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Neon Card Announcement */}
        <NeonGradientCard>
          <div className="p-4 sm:p-6 rounded-xl bg-[#0b0b0b] text-white shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <Avatar>
                <AvatarFallback className="bg-blue-700 text-white font-semibold">A</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-base sm:text-lg">Academic Pal</p>
                <p className="text-xs sm:text-sm text-gray-500">@academicpal</p>
              </div>
            </div>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
              🎉 You can now manage your timetable dynamically with our brand-new feature. Log in and take control of your schedule effortlessly.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white transition-all w-full sm:w-auto"
              >
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-all w-full sm:w-auto">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </NeonGradientCard>

        {/* Dashboard Features Section */}
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <Link
              key={feature.name}
              href={feature.href}
              className="bg-[#111] rounded-xl p-4 sm:p-6 border border-blue-900 hover:shadow-lg transition hover:bg-[#151515]"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-700 rounded-full text-white flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold">{feature.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-400">Go to {feature.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
