import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: 'STS2BestBuilds - Slay the Spire 2 Builds & Strategy Guides',
    template: '%s | STS2BestBuilds',
  },
  description:
    'Premium Slay the Spire 2 strategy guides. Meta builds, relic tier lists, boss strategies, and deck optimization. Expert analysis for every character.',
  metadataBase: new URL('https://sts2bestbuilds.vercel.app'),
  openGraph: {
    type: 'website',
    siteName: 'STS2BestBuilds',
    title: 'STS2BestBuilds - Slay the Spire 2 Builds & Strategy Guides',
    description:
      'Premium Slay the Spire 2 strategy guides. Meta builds, relic tier lists, boss strategies, and deck optimization.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'STS2BestBuilds - Slay the Spire 2 Builds & Strategy Guides',
    description:
      'Premium Slay the Spire 2 strategy guides. Meta builds, relic tier lists, boss strategies, and deck optimization.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}