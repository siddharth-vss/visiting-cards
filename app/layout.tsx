import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/lib/auth-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Business Card Generator - Create Professional Cards',
  description: 'Create stunning, professional business cards with our easy-to-use designer. Choose from beautiful templates and customize every detail.',
  icons: {
    icon: '/favicon-32x32.png', // path is relative to /public
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>

        <Toaster />
      </body>
    </html>
  );
}