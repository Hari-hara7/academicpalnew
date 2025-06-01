import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Blog } from '@/models/Blog';
import { verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  await connectDB();

  const token = req.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = verifyToken(token);
    const { blogId, comment } = await req.json();

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    blog.comments.push({
      userId: (decoded as any).id,
      username: (decoded as any).username,
      text: comment,
    });

    await blog.save();

    return NextResponse.json({ success: true, blog });
  } catch (err) {
    return NextResponse.json({ message: 'Error adding comment' }, { status: 500 });
  }
}
