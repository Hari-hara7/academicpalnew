"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const steps = [
  {
    title: "Sign Up",
    description: "Create your free AcademicPal account to start your learning journey.",
  },
  {
    title: "Explore Notes",
    description: "Browse through curated, detailed notes tailored for your courses.",
  },
  {
    title: "Join Real-Time Chat",
    description: "Connect instantly with peers, ask questions, and collaborate live.",
  },
  {
    title: "Use AI-Powered Search",
    description: "Quickly find exactly what you need with smart, AI-driven note search.",
  },
  {
    title: "Achieve Better Grades",
    description: "Leverage all features to boost your understanding and ace your exams!",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-black text-white py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <h2 className="text-center text-3xl sm:text-4xl font-extrabold mb-10 tracking-tight drop-shadow-md">
        How AcademicPal Works
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {steps.map((step, idx) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="flex flex-col items-center bg-neutral-900 rounded-2xl p-4 sm:p-6 shadow-lg shadow-blue-800/30 hover:shadow-blue-600/60 transition-shadow"
          >
            <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white text-lg sm:text-xl font-bold drop-shadow-lg mb-3 sm:mb-4 select-none">
              {idx + 1}
            </div>
            <CardTitle className="text-sm sm:text-base text-center">{step.title}</CardTitle>
            <CardContent className="p-0 mt-1 sm:mt-2 text-center text-gray-300 text-xs sm:text-sm">
              {step.description}
            </CardContent>
            <CheckCircle
              className="mt-4 w-5 h-5 sm:w-6 sm:h-6 text-blue-400 opacity-70"
              aria-hidden="true"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
