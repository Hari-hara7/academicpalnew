import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Session from '@/models/Session';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  await connectDB();
  const token = req.cookies.get('token')?.value;
  if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const decoded = verifyToken(token!);
    const userId = (decoded as any).id;

    const sessions = await Session.find({
      $or: [{ learnerId: userId }, { tutorId: userId }],
    })
      .populate('tutorId', 'name')
      .populate('learnerId', 'name')
      .sort({ scheduledAt: -1 });

    return NextResponse.json({ success: true, sessions });
  } catch (err) {
    console.error('Fetch sessions error:', err);
    return NextResponse.json({ message: 'Failed to fetch sessions' }, { status: 500 });
  }
}
