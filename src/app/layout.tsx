import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://manevia.com'),
  title: {
    template: '%s | Manevia Luxury Hair',
    default: 'Manevia | Premium Luxury Wigs & Glueless Lace',
  },
  description: 'Shop the finest virgin human hair, glueless minimalist lace, and premium wigs. Try on wigs instantly with Manevia’s AI Virtual Try-On Studio.',
  keywords: ['luxury wigs', 'human hair', 'glueless lace wigs', 'virtual try-on wig', 'AI hair try on', 'Manevia'],
  openGraph: {
    title: 'Manevia | Premium Luxury Wigs',
    description: 'Shop the finest virgin human hair, glueless minimalist lace, and premium wigs.',
    url: 'https://manevia.com',
    siteName: 'Manevia',
    images: [
      {
        url: '/assets/hero_wig_straight_1778364904239.png',
        width: 1200,
        height: 630,
        alt: 'Manevia Luxury Wigs',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manevia Luxury Hair',
    description: 'Premium Wigs & AI Virtual Try-On.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        
        {/* Inconspicuous Admin Link */}
        <div className="fixed bottom-0 w-full flex justify-center py-1 opacity-20 hover:opacity-100 transition-opacity duration-300 z-50 pointer-events-none">
          <a href="/admin" className="pointer-events-auto text-[10px] uppercase tracking-widest text-gray-500 hover:text-black font-medium">
            Admin Portal
          </a>
        </div>
      </body>
    </html>
  );
}
