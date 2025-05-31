'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateStudyTaskPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: '',
    description: '',
    subject: '',
    dueDate: '',
    priority: 'Normal',
    status: 'Pending',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/study-planner/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        router.push('/dashboard/study-planner');
      } else {
        alert('Failed to create task.');
      }
    } catch (err) {
      console.error('Error creating task:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Create Study Task</h1>
          <Link href="/dashboard/study-planner">
            <Button
              variant="ghost"
              className="text-white hover:bg-white flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        </div>

        <Card className="bg-transparent border border-white/40 backdrop-blur-md shadow-md">
          <CardHeader>
            <h2 className="text-xl font-semibold text-white">📝 New Study Task</h2>
          </CardHeader>
          <Separator className="bg-white/40" />
          <CardContent className="p-6 space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-white">Title</Label>
                <Input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="bg-black text-white border-white/40 focus:ring-white/10 focus:border-white mt-4"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-white">Description</Label>
                <Textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="bg-black text-white border-white/40 focus:ring-white/10 focus:border-white mt-4"
                />
              </div>

              <div>
                <Label htmlFor="subject" className="text-white">Subject</Label>
                <Input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="bg-black text-white border-white/40 focus:ring-white/10 focus:border-white mt-4"
                />
              </div>

              <div>
                <Label htmlFor="dueDate" className="text-white">Due Date</Label>
                <Input
                  type="date"
                  name="dueDate"
                  value={form.dueDate}
                  onChange={handleChange}
                  required
                  className="bg-black text-white border-white/40 focus:ring-white/10 focus:border-white mt-4"
                />
              </div>

              <div>
                <Label htmlFor="priority" className="text-white">Priority</Label>
                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md bg-black text-white border-white/40 focus:ring-white/10 focus:border-white mt-4"
                >
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div>
                <Label htmlFor="status" className="text-white mt-8">Status</Label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md bg-black text-white border-white/40 focus:ring-white/10 focus:border-white mt-4"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black hover:bg-gray-200"
              >
                {loading ? 'Creating...' : 'Create Task'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
