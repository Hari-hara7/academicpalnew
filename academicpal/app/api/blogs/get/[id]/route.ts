// app/api/blogs/get/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Blog } from '@/models/Blog';

export async function GET(req: NextRequest) {
  await connectDB();
  const id = req.url.split('/').pop();

  if (!id) {
    return NextResponse.json({ success: false, message: 'Blog ID missing' }, { status: 400 });
  }

  try {
    const blog = await  Blog.findById(id).lean();

    if (!blog) {
      return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, blog });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
