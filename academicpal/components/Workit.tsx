"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  CodeContainer,
  StaticStep,
} from "@/components/eldoraui/staticstepper";

const steps = [
  {
    title: "Register on AcademicPal",
    description: "Sign up at /register to access exclusive tools and features.",
    code: "https://academicpal.in/register",
  },
  {
    title: "Login to Your Dashboard",
    description: "Visit /login and access your personalized learning space.",
    code: "https://academicpal.in/login",
  },
  {
    title: "Explore Smart Dashboard",
    description: "Navigate to your dashboard to access powerful academic tools.",
    code: "Navigate to Dashboard > Tools",
  },
];

const features = [
  "Auto Timetable",
  "Flashcards",
  "Study Planner",
  "Analytics",
  "Reminders",
  "Blogs",
  "Groups",
];

export default function AccessSpecialFeatures() {
  return (
    <section className="bg-black text-white py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <h2 className="text-center text-3xl sm:text-4xl mb-12 font-bold tracking-tight drop-shadow-md font-poppins">
        Access Special Features & Advanced Tools
      </h2>

      {/* Static Steps Section */}
      <div className="w-full max-w-3xl mx-auto mb-16">
        {steps.map((step, index) => (
          <StaticStep key={step.title} step={index + 1} title={step.title}>
            <CodeContainer>{step.code}</CodeContainer>
          </StaticStep>
        ))}
      </div>

  
      {/* Feature Cards Section */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {features.map((feature, idx) => (
          <motion.div
            key={feature}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="flex flex-col items-center rounded-2xl border border-white/20 bg-black bg-opacity-50 p-5 sm:p-6 backdrop-blur-md shadow-lg shadow-blue-800/30 hover:shadow-blue-500/50 transition-shadow"
          >
            <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black border border-white/30 text-white text-lg font-bold mb-4 select-none">
              {idx + 1}
            </div>
            <CardTitle className="text-sm sm:text-base text-center font-montserrat">
              {feature}
            </CardTitle>
            <CardContent className="p-0 mt-2 text-center text-gray-300 text-xs sm:text-sm font-lato">
              Discover how{" "}
              <span className="text-blue-400 font-semibold">{feature}</span> helps you stay ahead in academics.
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
