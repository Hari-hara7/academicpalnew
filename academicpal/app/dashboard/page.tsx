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
    { name: 'Flashcards', icon: <BookOpen className="h-5 w-5" />, href: '/flashcards' },
    { name: 'Study Planner', icon: <CalendarCheck className="h-5 w-5" />, href: '/study-planner' },
    { name: 'Performance Analytics', icon: <BarChart3 className="h-5 w-5" />, href: '/analytics' },
    { name: 'Study Reminders', icon: <BellRing className="h-5 w-5" />, href: '/reminders' },
    { name: 'Blogs', icon: <Newspaper className="h-5 w-5" />, href: '/blogs' },
    { name: 'Study Groups', icon: <Users className="h-5 w-5" />, href: '/groups' },
  ];

  return (
    <section className="min-h-screen px-4 py-10 md:px-16 bg-black text-white">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight flex items-center gap-2">
              <Sparkles className="text-blue-500" />
              Welcome Back 👋
            </h1>
            <p className="text-gray-400 mt-2 text-lg">
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
          <div className="p-6 rounded-xl bg-[#0b0b0b] text-white shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <Avatar>
                <AvatarFallback className="bg-blue-700 text-white font-semibold">A</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-lg text-white">Academic Pal</p>
                <p className="text-sm text-gray-500">@academicpal</p>
              </div>
            </div>

            <p className="text-gray-300 text-base leading-relaxed mb-6">
              🎉 You can now manage your timetable dynamically with our brand-new feature. Log in and take control of your schedule effortlessly.
            </p>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white transition-all"
              >
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-all">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </NeonGradientCard>

        {/* Dashboard Features Section */}
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <Link key={feature.name} href={feature.href} className="bg-[#111] rounded-xl p-6 border border-blue-900 hover:shadow-lg transition hover:bg-[#151515]">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-700 rounded-full text-white">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{feature.name}</h3>
                  <p className="text-sm text-gray-400">Go to {feature.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
