import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import ForumPost from '@/models/ForumPost';
import { verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  await connectDB();

  const token = req.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = verifyToken(token!);
    const body = await req.json();

    const { title, body: content, tags } = body;

    if (!title || !content) {
      return NextResponse.json({ message: 'Title and content are required.' }, { status: 400 });
    }

    const newPost = await ForumPost.create({
      title,
      body: content,
      tags: tags || [],
      userId: decoded.id,
      username: decoded.name || 'Anonymous',
      replies: [],
      views: 0,
      isResolved: false,
      pinned: false,
      lastRepliedAt: null,
    });

    return NextResponse.json({ success: true, post: newPost }, { status: 201 });
  } catch (err) {
    console.error('Create ForumPost error:', err);
    return NextResponse.json({ message: 'Internal error' }, { status: 500 });
  }
}
