"use client";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What is AcademicPal?",
    answer: "AcademicPal is a platform offering curated notes, PYQs, real-time chat, and AI-powered search to boost your academic journey.",
  },
  {
    question: "How do I sign up?",
    answer: "Click the Get Started button on the homepage and follow the simple registration process.",
  },
  {
    question: "Is AcademicPal free to use?",
    answer: "Yes! AcademicPal provides many free resources to students, with premium features available soon.",
  },
  {
    question: "How can I contribute notes?",
    answer: "Currently, contributions are by invite only. Contact us through the Learn More page for more information.",
  },
  {
    question: "Does AcademicPal have an AI search feature?",
    answer: "Yes! Our AI-powered search helps you find the most relevant notes quickly and easily.",
  },
];

export default function FAQ() {
  return (
    <section className="bg-black text-white py-20 px-6 max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-extrabold text-center mb-12 drop-shadow-md"
      >
        Frequently Asked Questions
      </motion.h2>

      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map(({ question, answer }, idx) => (
          <AccordionItem key={idx} value={`item-${idx}`} className="border border-gray-700 rounded-lg bg-neutral-900">
            <AccordionTrigger className="text-lg font-semibold px-6 py-4 hover:bg-blue-700 hover:text-white transition">
              {question}
            </AccordionTrigger>
            <AccordionContent className="px-6 py-4 text-gray-300">
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
