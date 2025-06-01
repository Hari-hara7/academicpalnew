import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import StudySession from '@/models/StudySession';
import { verifyToken } from '@/lib/auth';

export async function DELETE(req: NextRequest) {
  await connectDB();
  const token = req.cookies.get('token')?.value;

  try {
    const decoded = verifyToken(token!);
    const body = await req.json();

    const deleted = await StudySession.findOneAndDelete({
      _id: body.id,
      userId: (decoded as any).id,
    });

    if (!deleted) {
      return NextResponse.json({ message: 'Session not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Session deleted' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Unauthorized or error occurred' }, { status: 401 });
  }
}
