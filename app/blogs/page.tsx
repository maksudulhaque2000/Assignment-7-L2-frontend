import { Suspense } from 'react';
import Link from 'next/link';
import { Blog } from '@/types';
import { Metadata } from 'next';
import { BlogCardSkeleton } from '@/components/ui/BlogCardSkeleton';

export const metadata: Metadata = {
  title: "My Blogs | Haque's Portfolio",
  description: "A collection of my thoughts, tutorials, and articles on web development, technology, and programming.",
};

async function BlogList() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`, {
      next: { revalidate: 600 },
    });

    if (!res.ok) {
      return <p className="col-span-3 text-center text-red-500">Failed to load blogs.</p>;
    }
    
    const blogs: Blog[] = await res.json();
    
    if (blogs.length === 0) {
        return <p className="col-span-3 text-center text-muted-foreground">No blog posts found yet.</p>;
    }

    return (
      <>
        {blogs.map((blog) => (
          <Link href={`/blogs/${blog._id}`} key={blog._id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow block">
            <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
            <p className="text-muted-foreground line-clamp-3">
              {blog.content.replace(/<[^>]*>?/gm, '').substring(0, 150)}...
            </p>
            <span className="text-primary mt-4 inline-block font-semibold">Read More</span>
          </Link>
        ))}
      </>
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return <p className="col-span-3 text-center text-red-500">Could not connect to the server.</p>;
  }
}

function BlogsLoadingSkeleton() {
    return (
        <>
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
        </>
    );
}


export default function BlogsPage() {
  return (
    <div className="container mx-auto px-4 py-24 md:py-32">
      <h1 className="text-4xl font-bold mb-12 text-center">My Blog</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<BlogsLoadingSkeleton />}>
          <BlogList />
        </Suspense>
      </div>
    </div>
  );
}
