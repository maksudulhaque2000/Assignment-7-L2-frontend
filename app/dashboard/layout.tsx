'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Home, Newspaper, LayoutGrid, LogOut, BarChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FullPageLoader } from '@/components/ui/FullPageLoader';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login');
      toast.error('You must be logged in to view this page.');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    router.push('/login');
  };


  if (!isClient || !isAuthenticated) {
    return <FullPageLoader />;
  }

  const navLinks = [
    { href: '/dashboard', label: 'Overview', icon: BarChart },
    { href: '/dashboard/blogs', label: 'Manage Blogs', icon: Newspaper },
    { href: '/dashboard/projects', label: 'Manage Projects', icon: LayoutGrid },
  ];

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-secondary p-4 flex flex-col justify-between">
        <div>
          <div className="mb-8">
            <h2 className="font-bold text-2xl text-center">Dashboard</h2>
          </div>
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    isActive && "bg-primary text-primary-foreground"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary border">
                <Home className="h-4 w-4" />
                Back to Home
            </Link>
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-red-500 transition-all hover:bg-red-500/10"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
        </div>
      </aside>
      <main className="flex-1 p-6 sm:p-8">
        {children}
      </main>
    </div>
  );
}