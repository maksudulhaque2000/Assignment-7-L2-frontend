'use client';

import { usePathname } from 'next/navigation';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
import { Toaster } from 'react-hot-toast';
import { TabProvider } from '@/context/TabContext';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboardPage = pathname.startsWith('/dashboard');

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TabProvider>
            <Toaster position="top-center" />
            <div className="flex min-h-screen flex-col">
              {!isDashboardPage && <Header />}
              
              <main className="flex-grow">{children}</main>
              
              {!isDashboardPage && <Footer />}
            </div>
          </TabProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}