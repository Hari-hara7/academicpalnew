import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import MindMap from '@/models/MindMap';
import { verifyToken } from '@/lib/auth';

export async function PUT(req: NextRequest) {
  await connectDB();
  const token = req.cookies.get('token')?.value;

  try {
    const decoded = verifyToken(token!);
    const body = await req.json();

    const updatedMap = await MindMap.findOneAndUpdate(
      { _id: body.id, userId: (decoded as any).id },
      {
        topic: body.topic,
        subtopics: body.subtopics,
      },
      { new: true }
    );

    return NextResponse.json({ success: true, mindMap: updatedMap });
  } catch (err) {
    return NextResponse.json({ message: 'Unauthorized or error occurred' }, { status: 401 });
  }
}
