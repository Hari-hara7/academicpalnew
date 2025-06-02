"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

export default function AboutSection() {
  return (
    <section
      id="about"
      className={`${poppins.className} relative bg-black py-16 sm:py-20 md:py-24 px-4 sm:px-8 md:px-16 lg:px-32 text-white overflow-hidden`}
    >
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        <Badge className="mb-4 bg-gradient-to-r from-white to-blue-400 text-black shadow-xl text-sm sm:text-base px-4 py-1 rounded-full">
          🚀 Empowering Students
        </Badge>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6 bg-gradient-to-r from-white via-blue-400 to-white bg-clip-text text-transparent drop-shadow-xl">
          About AcademicPal
        </h2>

        <p className="text-base sm:text-lg md:text-xl font-light text-gray-300 leading-relaxed max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-white font-semibold">AcademicPal</span> is a powerful academic companion used by{" "}
          <span className="text-blue-300 font-bold">4,000+ students</span> at{" "}
          <span className="text-blue-500 font-medium">NMAMIT</span>. It provides{" "}
          <span className="text-white font-semibold">curated notes</span>,{" "}
          <span className="text-white font-semibold">solved PYQs</span>,{" "}
          <span className="text-white font-semibold">AI-powered search</span>, and{" "}
          <span className="text-white font-semibold">real-time chat</span> — all in one place.
        </p>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 sm:mt-10">
          {[
            {
              title: "4K+ Active Users",
              description: "Trusted by thousands of NMAMIT students every semester.",
            },
            {
              title: "AI-powered Search",
              description: "Find relevant notes and questions in seconds.",
            },
            {
              title: "Real-Time Community",
              description: "Chat, share, and collaborate with your peers live.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-lg backdrop-blur-lg transition-all hover:shadow-blue-500/40">
                <CardContent className="p-4 sm:p-6 text-left">
                  <h3 className="text-white font-semibold text-lg sm:text-xl mb-1 sm:mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
