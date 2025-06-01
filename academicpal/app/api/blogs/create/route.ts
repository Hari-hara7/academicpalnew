// app/api/blogs/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Blog } from '@/models/Blog';
import { verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  await connectDB();

  const token = req.cookies.get('token')?.value;

  try {
    if (!token) throw new Error('No token found');
    const decoded = verifyToken(token);

    const { title, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ success: false, message: 'Title and content are required' }, { status: 400 });
    }

    const newBlog = await Blog.create({
      title,
      content,
      authorId: (decoded as any).id,
      authorName: (decoded as any).username || 'Anonymous',
      upvotes: 0,
      downvotes: 0,
      comments: [],
    });

    return NextResponse.json({ success: true, blog: newBlog });
  } catch (err: any) {
    console.error('Blog creation error:', err.message);
    return NextResponse.json({ success: false, message: err.message || 'Error creating blog' }, { status: 500 });
  }
}
