import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Digital Namecard - Your Professional Profile',
  description: 'A modern digital namecard with AI-powered chatbot',
  keywords: ['digital namecard', 'profile', 'portfolio', 'AI chatbot'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Digital Namecard - Your Professional Profile',
    description: 'A modern digital namecard with AI-powered chatbot',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
