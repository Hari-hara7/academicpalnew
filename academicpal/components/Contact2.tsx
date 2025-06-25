"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Globe,
  Send,
  Loader2,
} from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitContactForm = async () => {
    const { name, email, message } = form;
    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setSubmitting(true);
      await addDoc(collection(db, "contactMessages"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      setForm({ name: "", email: "", message: "" });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000); // hide after 3 sec
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative z-10 bg-black text-white py-20 px-4 md:px-10">
      {/* Background blur circles */}
      <div className="absolute top-10 left-[-5%] w-[200px] h-[200px] bg-purple-600 opacity-20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-[-5%] w-[200px] h-[200px] bg-cyan-500 opacity-20 rounded-full blur-3xl" />

      {/* Success popup */}
      {showSuccess && <SuccessPopup />}

      {/* Title */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-14 tracking-tight font-bold font-poppins"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Let's Get In Touch
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Contact Info Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-black border border-white/20 rounded-3xl p-8 backdrop-blur-md shadow-lg space-y-6"
        >
          <h3 className="text-2xl font-semibold mb-4">Reach Me</h3>
          <ContactItem icon={<Mail size={18} />} text="Hariharanath247@gmail.com" />
          <ContactItem icon={<Phone size={18} />} text="+91 7989777877" />
          <ContactLink icon={<Github size={18} />} text="github.com/Hari-hara7" href="https://github.com/Hari-hara7" />
          <ContactLink icon={<Linkedin size={18} />} text="linkedin.com/in/hari-hara-nath" href="https://linkedin.com/in/hari-hara-nath-a13583282" />
          <ContactLink icon={<Globe size={18} />} text="hariharanath.is-cod.in" href="https://hariharanath.is-cod.in/" />
        </motion.div>

        {/* Contact Form Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-black border border-white/20 rounded-3xl p-8 backdrop-blur-md shadow-lg space-y-6"
        >
          <Input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="bg-transparent border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white w-full rounded-md px-4 py-2"
          />
          <Input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="bg-transparent border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white w-full rounded-md px-4 py-2"
          />
          <Textarea
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="bg-transparent border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white w-full rounded-md px-4 py-2"
          />

          <Button
            onClick={submitContactForm}
            disabled={submitting}
            className="w-full bg-white text-black font-bold py-2 hover:bg-neutral-200 transition-colors rounded-lg flex items-center justify-center"
          >
            {submitting ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <Send size={16} className="mr-2" />}
            {submitting ? "Sending..." : "Send Message"}
          </Button>
        </motion.div>
      </div>

      {/* Inline animation keyframes */}
      <style jsx global>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-in {
          animation: slideIn 0.4s ease-out forwards;
        }
      `}</style>
    </section>
  );
}

// Success popup component
function SuccessPopup() {
  return (
    <div className="fixed top-6 right-6 bg-white text-black px-6 py-4 rounded-xl shadow-xl z-50 animate-slide-in mt-19">
      <div className="font-semibold">Thank you!</div>
      <div className="text-sm">We will contact you shortly.</div>
    </div>
  );
}

// Contact detail text
function ContactItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors duration-300">
      {icon}
      <span>{text}</span>
    </div>
  );
}

// Contact link
function ContactLink({ icon, text, href }: { icon: React.ReactNode; text: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors duration-300"
    >
      {icon}
      <span className="underline underline-offset-4">{text}</span>
    </a>
  );
}
