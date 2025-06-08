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

const ADMIN_PIN = "2277";

export default function RoadmapForm() {
  const [pin, setPin] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = async () => {
    if (!title || !link) return;

    await axios.post("/api/roadmaps", { title, description, link });
    setTitle("");
    setDescription("");
    setLink("");
    alert("✅ Roadmap uploaded successfully!");
  };

  if (!accessGranted) {
    return (
      <Card className="relative bg-black text-white border-white/20 max-w-sm mx-auto">
        <ShineBorder shineColor={["#3b82f6", "#60a5fa", "#93c5fd"]} />
        <CardHeader>
          <CardTitle className="text-white">Admin Access</CardTitle>
          <CardDescription className="text-gray-400">
            Enter your admin PIN to upload a roadmap.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Label htmlFor="pin" className="text-white">Admin PIN</Label>
          <Input
            id="pin"
            type="password"
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="bg-black text-white border-white/30 placeholder-gray-400"
          />
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => {
              if (pin === ADMIN_PIN) setAccessGranted(true);
              else alert("❌ Wrong PIN");
            }}
          >
            Enter
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="relative bg-black text-white border-white/20 max-w-sm mx-auto">
      <ShineBorder shineColor={["#3b82f6", "#60a5fa", "#93c5fd"]} />
      <CardHeader>
        <CardTitle className="text-white">Upload Roadmap</CardTitle>
        <CardDescription className="text-gray-400">
          Add the title, optional description, and drive link.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-white">Title</Label>
          <Input
            id="title"
            placeholder="Frontend Roadmap"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-black text-white border-white/30 placeholder-gray-400"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="desc" className="text-white">Description</Label>
          <Textarea
            id="desc"
            placeholder="Short description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-black text-white border-white/30 placeholder-gray-400"
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="link" className="text-white">Drive Link</Label>
          <Input
            id="link"
            placeholder="https://drive.google.com/..."
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="bg-black text-white border-white/30 placeholder-gray-400"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSubmit}>
          Upload
        </Button>
      </CardFooter>
    </Card>
  );
}
