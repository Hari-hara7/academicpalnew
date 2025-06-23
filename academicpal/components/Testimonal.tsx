"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import { BorderBeam } from "@/components/magicui/border-beam";

const testimonials = [
  {
    quote: "I love Academic Pal! It has made studying so much easier for me.",
    name: "Adithya",
    rating: 5,
  },
  {
    quote: "The notes provided here are excellent. They helped me ace my exams!",
    name: "Prajwal",
    rating: 5,
  },
  {
    quote: "Academic Pal has been a lifesaver for my studies. Highly recommended!",
    name: "Nagendra",
    rating: 5,
  },
  {
    quote:
      "There are no bugs as of now. This website is a godsend and it saved me for so many subjects. Thank you so much for this!!!",
    name: "Pranjali P.A",
    rating: 5,
  },
  {
    quote: "The website is actually good. It's like a last moment savior. Nothing.",
    name: "Anup C",
    rating: 4,
  },
  {
    quote: "Recommended for its informative and useful resources during exam times.",
    name: "Maneesh",
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex space-x-1 text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 sm:w-5 sm:h-5 ${i < count ? "fill-current" : "text-gray-600"}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-black text-white py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-3xl sm:text-4xl font-extrabold mb-12 sm:mb-16 tracking-tight drop-shadow-lg font-bold font-poppins"
      >
        What Our Users Say
      </motion.h2>

      <div className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center">
        {testimonials.map(({ name, quote, rating }, idx) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: idx * 0.15 }}
            whileHover={{ scale: 1.04 }}
            className="flex justify-center"
          >
            <Card className="relative w-full max-w-xs sm:max-w-sm overflow-hidden bg-neutral-900 shadow-lg rounded-2xl cursor-pointer border border-transparent hover:border-blue-500 transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-sm sm:text-base">{name}</CardTitle>
                <StarRating count={rating} />
              </CardHeader>
              <CardContent className="text-gray-300 italic text-xs sm:text-sm leading-relaxed">
                “{quote}”
              </CardContent>
              <BorderBeam duration={8} size={120} />
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
