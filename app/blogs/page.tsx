import Link from 'next/link';
import { Blog } from '@/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "My Blogs | Haque's Portfolio",
  description: "A collection of my thoughts, tutorials, and articles on web development, technology, and programming.",
};

async function getBlogs(): Promise<Blog[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`, {
      next: { revalidate: 600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    return [];
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold mb-8 text-center">My Blog</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <Link href={`/blogs/${blog._id}`} key={blog._id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            {/* Optional: <img src={blog.imageUrl} alt={blog.title} /> */}
            <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
            <p className="text-muted-foreground line-clamp-3">
              {blog.content.replace(/<[^>]*>?/gm, '').substring(0, 150)}...
            </p>
            <span className="text-primary mt-4 inline-block">Read More</span>
          </Link>
        ))}
      </div>
    </div>
  );
}