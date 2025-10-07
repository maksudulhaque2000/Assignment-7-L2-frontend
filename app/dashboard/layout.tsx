'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Home } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login');
      toast.error('You must be logged in to view this page.');
    }
  }, [router]);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    router.push('/login');
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex">
      <aside className="w-64 min-h-screen bg-secondary p-4">
        <h2 className="font-bold text-xl mb-6">Dashboard</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/dashboard">Overview</Link>
          <Link href="/dashboard/blogs">Manage Blogs</Link>
          <Link href="/dashboard/projects">Manage Projects</Link>
          <button onClick={handleLogout} className="text-left mt-auto text-red-500">Logout</button>
        </nav>

        <hr className="my-4" />
        <Link href="/" className="flex items-center gap-2 p-2 rounded hover:bg-primary/10">
            <Home className="h-4 w-4" />
            Back to Home
          </Link>

        <hr className="my-4" />
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}