"use client"

import {
  AlarmClock,
  BarChart4,
  Brain,
  CalendarCheck,
  CalendarDays,
  FileText,
  MessageCircle,
  NotebookText,
  Search,
  UploadCloud,
  Users2,
  LogOut,
  Mail,
  UserCircle,
  Info,
  Map,
} from "lucide-react"

import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const FEATURES = [
  {
    title: "Blogs",
    description: "Read and write blogs on study strategies, academic tips, and personal experiences.",
    icon: FileText,
    iconColor: "text-pink-500",
    link: "/register",
    buttonText: "Explore Blogs",
  },
  {
    title: "Comprehensive Notes",
    description: "Access crisp, well-organized notes for all subjects. Designed for clarity and speed.",
    icon: NotebookText,
    iconColor: "text-purple-500",
    link: "/notes",
    buttonText: "Access Notes",
  },

  {
    title: 'Tech Roadmaps',
    description:
      'Explore structured roadmaps for various technologies. Stay on track with curated paths for frontend, backend, DevOps, AI, and more.',
    icon: Map,
    iconColor: 'text-yellow-500',
    link: '/roadmaps',
    buttonText: 'Explore Roadmaps',
  },
  {
    title: "Past Question Papers",
    description: "Prepare with confidence using past papers and understand exam patterns.",
    icon: FileText,
    iconColor: "text-orange-500",
    link: "/past-papers",
    buttonText: "View Papers",
  },
  {
    title: "Real-Time Chat",
    description: "Engage with peers instantly. Ask, share, and get help live.",
    icon: MessageCircle,
    iconColor: "text-cyan-500",
    link: "/chat",
    buttonText: "Chat Now",
  },
  {
    title: "AcademicPal AI - Smart Notes Search",
    description: "Powered by AI, find what you need in seconds — notes, references, and more.",
    icon: Search,
    iconColor: "text-lime-500",
    link: "https://academicpal-ml-chatbot-g6gn.vercel.app/",
    buttonText: "Start Searching",
  },
  {
    title: "Access & Contribute Materials",
    description: "Upload your resources and explore shared content from others.",
    icon: UploadCloud,
    iconColor: "text-red-500",
    link: "/upload",
    buttonText: "Upload or Explore",
  },
  {
    title: "Flashcards",
    description: "Memorize key concepts with interactive, subject-based flashcards.",
    icon: Brain,
    iconColor: "text-purple-500",
    link: "/register",
    buttonText: "Start Reviewing",
  },
  {
    title: "Study Planner",
    description: "Plan your study schedule efficiently with timetables and task lists.",
    icon: CalendarCheck,
    iconColor: "text-blue-500",
    link: "/register",
    buttonText: "Plan Now",
  },
  {
    title: "Performance Analytics",
    description: "Track your study hours, weak areas, and progress with charts.",
    icon: BarChart4,
    iconColor: "text-green-500",
    link: "/register",
    buttonText: "View Stats",
  },
  {
    title: "Study Reminders",
    description: "Stay on track with browser-based personalized study alerts.",
    icon: AlarmClock,
    iconColor: "text-yellow-500",
    link: "/register",
    buttonText: "Set Reminders",
  },
  {
    title: "Study Groups",
    description: "Join or create study groups with like-minded peers.",
    icon: Users2,
    iconColor: "text-pink-500",
    link: "/register",
    buttonText: "Join a Group",
  },
  {
    title: "Timetable Generator",
    description: "Easily create a personalized academic timetable.",
    icon: CalendarDays,
    iconColor: "text-indigo-500",
    link: "/register",
    buttonText: "Generate Timetable",
  },
]

const Dashboard = () => {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
      } else {
        router.push("/signup")
      }
    })

    return () => unsubscribe()
  }, [router])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push("/signup")
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  if (!user)
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white text-lg font-semibold">
        Loading your dashboard...
      </div>
    )

  return (
    <main className="min-h-screen bg-black text-white p-6 md:px-20">
      <h1 className="text-2xl md:text-4xl font-bold mb-8 flex items-center gap-2 justify-center mt-12">
        <UserCircle className="w-8 h-8" /> Welcome, {user.displayName?.split(" ")[0]}!
      </h1>

      <Card className="w-full max-w-md mx-auto bg-black-900 text-white shadow-xl rounded-2xl border border-gray-700 mb-12">
        <CardHeader className="flex flex-col items-center gap-4">
          <Image
            src={user.photoURL || "/default-profile.png"}
            alt="Profile Picture"
            width={100}
            height={100}
            className="rounded-full border-2 border-gray-600"
          />
          <div className="text-center">
            <h2 className="text-lg md:text-xl font-semibold flex items-center justify-center gap-2">
              <UserCircle className="w-4 h-4" /> {user.displayName}
            </h2>
            <p className="flex items-center gap-2 text-xs text-gray-400">
              <Mail className="w-4 h-4" /> {user.email}
            </p>
          </div>
        </CardHeader>

        <Separator className="bg-gray-700" />

        <CardContent className="mt-4 space-y-2 text-center">
          <p className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <Info className="w-4 h-4" /> This dashboard is your personalized space in AcademicPal.
          </p>
          <p className="text-xs text-gray-400">
            Explore notes, access features, and manage your profile — all in one place.
          </p>
        </CardContent>

        <Separator className="bg-gray-700 my-4" />

        <CardFooter className="flex justify-center">
          <Button
            onClick={handleLogout}
            className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </CardFooter>
      </Card>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map(({ title, description, icon: Icon, iconColor, link, buttonText }) => (
          <Card
            key={title}
            className="bg-white/5 border border-white/10 backdrop-blur-sm shadow-md text-white p-5 rounded-xl flex flex-col justify-between"
          >
            <div>
              <div className={`mb-4 flex items-center gap-2 text-lg font-semibold ${iconColor}`}>
                <Icon className="w-6 h-6" />
                {title}
              </div>
              <p className="text-sm text-gray-300">{description}</p>
            </div>
            <div className="mt-4">
              <Link href={link} target={link.startsWith("http") ? "_blank" : "_self"}>
                <Button variant="outline" className="w-full border-white/20 text-black hover:bg-white/10">
                  {buttonText}
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </section>

      <p className="mt-10 text-xs text-gray-500 text-center max-w-xs mx-auto">
        AcademicPal - Your trusted partner in academic excellence. <br />
        <span className="italic">Not affiliated with NMAMIT College.</span>
      </p>
    </main>
  )
}

export default Dashboard
