'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { BookText, PlusCircle } from 'lucide-react';

interface Blog {
  _id: string;
  title: string;
  author: string;
}

function ItemSkeleton() {
  return (
    <div className="p-4 border rounded flex justify-between items-center animate-pulse">
      <div className="space-y-2">
        <div className="h-5 w-48 bg-muted rounded"></div>
        <div className="h-4 w-24 bg-muted rounded"></div>
      </div>
      <div className="flex gap-4">
        <div className="h-5 w-12 bg-muted rounded"></div>
        <div className="h-5 w-16 bg-muted rounded"></div>
      </div>
    </div>
  );
}

export default function ManageBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`);
      if (!res.ok) {
        toast.error('Failed to fetch blogs.');
        return;
      }
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      toast.error('An error occurred while fetching blogs.');
    } finally {
      setLoading(false);
    }
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
      setBlogs(currentBlogs => currentBlogs.filter(blog => blog._id !== id));
    } catch (error) {
      toast.error('Could not delete the blog.', { id: toastId });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <BookText className="h-8 w-8 text-primary" />
          Manage Blogs
        </h1>
        <Link href="/dashboard/blogs/create" className="bg-primary text-primary-foreground py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors">
          <PlusCircle className="h-5 w-5" />
          Create New Blog
        </Link>
      </div>

      <div className="space-y-4">
        {loading ? (
          <>
            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />
          </>
        ) : blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className="p-4 border rounded flex justify-between items-center transition-all hover:shadow-md">
              <div>
                <h2 className="font-bold text-lg">{blog.title}</h2>
                <p className="text-sm text-muted-foreground">Author: {blog.author}</p>
              </div>
              <div className="flex items-center gap-4">
                <Link href={`/dashboard/blogs/edit/${blog._id}`} className="text-blue-500 hover:underline">Edit</Link>
                <button onClick={() => handleDelete(blog._id)} className="text-red-500 hover:underline">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <h3 className="text-xl font-semibold text-muted-foreground">No Blogs Found</h3>
            <p className="text-muted-foreground mt-2">Get started by creating a new blog post.</p>
          </div>
        )}
      </div>
    </div>
  );
}