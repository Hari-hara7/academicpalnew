'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import Link from 'next/link';
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log('Google User:', result.user);
      router.push('/home');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log('GitHub User:', result.user);
      router.push('/home');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const isValidEmail = (email: string) => /^[a-zA-Z0-9._%+-]+@nmamit\.in$/.test(email);

  const handleForgotPassword = async () => {
    if (!isValidEmail(email)) {
      setError('Please enter a valid NMAMIT email.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent. Check your inbox.');
    } catch {
      setError('Failed to send password reset email.');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError('Please enter a valid NMAMIT email.');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/home');
    } catch (err: any) {
      if (err.message.includes('wrong-password') || err.message.includes('user-not-found')) {
        setError('Incorrect credentials. Please sign up if you don\'t have an account.');
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <Card className="w-full max-w-md bg-dark-900 text-white">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center font-montserrat">Sign in to Academic Pal</h1>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Button
              variant="outline"
              className="w-full bg-white text-black hover:bg-gray-200 font-semibold font-poppins"
              onClick={handleGoogleSignIn}
            >
              <FcGoogle className="mr-2" />
              Sign in with Google
            </Button>
            <Button
              variant="outline"
              className="w-full bg-white text-black hover:bg-gray-200 font-semibold font-poppins"
              onClick={handleGithubSignIn}
            >
              <FaGithub className="mr-2" />
              Sign in with GitHub
            </Button>
          </div>
          <div className="my-6 flex items-center">
            <Separator className="flex-1 bg-gray-600" />
            <span className="mx-4 text-gray-400">OR</span>
            <Separator className="flex-1 bg-gray-600" />
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your NMAMIT email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-zinc-800 text-white border border-zinc-700 mt-4"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-zinc-800 text-white border border-zinc-700 mt-4"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-500 text-sm">{message}</p>}
            <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200 font-semibold font-poppins">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <button
            onClick={handleForgotPassword}
            className="text-sm text-blue-400 hover:underline"
          >
            Forgot Password?
          </button>
          <p className="text-sm ">
            Don’t have an account?{' '}
            <Link href="/signup" className="text-blue-500 hover:underline ">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
