import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import ForumPost from '@/models/ForumPost';

export async function GET(req: NextRequest) {
  await connectDB();

  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'Missing thread ID' }, { status: 400 });
  }

  try {
    const post = await ForumPost.findById(id).lean();

    if (!post) {
      return NextResponse.json({ message: 'Thread not found' }, { status: 404 });
    }

    // Optional: increment view count
    await ForumPost.findByIdAndUpdate(id, { $inc: { views: 1 } });

    return NextResponse.json({ success: true, post });
  } catch (err) {
    console.error('Get thread error:', err);
    return NextResponse.json({ message: 'Error fetching thread' }, { status: 500 });
  }
}
