// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import { hashPassword } from '@/lib/hash';

export async function POST(req: Request) {
  await connectDB();

  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'Email already registered' }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message || 'Server error' }, { status: 500 });
  }
}
