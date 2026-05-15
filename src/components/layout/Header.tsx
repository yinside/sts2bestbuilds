'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sword, Search } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/builds', label: 'Builds' },
  { href: '/tier-lists', label: 'Tier Lists' },
  { href: '/relics', label: 'Relics' },
  { href: '/bosses', label: 'Bosses' },
  { href: '/guides', label: 'Guides' },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[#090909]/80 backdrop-blur-xl">
      <div className="container-site flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center group-hover:shadow-[0_0_16px_rgba(185,28,28,0.4)] transition-shadow">
            <Sword className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">
            STS2<span className="text-accent">Best</span>Builds
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'text-white bg-[rgba(255,255,255,0.06)]'
                    : 'text-[var(--text-secondary)] hover:text-white hover:bg-[rgba(255,255,255,0.04)]'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-accent rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/search"
            className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm text-[var(--text-muted)] hover:text-white bg-[rgba(255,255,255,0.04)] rounded-lg border border-[var(--border)] transition-colors"
          >
            <Search className="w-4 h-4" />
            <span className="hidden lg:inline">Search builds, relics...</span>
            <kbd className="hidden lg:inline text-xs px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.06)] text-[var(--text-muted)] ml-2">
              ⌘K
            </kbd>
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-[var(--text-secondary)] hover:text-white transition-colors"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[var(--border)] bg-[#090909] overflow-hidden"
          >
            <div className="container-site py-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'text-white bg-accent/10 border border-accent/20'
                        : 'text-[var(--text-secondary)] hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/search"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-3 text-sm text-[var(--text-secondary)] hover:text-white transition-colors"
              >
                <Search className="w-4 h-4" />
                Search
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}