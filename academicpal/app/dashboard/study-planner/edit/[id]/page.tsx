'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

export default function EditStudyTaskPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    id: '',
    title: '',
    description: '',
    subject: '',
    dueDate: '',
    priority: 'Normal',
    status: 'Pending',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch('/api/study-planner/get');
        const data = await res.json();
        if (data.success) {
          const task = data.tasks.find((t: any) => t._id === id);
          if (task) {
            setForm({
              id: task._id,
              title: task.title,
              description: task.description,
              subject: task.subject,
              dueDate: task.dueDate.slice(0, 10),
              priority: task.priority,
              status: task.status,
            });
          } else {
            alert('Task not found');
            router.push('/dashboard/study-planner');
          }
        }
      } catch (err) {
        console.error('Failed to load task:', err);
      }
    };

    fetchTask();
  }, [id, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/study-planner/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        router.push('/dashboard/study-planner');
      } else {
        alert('Update failed');
      }
    } catch (err) {
      console.error('Update error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-black min-h-screen text-white">
      <Card className="bg-transparent border border-white/40 backdrop-blur-md shadow-md">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-white">✏️ Edit Study Task</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-white">
                Title
              </Label>
              <Input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="bg-transparent border border-white/50 text-white placeholder-white mt-4"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-white">
                Description
              </Label>
              <Textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="bg-transparent border border-white/50 text-white placeholder-white mt-4"
              />
            </div>

            <div>
              <Label htmlFor="subject" className="text-white">
                Subject
              </Label>
              <Input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="bg-transparent border border-white/50 text-white placeholder-white mt-4"
              />
            </div>

            <div>
              <Label htmlFor="dueDate" className="text-white">
                Due Date
              </Label>
              <Input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                required
                className="bg-transparent border border-white/50 text-white placeholder-white mt-4"
              />
            </div>

            <div>
              <Label htmlFor="priority" className="text-white">
                Priority
              </Label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full bg-transparent border border-white/50 rounded-md p-2 text-white mt-4"
              >
                <option value="Low" className="bg-black text-white">
                  Low
                </option>
                <option value="Normal" className="bg-black text-white">
                  Normal
                </option>
                <option value="High" className="bg-black text-white">
                  High
                </option>
              </select>
            </div>

            <div>
              <Label htmlFor="status" className="text-white">
                Status
              </Label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full bg-transparent border border-white/50 rounded-md p-2 text-white mt-4"
              >
                <option value="Pending" className="bg-black text-white">
                  Pending
                </option>
                <option value="In Progress" className="bg-black text-white">
                  In Progress
                </option>
                <option value="Completed" className="bg-black text-white">
                  Completed
                </option>
              </select>
            </div>

            <Button type="submit" disabled={loading} className="bg-white text-black hover:bg-gray-200">
              {loading ? 'Updating...' : 'Update Task'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
