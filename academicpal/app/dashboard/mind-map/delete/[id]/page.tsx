'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MindMap } from '@/types/mindMap';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function DeleteMindMapPage() {
  const router = useRouter();
  const { id } = useParams();
  const [map, setMap] = useState<MindMap | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMindMap = async () => {
      const res = await fetch('/api/mind-map/get');
      const data = await res.json();
      if (data.success) {
        const found = data.mindMaps.find((m: MindMap) => m._id === id);
        setMap(found || null);
      }
      setLoading(false);
    };
    fetchMindMap();
  }, [id]);

  const handleDelete = async () => {
    const res = await fetch('/api/mind-map/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();
    if (data.success) {
      router.push('/dashboard/mind-map');
    } else {
      alert('Failed to delete mind map');
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!map) return <p className="p-6 text-red-600">Mind map not found.</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-red-500">⚠️ Confirm Deletion</h2>

      <Card className="mb-6">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold">{map.topic}</h3>
          <p className="text-sm text-gray-400">{map.subtopics.length} subtopics</p>
        </CardContent>
      </Card>

      <p className="mb-4 text-sm text-gray-300">
        Are you sure you want to delete this mind map? This action is irreversible.
      </p>

      <div className="flex gap-4">
        <Button variant="destructive" onClick={handleDelete}>
          🗑️ Yes, Delete
        </Button>
        <Button variant="outline" onClick={() => router.back()}>
          ❌ Cancel
        </Button>
      </div>
    </div>
  );
}
