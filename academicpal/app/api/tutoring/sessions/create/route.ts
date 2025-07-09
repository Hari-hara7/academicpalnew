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
    const learnerId = (decoded as any).id;

    const { tutorId, subject, scheduledAt, mode, meetingLink, notes } = await req.json();

    if (!tutorId || !subject || !scheduledAt || !mode) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Validate tutor exists
    const tutor = await Tutor.findById(tutorId);
    if (!tutor) return NextResponse.json({ message: 'Tutor not found' }, { status: 404 });

    // Create session (initial status: pending)
    const session = await Session.create({
      tutorId,
      learnerId,
      subject,
      scheduledAt: new Date(scheduledAt),
      mode,
      meetingLink: meetingLink || '',
      notes: notes || '',
      status: 'pending',
    });

    return NextResponse.json({ success: true, session });
  } catch (err) {
    console.error('Schedule session error:', err);
    return NextResponse.json({ message: 'Failed to schedule session' }, { status: 500 });
  }
}
