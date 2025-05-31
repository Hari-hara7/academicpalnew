// app/dashboard/page.tsx
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export default function DashboardHome() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  let email = 'Guest';
  try {
    if (token) {
      const decoded = verifyToken(token) as any;
      email = decoded.email;
    }
  } catch (err) {
    // token invalid, fallback to guest
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome Back 👋</h1>
      <p className="text-lg text-gray-700">Logged in as <strong>{email}</strong></p>
    </div>
  );
}
