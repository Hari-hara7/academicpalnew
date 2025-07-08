'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  PlusCircle,
  Minus,
  Save,
  Trash2,
  PencilLine,
  Sparkles,
} from 'lucide-react';
import { MindMap } from '@/types/mindMap';
import { toast } from 'sonner';

interface Subtopic {
  title: string;
  keywords: string[];
}

export default function EditMindMapPage() {
  const { id } = useParams();
  const router = useRouter();

  const [topic, setTopic] = useState('');
  const [subtopics, setSubtopics] = useState<Subtopic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMindMap = async () => {
      const res = await fetch('/api/mind-map/get');
      const data = await res.json();
      if (data.success) {
        const map: MindMap | undefined = data.mindMaps.find((m: MindMap) => m._id === id);
        if (map) {
          setTopic(map.topic);
          setSubtopics(map.subtopics);
        }
      }
      setLoading(false);
    };
    fetchMindMap();
  }, [id]);

  const handleSubtopicChange = (
    index: number,
    field: 'title' | 'keywords',
    value: string,
    keywordIndex?: number
  ) => {
    const updated = [...subtopics];
    if (field === 'title') {
      updated[index].title = value;
    } else if (field === 'keywords' && typeof keywordIndex === 'number') {
      updated[index].keywords[keywordIndex] = value;
    }
    setSubtopics(updated);
  };

  const addSubtopic = () => {
    setSubtopics([...subtopics, { title: '', keywords: [''] }]);
  };

  const removeSubtopic = (index: number) => {
    setSubtopics(subtopics.filter((_, i) => i !== index));
  };

  const addKeyword = (subtopicIndex: number) => {
    const updated = [...subtopics];
    updated[subtopicIndex].keywords.push('');
    setSubtopics(updated);
  };

  const removeKeyword = (subtopicIndex: number, keywordIndex: number) => {
    const updated = [...subtopics];
    updated[subtopicIndex].keywords.splice(keywordIndex, 1);
    setSubtopics(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/mind-map/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, topic, subtopics }),
    });

    const data = await res.json();
    if (data.success) {
      toast.success('✅ Mind map updated successfully!');
      router.push('/dashboard/mind-map');
    } else {
      toast.error('❌ Failed to update mind map.');
    }
  };

  if (loading) return <p className="p-6 mt-12">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <PencilLine className="h-6 w-6 " />
        <h2 className="text-3xl font-bold tracking-tight mt-6">Edit Mind Map</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6 bg-black/70 border border-white/20 backdrop-blur text-white">
          <Label className="text-base font-semibold">Main Topic</Label>
          <Input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
            placeholder="Enter main topic"
            className="mt-2 text-white"
          />
        </Card>

        {subtopics.map((sub, index) => (
          <Card
            key={index}
            className="p-6 space-y-4 bg-black/70 border border-white/20 backdrop-blur text-white"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                Subtopic #{index + 1}
              </h3>
              <Button
                variant="destructive"
                size="sm"
                type="button"
                onClick={() => removeSubtopic(index)}
              >
                <Trash2 className="h-4 w-4 mr-1 text-white" />
                Remove
              </Button>
            </div>

            <Input
              value={sub.title}
              onChange={(e) => handleSubtopicChange(index, 'title', e.target.value)}
              placeholder="Subtopic title"
              required
              className="text-white"
            />

            <div>
              <Label className="font-medium">Keywords</Label>
              <div className="space-y-2 mt-2">
                {sub.keywords.map((kw, kwIndex) => (
                  <div key={kwIndex} className="flex gap-2">
                    <Input
                      value={kw}
                      onChange={(e) =>
                        handleSubtopicChange(index, 'keywords', e.target.value, kwIndex)
                      }
                      placeholder="Keyword"
                      required
                      className="text-white"
                    />
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => removeKeyword(index, kwIndex)}
                    >
                      <Minus className="h-4 w-4 text-black" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                size="sm"
                onClick={() => addKeyword(index)}
                className="mt-3"
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                Add Keyword
              </Button>
            </div>
          </Card>
        ))}

        <div className="flex flex-wrap gap-4">
          <Button type="button" onClick={addSubtopic} variant="secondary">
            <Sparkles className="h-4 w-4 mr-1" />
            Add Subtopic
          </Button>

          <Button type="submit">
            <Save className="h-4 w-4 mr-1" />
            Update Mind Map
          </Button>
        </div>
      </form>
    </div>
  );
}
