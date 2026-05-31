import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { MusicProvider } from '@/components/layout/MusicProvider';
import { FloatingWhatsApp } from '@/components/sections/FloatingWhatsApp';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'The Wedding of Sarah & James — 12 Desember 2026',
  description: 'Kami mengundang Anda untuk merayakan pernikahan Sarah & James pada 12 Desember 2026.',
  keywords: ['wedding', 'undangan pernikahan', 'digital invitation', 'Sarah & James'],
  manifest: '/manifest.json',
  themeColor: '#D4A853',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Wedding Sarah & James',
  },
  openGraph: {
    title: 'The Wedding of Sarah & James',
    description: 'Kami mengundang Anda untuk merayakan pernikahan kami pada 12 Desember 2026.',
    type: 'website',
    locale: 'id_ID',
    images: ['https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Wedding of Sarah & James',
    description: 'Kami mengundang Anda untuk merayakan pernikahan kami.',
    images: ['https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="theme-color" content="#D4A853" />
      </head>
      <body className={inter.className}>
        <MusicProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <FloatingWhatsApp />
          </div>
        </MusicProvider>
      </body>
    </html>
  );
}
