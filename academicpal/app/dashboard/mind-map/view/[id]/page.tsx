'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { MindMap } from '@/types/mindMap';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Brain } from 'lucide-react';

export default function ViewMindMapPage() {
  const { id } = useParams();
  const [map, setMap] = useState<MindMap | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMap() {
      const res = await fetch('/api/mind-map/get');
      const data = await res.json();
      if (data.success) {
        const mindMap = data.mindMaps.find((m: MindMap) => m._id === id);
        setMap(mindMap || null);
      }
      setLoading(false);
    }
    fetchMap();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <Skeleton className="h-8 w-1/2 bg-white/10" />
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-28 w-full rounded-xl bg-white/10" />
          ))}
        </div>
      </div>
    );

  if (!map)
    return (
      <div className="min-h-screen bg-black text-white p-6 flex justify-center items-center">
        <p className="text-red-500 text-lg">Mind map not found.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-semibold flex justify-center items-center gap-2 text-white mt-8">
            <Brain className="text-white/60 h-6 w-6" />
            {map.topic}
          </h2>
          <Badge className="bg-white/10 text-white border border-white/20 hover:bg-white/20">
            Total Subtopics: {map.subtopics.length}
          </Badge>
        </div>

        <div className="grid gap-6">
          {map.subtopics.map((sub, index) => (
            <Card
              key={index}
              className="bg-white/5 border border-white/20 backdrop-blur-md shadow-md rounded-xl"
            >
              <CardContent className="p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-white/90">
                    {sub.title}
                  </h3>
                  <Badge
                    variant="outline"
                    className="border-white/20 bg-white/10 text-white"
                  >
                    {sub.keywords.length} keywords
                  </Badge>
                </div>

                <ul className="grid gap-1 pl-4 list-disc text-white/70">
                  {sub.keywords.map((kw, i) => (
                    <li key={i}>{kw}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
