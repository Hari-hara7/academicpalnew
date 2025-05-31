import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import StudyReminder from '@/models/StudyReminder';
import { verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  await connectDB();
  const token = req.cookies.get('token')?.value;

  try {
    const decoded = verifyToken(token!);
    const body = await req.json();

    const reminder = await StudyReminder.create({
      userId: (decoded as any).id,
      title: body.title,
      description: body.description,
      remindAt: body.remindAt,
    });

    return NextResponse.json({ success: true, reminder });
  } catch (err) {
    return NextResponse.json({ message: 'Unauthorized or error occurred' }, { status: 401 });
  }
}
