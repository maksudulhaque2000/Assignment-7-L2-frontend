import { Metadata } from 'next';
import { Blog } from '@/types';


export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`);
    

    if (!res.ok) {
      console.error(`Failed to fetch blogs for generateStaticParams. Status: ${res.status}`);
      return [];
    }

    let blogs: Blog[];
    try {
      blogs = await res.json();
    } catch (e) {
      console.error("Failed to parse JSON response for blogs:", e);
      return [];
    }
 
    if (!Array.isArray(blogs)) {
        console.error("Fetched data for blogs is not an array.");
        return [];
    }

    return blogs.map((blog) => ({
      id: blog._id,
    }));

  } catch (error) {
    console.error("Error in generateStaticParams for blogs:", error);
    return [];
  }
}



async function getBlog(id: string): Promise<Blog | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${id}`);
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
    return (
        <div className="container mx-auto px-4 py-24 text-center">
            <h1 className="text-2xl font-bold">Blog not found.</h1>
            <p className="text-muted-foreground mt-2">The requested blog post could not be found.</p>
        </div>
    );
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