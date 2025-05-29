"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

export default function NewHero() {
  return (
    <section
      className={`${poppins.className} relative min-h-screen bg-black text-white flex flex-col md:flex-row items-center justify-center px-6 sm:px-12 lg:px-24 overflow-hidden`}
    >
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="z-20 max-w-xl md:max-w-lg lg:max-w-xl text-center md:text-left"
      >
        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          <span>Unlock Your </span>
          <span className="bg-gradient-to-r from-blue-400 via-blue-600 to-blue-500 bg-clip-text text-transparent">
            Academic Potential
          </span>
        </h1>

        <p className="mt-6 text-gray-300 text-lg sm:text-xl font-light leading-relaxed max-w-md">
          AcademicPal is a next-gen platform with <span className="text-white font-semibold">curated notes</span>, <span className="text-white font-semibold">real-time chat</span>, and <span className="text-white font-semibold">AI-powered search</span> — trusted by over <span className="text-blue-400 font-bold">4,000+ students</span> at NMAMIT.
        </p>

        {/* Glassmorphism info box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="mt-8 bg-white/10 backdrop-blur-md rounded-lg p-5 shadow-lg max-w-md border border-white/20"
        >
          <p className="text-sm text-gray-200 font-medium">
            Join a thriving community of learners and take control of your academic success.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-10 flex flex-wrap gap-6 justify-center md:justify-start"
        >
          <Button className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold px-8 py-3 rounded-lg shadow-lg flex items-center gap-2">
            Get Started <ArrowRight className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all font-semibold px-8 py-3 rounded-lg shadow-lg flex items-center gap-2"
          >
            Learn More
          </Button>
        </motion.div>
      </motion.div>

      {/* Right Image with floating shapes */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative mt-12 md:mt-0 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl"
      >
        {/* Glassy floating card */}
        <div className="absolute -top-8 -left-12 w-20 h-20 bg-blue-900/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-blue-400/25 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

        {/* Main logo card with glassmorphism */}
        <div className="relative bg-dark-400  border border-white/20 rounded-3xl shadow-lg overflow-hidden">
          <Image
            src="/academicpal.jpg"
            alt="AcademicPal Logo"
            width={400}
            height={400}
            priority
            className="object-contain rounded-3xl p-8"
          />
          {/* Floating sparkle */}
          <div className="absolute top-5 right-5 w-8 h-8 bg-white rounded-full opacity-30 animate-pulse" />
        </div>
      </motion.div>

      {/* Background Gradient Blur */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-blue-500/70 to-blue-300/20 blur-3xl mix-blend-screen -z-10" />
    </section>
  );
}
