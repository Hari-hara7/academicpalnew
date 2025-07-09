import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Session from '@/models/Session';
import Tutor from '@/models/Tutor';
import { verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  await connectDB();
  const token = req.cookies.get('token')?.value;

  if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const decoded = verifyToken(token!);
    const userId = (decoded as any).id;
    const { sessionId, rating, review } = await req.json();

    const session = await Session.findById(sessionId);

    if (!session || String(session.learnerId) !== userId) {
      return NextResponse.json({ message: 'Session not found or unauthorized' }, { status: 403 });
    }

    // Save feedback to session
    session.feedback = { rating, review };
    session.status = 'completed';
    await session.save();

    // Update tutor's average rating
    const sessions = await Session.find({
      tutorId: session.tutorId,
      'feedback.rating': { $exists: true },
    });

    const totalRatings = sessions.reduce((sum, s) => sum + s.feedback.rating, 0);
    const averageRating = totalRatings / sessions.length;

    await Tutor.findByIdAndUpdate(session.tutorId, { rating: averageRating });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Feedback error:', err);
    return NextResponse.json({ message: 'Failed to submit feedback' }, { status: 500 });
  }
}
