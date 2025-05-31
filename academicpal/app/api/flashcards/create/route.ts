import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Flashcard } from '@/models/Flashcard';
import { verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  await connectDB();
  const token = req.cookies.get('token')?.value;

  if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const decoded = verifyToken(token);
    const body = await req.json();

    const flashcard = new Flashcard({
      userId: (decoded as any).id,
      question: body.question,
      answer: body.answer,
    });

    await flashcard.save();

    return NextResponse.json({ success: true, flashcard });
  } catch (err) {
    return NextResponse.json({ message: 'Unauthorized or error' }, { status: 401 });
  }
}
