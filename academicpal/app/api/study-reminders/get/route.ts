import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import StudyReminder from '@/models/StudyReminder';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  await connectDB();
  const token = req.cookies.get('token')?.value;

  try {
    const decoded = verifyToken(token!);
    const reminders = await StudyReminder.find({ userId: (decoded as any).id }).sort({ remindAt: 1 });

    return NextResponse.json({ success: true, reminders });
  } catch (err) {
    return NextResponse.json({ message: 'Unauthorized or error occurred' }, { status: 401 });
  }
}
