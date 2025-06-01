import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import StudySession from '@/models/StudySession';
import { verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  await connectDB();
  const token = req.cookies.get('token')?.value;

  try {
    const decoded = verifyToken(token!);
    const body = await req.json();

    const newSession = await StudySession.create({
      userId: (decoded as any).id,
      subject: body.subject,
      hours: body.hours,
      date: new Date(body.date),
      performance: body.performance,
    });

    return NextResponse.json({ success: true, session: newSession });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Unauthorized or error occurred' }, { status: 401 });
  }
}
