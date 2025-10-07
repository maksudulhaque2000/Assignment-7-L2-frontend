import Link from 'next/link';
import { Facebook, Github, Instagram, Linkedin, Twitter, X, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40 w-full">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-[1400px]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="text-xl font-bold">
              Haque&apos;s<span className="text-primary">Portfolio</span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Building digital experiences with code
            </p>
          </div>

          <div className="flex gap-6">
            <Link
              href="https://github.com/maksudulhaque2000"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/maksudulhaque2000/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.facebook.com/maksudulhaque2000"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.youtube.com/@maksudulhaque2000"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Youtube className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.instagram.com/maksudulhaque2000/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <Link href="/login" className="text-xs opacity-50 hover:opacity-100 transition-opacity">
                Admin Login
            </Link>

        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          © {2025} Haque&apos;s Portfolio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}