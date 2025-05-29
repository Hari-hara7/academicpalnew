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
    description:
      "Leverage all features to boost your understanding and ace your exams!",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-black text-white py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-center text-4xl font-extrabold mb-12 tracking-tight drop-shadow-md">
        How AcademicPal Works
      </h2>
      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, idx) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="flex flex-col items-center bg-neutral-900 rounded-2xl p-6 shadow-lg shadow-blue-800/30 hover:shadow-blue-600/60 transition-shadow"
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white text-xl font-bold drop-shadow-lg mb-4 select-none">
              {idx + 1}
            </div>
            <CardTitle className="text-lg text-center">{step.title}</CardTitle>
            <CardContent className="p-0 mt-2 text-center text-gray-300 text-sm">
              {step.description}
            </CardContent>
            <CheckCircle
              className="mt-5 w-7 h-7 text-blue-400 opacity-70"
              aria-hidden="true"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
