"use client"

import {
  BookOpen,
  User2,
  Brain,
  Send,
  Timer,
  CalendarCheck,
  FileText,
  BarChart3,
  Users,
  Cpu,
  Table,
  Layers,
  MessageSquare,
  Hash,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-gray-100 py-12 px-6 md:px-20">
      <section className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <header>
          <h1 className="text-5xl font-extrabold tracking-tight mb-4 mt-8">
            About <span className="text-white">AcademicPal</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
            AcademicPal is a powerful academic companion used by{" "}
            <span className="font-semibold">4,000+ students</span> at NMAMIT. It
            provides curated notes, solved PYQs, AI-powered search, real-time
            chat, and more — all in one place.
          </p>
        </header>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Feature
            icon={<Users className="w-6 h-6 text-gray-300" />}
            title="4K+ Active Users"
            description="Trusted by thousands of NMAMIT students every semester."
          />
          <Feature
            icon={<Brain className="w-6 h-6 text-gray-300" />}
            title="AI-powered Search"
            description="Find relevant notes and questions in seconds."
          />
          <Feature
            icon={<Send className="w-6 h-6 text-gray-300" />}
            title="Real-Time Community"
            description="Chat, share, and collaborate with your peers live."
          />
          <Feature
            icon={<BookOpen className="w-6 h-6 text-gray-300" />}
            title="Comprehensive Notes"
            description="Access crisp, well-organized notes for all subjects."
          />
          <Feature
            icon={<FileText className="w-6 h-6 text-gray-300" />}
            title="Past Question Papers"
            description="Prepare with confidence using past exam patterns."
          />
          <Feature
            icon={<Timer className="w-6 h-6 text-gray-300" />}
            title="Study Reminders"
            description="Stay on track with personalized notifications."
          />
          <Feature
            icon={<CalendarCheck className="w-6 h-6 text-gray-300" />}
            title="Timetable Generator"
            description="Create and customize academic timetables easily."
          />
          <Feature
            icon={<BarChart3 className="w-6 h-6 text-gray-300" />}
            title="Performance Analytics"
            description="Track study hours, identify weak areas, and improve."
          />
        </div>

        <Separator className="border-gray-700" />

        {/* About the Developer */}
        <section>
          <h2 className="text-3xl font-semibold mb-5">About the Developer</h2>
          <Card className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg shadow-md">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-1 text-gray-100">
                Hariharanath
              </h3>
              <p className="text-gray-300 text-lg">
                3rd Year CSE Student · Full Stack Developer · Founder of AcademicPal
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="border-gray-700" />

        {/* Tech Stack */}
        <section>
          <h2 className="text-3xl font-semibold mb-6">Tech Stack</h2>
          <div className="flex flex-wrap gap-4">
            {[
              "Next.js 15",
              "Tailwind CSS",
              "TypeScript",
              "ShadCN UI",
              "MongoDB",
              "Firebase",
            ].map((tech) => (
              <Badge
                key={tech}
                className="border border-gray-600 bg-white/5 text-gray-300 px-4 py-1 font-medium rounded flex items-center gap-2"
              >
                <TechIcon tech={tech} />
                {tech}
              </Badge>
            ))}
          </div>
        </section>

        <Separator className="border-gray-700" />

        {/* Machine Learning Tech Stack */}
        <section>
          <h2 className="text-3xl font-semibold mb-6">Machine Learning Tech Stack</h2>
          <div className="flex flex-wrap gap-4 mb-4">
            <TechBadge icon={<Cpu className="w-5 h-5" />} text="Flask" />
            <TechBadge icon={<Table className="w-5 h-5" />} text="Pandas" />
            <TechBadge icon={<Layers className="w-5 h-5" />} text="Scikit-Learn" />
            <TechBadge icon={<MessageSquare className="w-5 h-5" />} text="NLTK" />
            <TechBadge icon={<Hash className="w-5 h-5" />} text="NumPy" />
          </div>
          <Card className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg shadow-md p-4">
            <p className="text-gray-300 text-lg">
              Chatbot with AI NLP developed by{" "}
              <span className="font-semibold text-white">Teja</span>.
            </p>
          </Card>
        </section>

        {/* Call to action buttons */}
       <div className="flex flex-wrap gap-4 mt-12">
  <Link href="/" passHref>
    <Button
      as="/home"
      variant="outline"
      className="bg-gray-200 text-black hover:bg-gray-300 transition"
    >
      Go to Homepage
    </Button>
  </Link>
  <Link href="/try" passHref>
    <Button
      as="/login"
      className="bg-gray-200 text-black hover:bg-gray-300 transition"
    >
      Try AcademicPal Now
    </Button>
  </Link>
</div>
      </section>
    </main>
  )
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-default">
      <CardContent className="flex items-start gap-4 p-5">
        <div className="bg-white/10 p-2 rounded-md">{icon}</div>
        <div>
          <h3 className="text-xl font-semibold text-gray-100 mb-1">{title}</h3>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function TechBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <Badge className="flex items-center gap-2 border border-gray-600 bg-white/5 text-gray-300 px-4 py-1 font-medium rounded">
      {icon}
      {text}
    </Badge>
  )
}

// Optional: map tech names to icons for the main Tech Stack badges
function TechIcon({ tech }: { tech: string }) {
  // Simple icon mapping for main tech stack
  switch (tech) {
    case "Next.js 15":
      return <Cpu className="w-5 h-5 text-gray-300" />
    case "Tailwind CSS":
      return <Layers className="w-5 h-5 text-gray-300" />
    case "TypeScript":
      return <Hash className="w-5 h-5 text-gray-300" />
    case "ShadCN UI":
      return <User2 className="w-5 h-5 text-gray-300" />
    case "MongoDB":
      return <Table className="w-5 h-5 text-gray-300" />
    case "Firebase":
      return <Send className="w-5 h-5 text-gray-300" />
    default:
      return null
  }
}
