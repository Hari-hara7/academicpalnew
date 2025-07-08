import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import ForumPost from '@/models/ForumPost';
import { verifyToken } from '@/lib/auth';
import { getSocketServer } from '@/lib/socketServer';

export async function POST(req: NextRequest) {
  await connectDB();

  const token = req.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = verifyToken(token!);
    const { threadId, message } = await req.json();

    if (!threadId || !message) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const reply = {
      userId: decoded.id,
      username: decoded.name || 'Anonymous',
      message,
      upvotes: 0,
      createdAt: new Date().toISOString(),
    };

    const updatedPost = await ForumPost.findByIdAndUpdate(
      threadId,
      {
        $push: { replies: reply },
        $set: { lastRepliedAt: new Date() },
      },
      { new: true }
    );

    // Emit new reply to all clients in this thread room
    const io = getSocketServer();
    io.to(threadId).emit('new-reply', { threadId, reply });

    return NextResponse.json({ success: true, reply });
  } catch (err) {
    console.error('Reply error:', err);
    return NextResponse.json({ message: 'Error replying' }, { status: 500 });
  }
}
