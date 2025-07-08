import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import ForumPost from '@/models/ForumPost';

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const posts = await ForumPost.find({}, {
      replies: 0, // omit replies to improve performance
    })
      .sort({ lastRepliedAt: -1, createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, posts });
  } catch (err) {
    console.error('Get ForumPosts error:', err);
    return NextResponse.json({ message: 'Failed to fetch posts' }, { status: 500 });
  }
}
