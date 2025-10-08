'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Blog {
  _id?: string;
  title: string;
  content: string;
}

export default function BlogForm({ existingBlog }: { existingBlog?: Blog }) {
  const [title, setTitle] = useState(existingBlog?.title || '');
  const [content, setContent] = useState(existingBlog?.content || '');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading(existingBlog ? 'Updating post...' : 'Creating post...');

    const blogData = { title, content };

    const url = existingBlog
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${existingBlog._id}`
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`;
      
    const method = existingBlog ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(blogData),
      });

      if (!res.ok) throw new Error('Operation failed');

      toast.success(existingBlog ? 'Post updated!' : 'Post created!', { id: toastId });
      
      // --- পরিবর্তন এখানে: Revalidation সিগন্যাল পাঠানো হচ্ছে ---
      await fetch(`/api/revalidate?path=/blogs&token=${process.env.NEXT_PUBLIC_REVALIDATION_TOKEN}`);
      if (existingBlog) {
        await fetch(`/api/revalidate?path=/blogs/${existingBlog._id}&token=${process.env.NEXT_PUBLIC_REVALIDATION_TOKEN}`);
      }
      console.log("Revalidation triggered for blogs.");
      
      router.push('/dashboard/blogs');
      router.refresh(); // ড্যাশবোর্ড পেজ রিফ্রেশ করার জন্য
    } catch (error) {
      toast.error('Something went wrong.', { id: toastId });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded mt-1" required />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <ReactQuill theme="snow" value={content} onChange={setContent} className="bg-background mt-1" />
      </div>
      <button type="submit" className="bg-primary text-primary-foreground p-2 rounded mt-8">
        {existingBlog ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  );
}