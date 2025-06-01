import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import StudySession from '@/models/StudySession';
import { verifyToken } from '@/lib/auth';

export async function PUT(req: NextRequest) {
  await connectDB();
  const token = req.cookies.get('token')?.value;

  try {
    const decoded = verifyToken(token!);
    const body = await req.json();

    const updated = await StudySession.findOneAndUpdate(
      { _id: body.id, userId: (decoded as any).id },
      {
        subject: body.subject,
        hours: body.hours,
        date: new Date(body.date),
        performance: body.performance,
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ message: 'Session not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json({ success: true, session: updated });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Unauthorized or error occurred' }, { status: 401 });
  }
}
