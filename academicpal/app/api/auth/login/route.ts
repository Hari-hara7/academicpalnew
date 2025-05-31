// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import { comparePassword } from '@/lib/hash';
import { signToken } from '@/lib/auth';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  await connectDB();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const token = signToken(user);
  const res = NextResponse.json({ success: true });
  res.cookies.set('token', token, { httpOnly: true });
  return res;
}
