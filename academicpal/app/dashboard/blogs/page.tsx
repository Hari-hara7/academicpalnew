'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Blog } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Plus, FileText } from 'lucide-react';

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs/get-all');
        const data = await res.json();
        if (data.success) {
          setBlogs(data.blogs);
        }
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 sm:p-10">
    {/* Header */}
<div className="flex flex-row sm:flex-row justify-between items-center mb-8 gap-4">
  <h1 className="text-3xl font-extrabold tracking-tight text-white whitespace-nowrap">
    Blogs
  </h1>
  <Button
    variant="default"
    size="md"
    className="flex items-center gap-2 whitespace-nowrap px-4 py-2 bg-white text-black hover:bg-gray-100 transition-colors rounded-lg shadow-md"
    onClick={() => router.push('/dashboard/blogs/create')}
    aria-label="Create new blog"
  >
    <Plus className="w-5 h-5" />
    New Blog
  </Button>
</div>

      

      {/* Blog list */}
      <div className="space-y-6">
        {blogs.length === 0 && (
          <p className="text-center text-gray-300 text-lg">No blogs yet.</p>
        )}

        {blogs.map((blog) => (
          <article
            key={blog._id}
            className="group cursor-pointer rounded-lg border border-white bg-black/70 p-6 shadow-md transition-shadow hover:shadow-lg"
            onClick={() => router.push(`/dashboard/blogs/${blog._id}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') router.push(`/dashboard/blogs/${blog._id}`);
            }}
          >
            <header className="flex items-center gap-3 mb-2">
              <FileText className="w-6 h-6 text-white flex-shrink-0" />
              <h2 className="text-2xl font-semibold text-white group-hover:text-blue-400 transition-colors break-words">
                {blog.title}
              </h2>
            </header>
            <p className="text-sm text-gray-300">
              by {blog.authorName || 'Unknown'} on{' '}
              {new Date(blog.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
            <p className="mt-3 text-base leading-relaxed text-gray-200 line-clamp-3 break-words">
              {blog.content}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
