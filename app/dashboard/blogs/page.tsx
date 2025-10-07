'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Blog {
  _id: string;
  title: string;
  author: string;
}

export default function ManageBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const fetchBlogs = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`);
    const data = await res.json();
    setBlogs(data);
  };
  
  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    
    const toastId = toast.loading('Deleting blog...');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!res.ok) throw new Error('Failed to delete');
      
      toast.success('Blog deleted successfully', { id: toastId });
      fetchBlogs();
    } catch (error) {
      toast.error('Could not delete the blog.', { id: toastId });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Blogs</h1>
        <Link href="/dashboard/blogs/create" className="bg-primary text-primary-foreground p-2 rounded">
          Create New Blog
        </Link>
      </div>
      <div className="space-y-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="p-4 border rounded flex justify-between items-center">
            <div>
              <h2 className="font-bold">{blog.title}</h2>
              <p className="text-sm text-muted-foreground">Author: {blog.author}</p>
            </div>
            <div className="flex gap-4">
              <Link href={`/dashboard/blogs/edit/${blog._id}`} className="text-blue-500">Edit</Link>
              <button onClick={() => handleDelete(blog._id)} className="text-red-500">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}