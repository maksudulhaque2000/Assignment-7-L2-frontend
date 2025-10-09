import Link from 'next/link';
import { Newspaper, LayoutGrid } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">👋 Welcome to your Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        This is your central hub for managing your portfolio&apos;s content. Select a quick action below or use the sidebar to get started.
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link 
          href="/dashboard/blogs" 
          className="p-6 border rounded-lg hover:shadow-lg hover:border-primary transition-all flex items-start gap-4"
        >
          <div className="bg-primary/10 p-3 rounded-md">
            <Newspaper className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Manage Blogs</h2>
            <p className="mt-1 text-muted-foreground">Create, edit, and delete your blog posts.</p>
          </div>
        </Link>

        <Link 
          href="/dashboard/projects" 
          className="p-6 border rounded-lg hover:shadow-lg hover:border-primary transition-all flex items-start gap-4"
        >
          <div className="bg-primary/10 p-3 rounded-md">
            <LayoutGrid className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Manage Projects</h2>
            <p className="mt-1 text-muted-foreground">Add new projects, update details, and manage your showcase.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}