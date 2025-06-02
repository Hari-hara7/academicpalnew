"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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
      className={`${poppins.className} relative min-h-screen bg-black text-white flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 md:px-12 lg:px-24 py-12 overflow-hidden overflow-x-hidden`}
    >
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="z-20 w-full max-w-2xl text-center lg:text-left"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          Unlock Your{" "}
          <span className="bg-gradient-to-r from-blue-400 via-blue-600 to-blue-500 bg-clip-text text-transparent">
            Academic Potential
          </span>
        </h1>

        <p className="mt-4 sm:mt-6 text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
          AcademicPal is a next-gen platform with{" "}
          <span className="text-white font-semibold">curated notes</span>,{" "}
          <span className="text-white font-semibold">real-time chat</span>, and{" "}
          <span className="text-white font-semibold">AI-powered search</span> — trusted by over{" "}
          <span className="text-blue-400 font-bold">4,000+ students</span> at NMAMIT.
        </p>

        {/* Glass Info Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="mt-6 sm:mt-8 bg-black rounded-xl p-3 sm:p-4 shadow-lg max-w-md mx-auto lg:mx-0 border border-white/20"
        >
          <p className="text-xs sm:text-sm text-gray-200">
            Join a thriving community of learners and take control of your academic success.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
        >
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-colors w-full sm:w-auto">
            <Link href="/upload" className="flex items-center gap-2 w-full justify-center">
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>

          <Button
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-2 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all w-full sm:w-auto"
          >
            <Link href="/learn-more" className="flex items-center gap-2 w-full justify-center">
              Learn More
            </Link>
          </Button>
        </motion.div>
      </motion.div>

      {/* Right Image */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="relative mt-10 lg:mt-0 w-full max-w-xs sm:max-w-sm md:max-w-md"
      >
        {/* Floating Blobs */}
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-500/60 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-500/65 rounded-full blur-3xl animate-blob animation-delay-4000" />

        {/* Image Card */}
        <div className="relative bg-black border border-white/10 rounded-3xl shadow-lg overflow-hidden">
          <Image
            src="/academicpal.jpg"
            alt="AcademicPal platform preview"
            width={500}
            height={500}
            priority
            className="object-contain rounded-3xl p-6 sm:p-8"
          />
          <div className="absolute top-5 right-5 w-6 h-6 bg-white rounded-full opacity-30 animate-pulse" />
        </div>
      </motion.div>

      {/* Background Blur Circle */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[500px] md:w-[600px] h-[400px] sm:h-[500px] md:h-[600px] rounded-full bg-gradient-to-tr from-blue-500/60 to-blue-300/30 blur-3xl mix-blend-screen -z-10" />
    </section>
  );
}
