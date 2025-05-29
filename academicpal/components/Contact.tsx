"use client";

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Loader2, User, Mail, BookOpen, Calendar, UserCircle, Pencil } from "lucide-react";

// Feedback type
interface Feedback {
  id: string;
  name: string;
  usn: string;
  email: string;
  branch: string;
  year: string;
  message: string;
  createdAt: any;
}

// Feedback Form Component
function FeedbackForm({
  onSubmit,
  form,
  setForm,
  submitting,
}: {
  onSubmit: () => void;
  form: FeedbackFormState;
  setForm: (value: FeedbackFormState) => void;
  submitting: boolean;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

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
        icon={UserCircle}
        placeholder="USN"
        name="usn"
        value={form.usn}
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
        icon={BookOpen}
        placeholder="Branch"
        name="branch"
        value={form.branch}
        onChange={handleChange}
      />
      <InputWithIcon
        icon={Calendar}
        placeholder="Year"
        name="year"
        value={form.year}
        onChange={handleChange}
      />
      <div className="relative">
        <Pencil className="absolute left-3 top-3 text-gray-500" size={18} />
        <Textarea
          placeholder="Your feedback..."
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          className="pl-10 bg-black border-gray-700 text-white focus:border-white transition-colors"
        />
      </div>
      <Button
        onClick={onSubmit}
        disabled={submitting}
        className="w-full bg-white text-black font-semibold hover:bg-gray-300 transition-colors"
      >
        {submitting && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
        {submitting ? "Submitting..." : "Submit Feedback"}
      </Button>
    </motion.div>
  );
}

// Feedback List Component
function FeedbackList({ feedbacks }: { feedbacks: Feedback[] }) {
  return (
    <motion.div
      className="space-y-4 max-h-[400px] overflow-y-auto pr-2"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {feedbacks.length === 0 ? (
        <p className="text-gray-400 text-center">No feedback yet.</p>
      ) : (
        feedbacks.map((fb) => (
          <Card
            key={fb.id}
            className="bg-neutral-950 border border-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between text-sm text-gray-400 font-semibold">
              <div className="flex gap-2 items-center">
                <User size={14} />
                {fb.name} ({fb.usn})
              </div>
              <div className="flex gap-2 items-center">
                <BookOpen size={14} />
                {fb.branch} - Year {fb.year}
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <Mail size={12} />
              {fb.email}
            </p>
            <p className="text-white mt-2">{fb.message}</p>
          </Card>
        ))
      )}
    </motion.div>
  );
}

// Feedback Form State Type
interface FeedbackFormState {
  name: string;
  usn: string;
  email: string;
  branch: string;
  year: string;
  message: string;
}

// Main Feedback Section Component
export default function FeedbackSection() {
  const [form, setForm] = useState<FeedbackFormState>({
    name: "",
    usn: "",
    email: "",
    branch: "",
    year: "",
    message: "",
  });
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const submitFeedback = async () => {
    const { name, usn, email, branch, year, message } = form;
    if (!name || !usn || !email || !branch || !year || !message) {
      alert("Please fill in all fields!");
      return;
    }
    setSubmitting(true);
    await addDoc(collection(db, "feedbacks"), {
      ...form,
      createdAt: serverTimestamp(),
    });
    setForm({
      name: "",
      usn: "",
      email: "",
      branch: "",
      year: "",
      message: "",
    });
    setSubmitting(false);
  };

  useEffect(() => {
    const q = query(
      collection(db, "feedbacks"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const feedbackArray: Feedback[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Feedback, "id">),
      }));
      setFeedbacks(feedbackArray);
    });
    return () => unsubscribe();
  }, []);

  return (
    <section className="bg-black text-white py-20 px-4 max-w-5xl mx-auto">
      <motion.h2
        className="text-4xl font-bold text-center mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Student Feedback
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8">
        <FeedbackForm
          onSubmit={submitFeedback}
          form={form}
          setForm={setForm}
          submitting={submitting}
        />
        <FeedbackList feedbacks={feedbacks} />
      </div>
    </section>
  );
}
