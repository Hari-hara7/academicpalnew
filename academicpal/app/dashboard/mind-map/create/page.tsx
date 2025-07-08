'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { FaPlus, FaTrash, FaSave, FaLightbulb } from 'react-icons/fa';

interface Subtopic {
  title: string;
  keywords: string[];
}

export default function CreateMindMapPage() {
  const router = useRouter();
  const [topic, setTopic] = useState('');
  const [subtopics, setSubtopics] = useState<Subtopic[]>([
    { title: '', keywords: [''] },
  ]);

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

    const res = await fetch('/api/mind-map/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, subtopics }),
    });

    const data = await res.json();
    if (data.success) {
      router.push('/dashboard/mind-map');
    } else {
      alert('Failed to create mind map');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 flex items-center gap-3 mt-4">
          <FaLightbulb className="text-yellow-400 animate-pulse " />
          Create Mind Map
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="space-y-2">
            <Label className="text-white">Main Topic</Label>
            <Input
              className="bg-transparent border border-white/20 text-white placeholder:text-white/40 focus:ring-white"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Web Development"
              required
            />
          </div>

          {subtopics.map((subtopic, index) => (
            <Card
              key={index}
              className="bg-white/5 border border-white/20 shadow-md rounded-xl backdrop-blur-sm"
            >
              <CardContent className="space-y-4 p-5">
                <div className="flex justify-between items-center">
                  <Label className="text-white text-lg">
                    🧩 Subtopic #{index + 1}
                  </Label>
                  <Button
                    variant="destructive"
                    type="button"
                    size="sm"
                    onClick={() => removeSubtopic(index)}
                  >
                    <FaTrash className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </div>

                <Input
                  className="bg-transparent border border-white/20 text-white placeholder:text-white/40"
                  value={subtopic.title}
                  onChange={(e) =>
                    handleSubtopicChange(index, 'title', e.target.value)
                  }
                  placeholder="e.g., Introduction"
                  required
                />

                <div className="space-y-2">
                  <Label className="text-white">Keywords</Label>
                  {subtopic.keywords.map((kw, kwIndex) => (
                    <div key={kwIndex} className="flex gap-2">
                      <Input
                        className="bg-transparent border border-white/20 text-white placeholder:text-white/40"
                        value={kw}
                        onChange={(e) =>
                          handleSubtopicChange(
                            index,
                            'keywords',
                            e.target.value,
                            kwIndex
                          )
                        }
                        placeholder="e.g., basics"
                        required
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeKeyword(index, kwIndex)}
                      >
                        -
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() => addKeyword(index)}
                    variant="secondary"
                    size="sm"
                    className="mt-2"
                  >
                    <FaPlus className="mr-2 h-3 w-3" />
                    Add Keyword
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button
            type="button"
            onClick={addSubtopic}
            variant="outline"
            className="w-fit text-black border-white/30"
          >
            <FaPlus className="mr-2" /> Add Subtopic
          </Button>

          <Button type="submit" className="bg-white text-black hover:bg-white-700">
            <FaSave className="mr-2" /> Save Mind Map
          </Button>
        </form>
      </div>
    </div>
  );
}
