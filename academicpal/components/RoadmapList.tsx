"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { ShineBorder } from "@/components/magicui/shine-border";
import { ExternalLink } from "lucide-react";

type Roadmap = {
  id: string;
  title: string;
  description?: string;
  link: string;
};

export default function RoadmapList() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      const res = await axios.get("/api/roadmaps");
      setRoadmaps(res.data);
    };

    fetchRoadmaps();
  }, []);

  if (roadmaps.length === 0)
    return (
      <p className="text-gray-400 text-center mt-10 font-inter text-lg">
        No roadmaps available yet.
      </p>
    );

  return (
    <div className="grid grid-cols-1  lg:grid-cols-2 gap-6 max-w-6xl mx-auto px-2 font-inter">
      {roadmaps.map((r) => (
        <Card
          key={r.id}
          className="relative bg-black text-white border-white/20 hover:shadow-blue-500/40 transition-shadow duration-300"
          style={{ fontFeatureSettings: '"liga" 1' }}
        >
          <ShineBorder shineColor={["#3b82f6", "#60a5fa", "#93c5fd"]} />
          <CardHeader>
            <CardTitle className="text-white font-semibold text-xl tracking-wide drop-shadow-sm">
              {r.title}
            </CardTitle>
            {r.description && (
              <CardDescription className="text-gray-400 mt-1 leading-relaxed">
                {r.description}
              </CardDescription>
            )}
          </CardHeader>
          <CardFooter className="flex justify-end">
            <Button
              asChild
              variant="outline"
              className="flex items-center gap-2 bg-black text-white border-blue-400 hover:bg-black hover:text-white transition-colors duration-300"
           
            >
              <a
                href={r.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Open
                <ExternalLink className="w-5 h-5" />
              </a>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
