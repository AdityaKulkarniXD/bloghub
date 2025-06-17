import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from '@/components/ui/sonner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BlogHub - Modern Blogging Platform',
  description: 'A modern blogging platform for writers and readers to connect, share, and discover amazing content.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="min-h-screen relative">
              {/* Background Pattern */}
              <div className="fixed inset-0 opacity-30 dark:opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 25% 25%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
                                   radial-gradient(circle at 75% 75%, rgba(118, 75, 162, 0.1) 0%, transparent 50%),
                                   radial-gradient(circle at 50% 50%, rgba(240, 147, 251, 0.05) 0%, transparent 50%)`,
                }} />
              </div>
              
              <Navbar />
              <main className="pt-32 pb-8 relative z-10">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}