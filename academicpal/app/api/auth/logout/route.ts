// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_URL || 'https://academicpal.in'));
  res.cookies.set('token', '', { httpOnly: true, maxAge: 0 });
  return res;
}
