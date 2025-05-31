import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import StudyTask from '@/models/StudyTask';
import { verifyToken } from '@/lib/auth';

export async function PUT(req: NextRequest) {
  await connectDB();
  const token = req.cookies.get('token')?.value;

  try {
    const decoded = verifyToken(token!);
    const body = await req.json();

    const updatedTask = await StudyTask.findOneAndUpdate(
      { _id: body.id, userId: (decoded as any).id },
      { ...body },
      { new: true }
    );

    return NextResponse.json({ success: true, task: updatedTask });
  } catch (err) {
    return NextResponse.json({ message: 'Unauthorized or error occurred' }, { status: 401 });
  }
}
