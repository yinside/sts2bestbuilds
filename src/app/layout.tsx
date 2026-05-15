import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'STS2 Builds - Slay the Spire 2 Best Builds & Guides',
  description: 'Expert Slay the Spire 2 guides, builds, tier lists, and strategies.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-[rgba(255,255,255,0.08)] bg-[#0d0d10]/80 backdrop-blur sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white hover:text-[var(--red)] transition-colors">
              <span className="text-[var(--red)]">STS2</span> Builds
            </Link>
            <nav className="flex items-center gap-4 text-sm text-[var(--muted)]">
              <Link href="/" className="hover:text-white transition-colors">Guides</Link>
              <a href="https://github.com/yinside/sts2bestbuilds" target="_blank" rel="noopener" className="hover:text-white transition-colors">GitHub</a>
            </nav>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-[rgba(255,255,255,0.08)] text-center py-8 mt-12">
          <p className="text-sm text-[var(--muted)]">
            STS2 Builds — AI-powered Slay the Spire 2 strategy guides
          </p>
        </footer>
      </body>
    </html>
  );
}