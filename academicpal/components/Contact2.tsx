"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Github, Linkedin, Globe, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitContactForm = async () => {
    const { name, email, message } = form;
    if (!name || !email || !message) {
      alert("Please fill in all fields!");
      return;
    }
    setSubmitting(true);
    await addDoc(collection(db, "contactMessages"), {
      ...form,
      createdAt: serverTimestamp(),
    });
    setForm({
      name: "",
      email: "",
      message: "",
    });
    setSubmitting(false);
  };

  return (
    <section className="bg-black text-white py-24 px-6 max-w-5xl mx-auto">
      <motion.h2
        className="text-4xl font-extrabold text-center mb-16 tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Contact
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Developer Details */}
        <motion.div
          className="space-y-6 space-y-4 bg-black-900 border border-neutral-800 p-8 rounded-2xl shadow-md"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ContactDetail icon={<Mail size={18} />} label="Hariharanath247@gmail.com" />
          <ContactDetail icon={<Phone size={18} />} label="+91 7989777877" />
          <ContactLink icon={<Github size={18} />} href="https://github.com/Hari-hara7" label="github.com/developer" />
          <ContactLink icon={<Linkedin size={18} />} href="https://www.linkedin.com/in/hari-hara-nath-a13583282/" label="linkedin.com/in/developer" />
          <ContactLink icon={<Globe size={18} />} href="https://hariharanath.is-cod.in/" label="developerportfolio.com" />
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="space-y-4 bg-black-900 border border-neutral-800 p-8 rounded-2xl shadow-md"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Input
            placeholder="Your Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="bg-black border-neutral-700 text-white focus:border-white transition-colors rounded-lg"
          />
          <Input
            placeholder="Your Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="bg-black border-neutral-700 text-white focus:border-white transition-colors rounded-lg"
          />
          <Textarea
            placeholder="Your Message..."
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            className="bg-black border-neutral-700 text-white focus:border-white transition-colors rounded-lg"
          />
          <Button
            onClick={submitContactForm}
            disabled={submitting}
            className="w-full bg-white text-black font-semibold hover:bg-neutral-200 transition-colors flex items-center justify-center rounded-lg"
          >
            {submitting ? (
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
            ) : (
              <Send size={16} className="mr-2" />
            )}
            {submitting ? "Sending..." : "Send Message"}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function ContactDetail({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
      {icon}
      <p>{label}</p>
    </div>
  );
}

function ContactLink({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
    >
      {icon}
      <span className="underline underline-offset-4">{label}</span>
    </a>
  );
}
