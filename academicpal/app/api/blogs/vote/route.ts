// app/api/blogs/vote/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Blog } from '@/models/Blog';

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const { blogId, voteType } = body;

  if (!blogId || !voteType) {
    return NextResponse.json({ success: false, message: 'Missing blogId or voteType' }, { status: 400 });
  }

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 });
    }

    if (voteType === 'upvote') {
      blog.upvotes = (blog.upvotes || 0) + 1;
    } else if (voteType === 'downvote') {
      blog.downvotes = (blog.downvotes || 0) + 1;
    } else {
      return NextResponse.json({ success: false, message: 'Invalid vote type' }, { status: 400 });
    }

    await blog.save();

    return NextResponse.json({ success: true, blog });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
