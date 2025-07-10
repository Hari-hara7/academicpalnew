// No 'use client' here

import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import DashboardClient from './DashboardClient';

export default function DashboardHomePage() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  let email = 'Guest';
  try {
    if (token) {
      const decoded = verifyToken(token) as any;
      email = decoded.email;
    }
  } catch {
    // fallback to guest
  }

  return <DashboardClient email={email} />;
}
