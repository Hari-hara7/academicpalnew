// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'));
  res.cookies.set('token', '', { httpOnly: true, maxAge: 0 });
  return res;
}
