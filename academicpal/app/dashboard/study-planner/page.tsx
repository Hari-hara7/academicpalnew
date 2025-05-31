'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface Task {
  _id: string;
  title: string;
  description: string;
  subject: string;
  dueDate: string;
  priority: string;
  status: string;
}

export default function StudyPlannerPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch('/api/study-planner/get');
        const data = await res.json();
        if (data.success) {
          setTasks(data.tasks);
        }
      } catch (err) {
        console.error('Failed to load tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">📚 Study Planner</h1>
          <Button
            onClick={() => router.push('/dashboard/study-planner/create')}
            className="bg-white text-black hover:bg-gray-200 flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            New Task
          </Button>
        </div>

        {loading ? (
          <p className="text-white">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-white">No tasks found. Start by creating one.</p>
        ) : (
          tasks.map((task) => (
            <Card
              key={task._id}
              className="bg-transparent border border-white/20 backdrop-blur-md shadow-md"
            >
              <CardHeader>
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-white">{task.title}</h2>
                  <Badge className="bg-white/10 text-white border border-white/40">
                    {task.status}
                  </Badge>
                </div>
              </CardHeader>
              <Separator className="bg-white/40" />
              <CardContent className="space-y-3 pt-4 text-white/90">
                <p className="text-white/70">{task.description}</p>
                <div className="text-sm text-white/60 flex justify-between">
                  <span>📘 Subject: {task.subject}</span>
                  <span>📅 Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="text-sm text-white/60">🔥 Priority: {task.priority}</div>
                <div className="flex gap-3 pt-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="border border-white/40 hover:bg-white text-white flex items-center gap-2"
                    onClick={() => router.push(`/dashboard/study-planner/edit/${task._id}`)}
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="border border-red-500/30 hover:bg-red-500 text-red-400 flex items-center gap-2"
                    onClick={() => router.push(`/dashboard/study-planner/delete/${task._id}`)}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
