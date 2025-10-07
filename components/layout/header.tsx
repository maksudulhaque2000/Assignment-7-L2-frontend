'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTabContext } from '@/context/TabContext';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Experience', href: '#resume', tab: 'experience' },
  { name: 'Education', href: '#resume', tab: 'education' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const { setActiveResumeTab } = useTabContext();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleNavClick = (tab: string, sectionId: string) => {
    setActiveResumeTab(tab);
    if (pathname !== '/') {
        window.location.href = `/#${sectionId}`;
    } else {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
  };

  const renderNavItem = (item: typeof navItems[0], isMobile = false) => {
    const classNames = cn("text-sm font-medium text-muted-foreground hover:text-foreground transition-colors", isMobile && "text-lg hover:text-primary");

    if (item.tab) {
      return (
        <button key={item.name} onClick={() => { handleNavClick(item.tab, item.href.substring(1)); if (isMobile) setIsOpen(false); }} className={classNames}>
          {item.name}
        </button>
      );
    }

    if (item.href.startsWith('#') && pathname !== '/') {
        return (
            <Link key={item.name} href={`/${item.href}`} onClick={() => { if (isMobile) setIsOpen(false); }} className={classNames}>
                {item.name}
            </Link>
        );
    }

    return (
      <Link key={item.name} href={item.href} onClick={() => { if (isMobile) setIsOpen(false); }} className={classNames}>
        {item.name}
      </Link>
    );
  };
  
  const isLoginPage = pathname === '/login';

  return (
    <header className={cn('fixed top-0 z-50 w-full transition-all duration-300', scrolled ? 'bg-background/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6')}>
      <div className="container mx-auto px-4 md:px-6 max-w-[1400px] flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight hover:text-primary/90 transition-colors">
          Haque&apos;s<span className="text-primary">Portfolio</span>
        </Link>
        
        {!isLoginPage && (
          <>
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => renderNavItem(item, false))}
              <ThemeToggle />
            </nav>
            <div className="flex items-center gap-4 md:hidden">
              <ThemeToggle />
              <Button variant="ghost" size="icon" aria-label="Toggle Menu" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </>
        )}
      </div>
      {isOpen && !isLoginPage && (
        <div className="fixed inset-0 top-[73px] z-50 bg-background md:hidden">
          <nav className="flex flex-col items-center justify-center h-full gap-8">
            {navItems.map((item) => renderNavItem(item, true))}
          </nav>
        </div>
      )}
    </header>
  );
}