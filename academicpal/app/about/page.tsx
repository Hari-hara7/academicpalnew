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

import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiMongodb,
  SiFirebase,
  SiFlask,
  SiPandas,
  SiScikitlearn,
  SiNumpy,
} from "react-icons/si";
import { FiCpu, FiLayers, FiMessageSquare, FiHash, FiTable } from "react-icons/fi";

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"



export default function AboutPage() {

const techIcons: { [key: string]: JSX.Element } = {
  "Next.js 15": <SiNextdotjs className="w-5 h-5" />,
  "Tailwind CSS": <SiTailwindcss className="w-5 h-5" />,
  TypeScript: <SiTypescript className="w-5 h-5" />,
  MongoDB: <SiMongodb className="w-5 h-5" />,
  Firebase: <SiFirebase className="w-5 h-5" />,
};

const mlTechIcons: { [key: string]: JSX.Element } = {
  Flask: <SiFlask className="w-5 h-5" />,
  Pandas: <SiPandas className="w-5 h-5" />,
  "Scikit-Learn": <SiScikitlearn className="w-5 h-5" />,
  NLTK: <FiMessageSquare className="w-5 h-5" />, // fallback generic icon
  NumPy: <SiNumpy className="w-5 h-5" />,
};

const TechIcon = ({ tech }: { tech: string }) => techIcons[tech] || null;
const MLTechIcon = ({ tech }: { tech: string }) => mlTechIcons[tech] || null;

  return (
    <main className="min-h-screen bg-black text-gray-100 py-12 px-4 sm:px-6 md:px-12 lg:px-20">
      <section className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <header>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 mt-10 font-bold font-poppins">
            About <span className="text-white">AcademicPal</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
            AcademicPal is a powerful academic companion used by{" "}
            <span className="font-semibold">4,000+ students</span> at NMAMIT. It
            provides curated notes,  PYQs, AI-powered search, real-time
            chat, and more — all in one place.
          </p>
        </header>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
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
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 font-bold font-poppins">About the Developer</h2>
          <Card className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg shadow-md">
            <CardContent className="p-5 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold mb-1 text-gray-100 font-bold font-poppins">
                Hariharanath
              </h3>
              <p className="text-gray-300 text-sm sm:text-lg">
                3rd Year CSE Student · Full Stack Developer · Founder of AcademicPal
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="border-gray-700" />

        {/* Tech Stack */}
       <section>
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">
        Tech Stack
      </h2>
      <div className="flex flex-wrap gap-3 sm:gap-4">
        {[
          "Next.js 15",
          "Tailwind CSS",
          "TypeScript",
          "MongoDB",
          "Firebase",
        ].map((tech) => (
          <Badge
            key={tech}
            className="flex items-center gap-2 border border-gray-600 bg-white/5 text-gray-300 px-3 py-1 rounded"
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
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 font-bold font-poppins">
        Machine Learning Tech Stack
      </h2>
      <div className="flex flex-wrap gap-3 sm:gap-4 mb-4">
        {["Flask", "Pandas", "Scikit-Learn", "NLTK", "NumPy"].map((tech) => (
          <Badge
            key={tech}
            className="flex items-center gap-2 border border-gray-600 bg-white/5 text-gray-300 px-3 py-1 rounded"
          >
            <MLTechIcon tech={tech} />
            {tech}
          </Badge>
        ))}
      </div>
      <Card className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg shadow-md p-4">
        <p className="text-gray-300 text-sm sm:text-base ">
          Chatbot with AI NLP developed by{" "}
          <span className="font-semibold text-white font-bold font-poppins">Teja</span>.
        </p>
      </Card>
    </section>

        {/* Call to action buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-8">
          <Link href="/home" passHref>
            <Button
              variant="outline"
              className="bg-gray-200 text-black hover:bg-gray-300 transition w-full sm:w-auto"
            >
              Go to Homepage
            </Button>
          </Link>
          <Link href="/register" passHref>
            <Button className="bg-gray-200 text-black hover:bg-gray-300 transition w-full sm:w-auto">
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
      <CardContent className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5">
        <div className="bg-white/10 p-2 rounded">{icon}</div>
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-100 mb-1">
            {title}
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function TechBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <Badge className="flex items-center gap-2 border border-gray-600 bg-white/5 text-gray-300 px-3 py-1 rounded">
      {icon}
      {text}
    </Badge>
  )
}

function TechIcon({ tech }: { tech: string }) {
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
