import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import StudyTask from '@/models/StudyTask';
import { verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  await connectDB();
  const token = req.cookies.get('token')?.value;

  try {
    const decoded = verifyToken(token!);
    const body = await req.json();

    const newTask = await StudyTask.create({
      userId: (decoded as any).id,
      title: body.title,
      description: body.description,
      subject: body.subject,
      dueDate: body.dueDate,
      priority: body.priority,
      status: body.status,
    });

    return NextResponse.json({ success: true, task: newTask });
  } catch (err) {
    return NextResponse.json({ message: 'Unauthorized or error occurred' }, { status: 401 });
  }
}
