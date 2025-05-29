"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Loader2, User, Mail, HelpCircle, MessageSquare } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Support form state type
interface SupportFormState {
  name: string;
  email: string;
  issue: string;
  description: string;
}

// Support & Help Component
export default function SupportAndHelp() {
  const [form, setForm] = useState<SupportFormState>({
    name: "",
    email: "",
    issue: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitSupportRequest = async () => {
    const { name, email, issue, description } = form;
    if (!name || !email || !issue || !description) {
      alert("Please fill in all fields!");
      return;
    }
    setSubmitting(true);
    await addDoc(collection(db, "supportRequests"), {
      ...form,
      createdAt: serverTimestamp(),
    });
    setForm({
      name: "",
      email: "",
      issue: "",
      description: "",
    });
    setSubmitting(false);
  };

  // Reusable Input with Icon component
  const InputWithIcon = ({
    icon: Icon,
    ...rest
  }: {
    icon: React.ElementType;
    placeholder: string;
    name: string;
    value: string;
    onChange: (e: any) => void;
    type?: string;
  }) => (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
      <Input
        {...rest}
        className="pl-10 bg-black border-gray-700 text-white focus:border-white transition-colors"
      />
    </div>
  );

  return (
    <section className="bg-black text-white py-20 px-4 max-w-xl mx-auto">
      <motion.h2
        className="text-4xl font-bold text-center mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Support & Help
      </motion.h2>

      <motion.div
        className="space-y-4 bg-black border border-gray-800 p-6 rounded-xl shadow-md"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <InputWithIcon
          icon={User}
          placeholder="Your Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <InputWithIcon
          icon={Mail}
          placeholder="Email ID"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
        <InputWithIcon
          icon={HelpCircle}
          placeholder="Issue Title"
          name="issue"
          value={form.issue}
          onChange={handleChange}
        />
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 text-gray-500" size={18} />
          <Textarea
            placeholder="Describe your issue..."
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="pl-10 bg-black border-gray-700 text-white focus:border-white transition-colors"
          />
        </div>
        <Button
          onClick={submitSupportRequest}
          disabled={submitting}
          className="w-full bg-white text-black font-semibold hover:bg-gray-300 transition-colors"
        >
          {submitting && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
          {submitting ? "Submitting..." : "Submit Request"}
        </Button>
      </motion.div>
    </section>
  );
}
