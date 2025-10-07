import { Metadata } from 'next';
import { Blog } from '@/types';

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`);
  const blogs: Blog[] = await res.json();
 
  return blogs.map((blog) => ({
    id: blog._id,
  }));
}


async function getBlog(id: string): Promise<Blog | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${id}`, {
      next: { revalidate: 600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const blog = await getBlog(params.id);

  if (!blog) {
    return {
      title: 'Blog Post Not Found',
      description: 'The blog post you are looking for does not exist.',
    };
  }

  return {
    title: `${blog.title} | Haque's Portfolio`,
    description: blog.content.replace(/<[^>]*>?/gm, '').substring(0, 160),
  };
}

export default async function SingleBlogPage({ params }: { params: { id: string } }) {
  const blog = await getBlog(params.id);

  if (!blog) {
    return <div>Blog not found.</div>;
  }

  return (
    <article className="container mx-auto px-4 py-24 max-w-3xl">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{blog.title}</h1>
      <p className="text-muted-foreground mb-8">By {blog.author}</p>
      
      <div 
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }} 
      />
    </article>
  );
}