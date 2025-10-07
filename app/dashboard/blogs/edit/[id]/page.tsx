'use client';

import { useEffect, useState } from 'react';
import BlogForm from '../../BlogForm';

interface Blog {
  _id: string;
  title: string;
  content: string;
}

export default function EditBlogPage({ params }: { params: { id: string } }) {
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${params.id}`);
      const data = await res.json();
      setBlog(data);
    };
    fetchBlogData();
  }, [params.id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Blog Post</h1>
      <BlogForm existingBlog={blog} />
    </div>
  );
}