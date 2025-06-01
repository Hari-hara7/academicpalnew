import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import StudySession from '@/models/StudySession';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  await connectDB();
  const token = req.cookies.get('token')?.value;

  try {
    const decoded = verifyToken(token!);

    const sessions = await StudySession.find({ userId: (decoded as any).id }).sort({ date: 1 });

    return NextResponse.json({ success: true, sessions });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Unauthorized or error occurred' }, { status: 401 });
  }
}
