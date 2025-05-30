"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Loader2, User, Mail, HelpCircle, MessageSquare, LifeBuoy, Zap, Smile } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface SupportFormState {
  name: string;
  email: string;
  issue: string;
  description: string;
}

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
    <section className="bg-black text-white py-20 px-4 max-w-5xl mx-auto">
      <motion.h2
        className="text-4xl font-bold text-center mb-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Support & Help
      </motion.h2>

      <motion.p
        className="text-center text-gray-400 mb-10 max-w-md mx-auto flex items-center justify-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <LifeBuoy size={18} className="text-yellow-400" /> 
        Need assistance? We’re here to help! Submit your support request below.
      </motion.p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Support Form */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-black border border-gray-800 shadow-md rounded-xl">
            <CardContent className="p-6 space-y-4">
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
            </CardContent>
          </Card>
        </motion.div>

       {/* Crazy Side Display */}
<motion.div
  className=" bg-black border border-gray-800 flex flex-col gap-4 justify-center items-center text-center"
  initial={{ opacity: 0, x: 30 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  <motion.div
    animate={{ rotate: [0, 360] }}
    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    className="p-4 rounded-full border border-white"
  >
    <Zap className="text-white" size={40} />
  </motion.div>
  <p className="text-lg font-semibold text-white">Lightning-Fast Support</p>
  <p className="text-gray-400 max-w-sm">
    Our team is always on standby to zap away your issues ⚡️. Expect a quick response!
  </p>

  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    className="mt-6"
  >
    <Smile className="text-white" size={40} />
    <p className="mt-2 text-white font-bold">Stay Positive & Let’s Fix It! 🎉</p>
  </motion.div>
</motion.div>

      </div>
    </section>
  );
}
