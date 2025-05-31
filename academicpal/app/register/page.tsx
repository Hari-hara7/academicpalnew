'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push('/login');
    } else {
      const { message } = await res.json();
      setError(message);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4">
      <Card className="w-full max-w-md border border-white/10 bg-black/50 backdrop-blur-md text-white shadow-lg">
        <CardHeader className="flex flex-col items-center gap-2">
          {/* Add your logo image here */}
          <Image
            src="/academicpal.jpg" // Replace with your logo path
            alt="Logo"
            width={80}
            height={80}
            className="mb-2"
          />
          <h2 className="text-3xl font-semibold">Create an Account</h2>
          <p className="text-sm text-white/60">Join us today</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-transparent border border-white/20 text-white placeholder-white/40 focus-visible:ring-white"
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-transparent border border-white/20 text-white placeholder-white/40 focus-visible:ring-white"
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="bg-transparent border border-white/20 text-white placeholder-white/40 focus-visible:ring-white"
              required
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-white/80 transition-colors"
            >
              Register
            </Button>
          </form>
        </CardContent>
     <CardFooter className="text-center text-sm text-white/50">
          Don&apos;t have an account?{' '}
          <Link
            href="/login"
            className="ml-1 underline text-white hover:text-yellow-400 transition"
          >
            Login here
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
