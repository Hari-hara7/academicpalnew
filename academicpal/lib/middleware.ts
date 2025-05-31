// lib/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './auth';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    verifyToken(token); // Throws if invalid
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// Only apply to /dashboard routes
export const config = {
  matcher: ['/dashboard/:path*'],
};
