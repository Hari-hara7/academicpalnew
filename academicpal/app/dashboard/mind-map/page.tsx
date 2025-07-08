'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MindMap } from '@/types/mindMap';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Eye,
  Pencil,
  Trash2,
  PlusCircle,
  BrainCircuit,
} from 'lucide-react';

export default function MindMapDashboardPage() {
  const [mindMaps, setMindMaps] = useState<MindMap[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMaps = async () => {
      const res = await fetch('/api/mind-map/get');
      const data = await res.json();
      if (data.success) {
        setMindMaps(data.mindMaps);
      }
    };
    fetchMaps();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this mind map?')) return;

    const res = await fetch('/api/mind-map/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();
    if (data.success) {
      setMindMaps(mindMaps.filter((m) => m._id !== id));
    } else {
      alert('Delete failed');
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <BrainCircuit className="h-6 w-6" />
        <h2 className="text-3xl font-bold tracking-tight mt-8">Your Mind Maps</h2>
      </div>

      {mindMaps.length === 0 ? (
        <div className="text-center text-muted-foreground">
          <p>No mind maps found.</p>
          <Button
            className="mt-4"
            onClick={() => router.push('/dashboard/mind-map/create')}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Your First Mind Map
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mindMaps.map((map) => (
            <Card
              key={map._id}
              className="bg-black/70 backdrop-blur border border-white/20 shadow-md transition hover:scale-[1.01]"
            >
              <CardHeader>
                <CardTitle className="text-white text-lg flex justify-between items-center">
                  {map.topic}
                  <Badge variant="secondary" className="ml-2">
                    {map.subtopics.length} subtopics
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="default"
                    onClick={() => router.push(`/dashboard/mind-map/view/${map._id}`)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => router.push(`/dashboard/mind-map/edit/${map._id}`)}
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => router.push(`/dashboard/mind-map/delete/${map._id}`)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {mindMaps.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Button
            size="lg"
            onClick={() => router.push('/dashboard/mind-map/create')}
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Create New Mind Map
          </Button>
        </div>
      )}
    </div>
  );
}
