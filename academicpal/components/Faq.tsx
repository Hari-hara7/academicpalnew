"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What is AcademicPal?",
    answer:
      "AcademicPal is a platform offering curated notes, PYQs, real-time chat, and AI-powered search to boost your academic journey.",
  },
  {
    question: "How do I sign up?",
    answer:
      "Click the Get Started button on the homepage and follow the simple registration process.",
  },
  {
    question: "Is AcademicPal free to use?",
    answer:
      "Yes! AcademicPal provides many free resources to students, with premium features available soon.",
  },
  {
    question: "Can anyone contribute notes?",
    answer:
      "Yes! We welcome note contributions from all students to help grow our community's resources.",
  },
  {
    question: "Is the platform secure?",
    answer:
      "Absolutely! We prioritize user data security and use best practices to keep your information safe.",
  },
  {
    question: "Can anyone contribute to website development?",
    answer:
      "Yes! We appreciate open source contributions to improve and expand AcademicPal.",
  },
  {
    question: "How can I contribute notes or code?",
    answer:
      "Reach out to us via the Learn More page or contact form, and we’ll guide you on how to contribute.",
  },
  {
    question: "Does AcademicPal have an AI search feature?",
    answer:
      "Yes! Our AI-powered search helps you find the most relevant notes quickly and easily.",
  },
];

export default function FAQ() {
  return (
    <section className="bg-black text-white py-16 px-4 sm:px-6 md:px-8 lg:px-10 max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-3xl sm:text-4xl font-extrabold text-center mb-10 md:mb-12 drop-shadow-md"
      >
        Frequently Asked Questions
      </motion.h2>

      <Accordion
        type="single"
        collapsible
        className="space-y-4 w-full"
      >
        {faqs.map(({ question, answer }, idx) => (
          <AccordionItem
            key={idx}
            value={`item-${idx}`}
            className="border border-gray-700 rounded-lg bg-neutral-900 overflow-hidden"
          >
            <AccordionTrigger className="text-base sm:text-lg font-semibold px-4 sm:px-6 py-3 sm:py-4 hover:bg-blue-700 hover:text-white transition">
              {question}
            </AccordionTrigger>
            <AccordionContent className="px-4 sm:px-6 py-3 sm:py-4 text-gray-300 text-sm sm:text-base">
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
