"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ShineBorder } from "@/components/magicui/shine-border";

export default function FeedbackForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      alert("⚠️ Please fill all fields");
      return;
    }
    try {
      await axios.post("/api/feedback", { name, email, message });
      setName("");
      setEmail("");
      setMessage("");
      alert("✅ Thank you for your feedback!");
    } catch (error) {
      alert("❌ Failed to send feedback");
    }
  };

  return (
    <Card className="relative bg-black text-white border-white/20 max-w-md mx-auto">
      <ShineBorder shineColor={["#3b82f6", "#60a5fa", "#93c5fd"]} />
      <CardHeader>
        <CardTitle className="text-white">Send Feedback</CardTitle>
        <CardDescription className="text-gray-400">
          We appreciate your thoughts and suggestions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="name" className="text-white">Name</Label>
          <Input
            id="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-black text-white border-white/30 placeholder-gray-400"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="email" className="text-white">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-black text-white border-white/30 placeholder-gray-400"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="message" className="text-white">Message</Label>
          <Textarea
            id="message"
            placeholder="Your message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-black text-white border-white/30 placeholder-gray-400"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSubmit}>
          Send Feedback
        </Button>
      </CardFooter>
    </Card>
  );
}
