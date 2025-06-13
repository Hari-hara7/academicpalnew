"use client";

import { usePathname } from "next/navigation";
import Head from "next/head";
import Script from "next/script"; // ✅ Import Script for Google Analytics

import Header from "../components/Header";
import HomeHeader from "../components/NavBar";
import HomeFooter from "../components/Footerhome";
import BottomNav from "../components/BottomNav";
import Loginfooter from "../components/LoginFooter";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const showHeader = pathname === "/" || pathname === "/signup";

  const showHomeHeader =
    [
      "/home",
      "/chat",
      "/upload",
      "/dashboard",
      "/login",
      "/register",
      "/contact",
      "/dashboard/study-planner",
      "/dashboard/timetable",
      "/dashboard/timetable/create",
      "/dashboard/study-groups",
      "/dashboard/flashcards",
      "/dashboard/flashcards/create",
      "/dashboard/study-reminders",
      "/dashboard/study-groups/create",
      "/dashboard/performance-analytics",
      "/dashboard/study-reminders/create",
      "/dashboard/blogs",
      "/dashboard/blogs/create",
      "/dashboard/performance-analytics/create",
      "/about",
      "/dashboardd",
      "/roadmaps",
    ].includes(pathname) ||
    pathname.startsWith("/dashboard/timetable/edit/") ||
    pathname.startsWith("/dashboard/timetable/delete/") ||
    pathname.startsWith("/dashboard/flashcards/edit/") ||
    pathname.startsWith("/dashboard/study-planner/edit/") ||
    pathname.startsWith("/dashboard/study-planner/delete/") ||
    pathname.startsWith("/dashboard/study-reminders/edit/") ||
    pathname.startsWith("/dashboard/blogs/") ||
    pathname.startsWith("/dashboard/study-groups/") ||
    pathname.startsWith("/dashboard/performance-analytics/edit/");

  const seoData: Record<
    string,
    { title: string; description: string; keywords: string }
  > = {
    "/": {
      title: "Academic Pal - Comprehensive B.Tech Notes, Papers & Study Resources",
      description:
        "Academic Pal offers detailed notes, past question papers, important questions, and extensive study materials for B.Tech students. Your ultimate academic companion!",
      keywords:
        "Academic Pal, B.Tech notes, question papers, study resources, NMAMIT, engineering notes, exam preparation",
    },
    "/about": {
      title: "About Academic Pal - Your Trusted Academic Companion",
      description:
        "Learn more about Academic Pal, a platform dedicated to helping engineering students excel with top-quality study materials and resources.",
      keywords: "About Academic Pal, academic resources, study help, B.Tech notes",
    },
    "/contact": {
      title: "Contact Academic Pal - Get in Touch",
      description:
        "Contact Academic Pal for support, suggestions, or collaborations. We’re here to help engineering students succeed.",
      keywords: "Academic Pal contact, support, collaboration, feedback",
    },
    "/notes": {
      title: "Academic Pal Notes - Detailed & Organized B.Tech Study Notes",
      description:
        "Browse and download detailed B.Tech notes categorized by semester and branch. Make your study efficient with Academic Pal's quality notes.",
      keywords: "B.Tech notes, engineering notes, semester notes, study notes, Academic Pal",
    },
    "/login": {
      title: "Login to Academic Pal - Access Your Study Dashboard",
      description:
        "Secure login to Academic Pal to access personalized study materials, notes, question papers, and performance tracking.",
      keywords: "Academic Pal login, student dashboard, study access, secure login",
    },
    "/register": {
      title: "Register at Academic Pal - Join Our Academic Community",
      description:
        "Sign up for Academic Pal to unlock comprehensive B.Tech notes, question papers, study groups, and personalized learning tools.",
      keywords: "Academic Pal registration, sign up, student community, study platform",
    },
    "/dashboard": {
      title: "Academic Pal Dashboard - Manage Your Study Plans & Progress",
      description:
        "Your personalized dashboard to manage notes, timetables, study groups, flashcards, and analytics with Academic Pal.",
      keywords: "Academic Pal dashboard, study planner, flashcards, study analytics",
    },
    "/blogs": {
      title: "Academic Pal Blog - Study Tips, Exam Strategies & Tech Updates",
      description:
        "Read the latest posts on effective study techniques, exam preparation, and technology trends for engineering students.",
      keywords: "Academic Pal blog, study tips, exam strategies, engineering blog",
    },
    "/about-us": {
      title: "About Us - Meet the Team Behind Academic Pal",
      description:
        "Get to know the creators of Academic Pal, our mission, vision, and commitment to supporting engineering students.",
      keywords: "Academic Pal team, about us, mission, vision, academic support",
    },
    "/privacy-policy": {
      title: "Privacy Policy - Academic Pal",
      description:
        "Learn about Academic Pal's commitment to protecting your data and privacy while using our platform.",
      keywords: "Academic Pal privacy policy, data protection, user privacy",
    },
  };

  const currentSEO =
    seoData[pathname] || {
      title: "Academic Pal - Your Ultimate Engineering Study Platform",
      description:
        "Academic Pal provides comprehensive study materials including notes, question papers, and more for engineering students.",
      keywords:
        "Academic Pal, engineering notes, study materials, B.Tech resources, question papers",
    };

  return (
    <html lang="en">
      <Head>
        <title>{currentSEO.title}</title>
        <meta name="description" content={currentSEO.description} />
        <meta name="keywords" content={currentSEO.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/academicpal.jpg" />
  
        <link rel="manifest" href="/manifest.json" />
<meta name="theme-color" content="#000000" />

        {/* Open Graph */}
        <meta property="og:title" content={currentSEO.title} />
        <meta property="og:description" content={currentSEO.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://academicpal.in${pathname}`} />
        <meta property="og:image" content="/og-image.png" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={currentSEO.title} />
        <meta name="twitter:description" content={currentSEO.description} />
        <meta name="twitter:image" content="/og-image.png" />
      </Head>

      {/* ✅ Google Analytics Scripts */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-2HKC8Z98W1"
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-2HKC8Z98W1');
        `}
      </Script>

      <body className="min-h-screen bg-gray-900 text-white flex flex-col">
        {showHeader && <Header />}
        {showHomeHeader && <HomeHeader showUid={true} />}
        <main className="flex-grow">{children}</main>
        {pathname === "/home" && <BottomNav />}
        {!["/", "/signup", "/home"].includes(pathname) && <HomeFooter />}
        {(pathname === "/" || pathname === "/signup") && <Loginfooter />}
      </body>
    </html>
  );
}
