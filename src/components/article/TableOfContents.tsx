'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { List } from 'lucide-react';

interface Heading {
  level: number;
  text: string;
  id: string;
}

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="hidden lg:block sticky top-24">
      <div className="flex items-center gap-2 mb-4">
        <List className="w-4 h-4 text-accent-light" />
        <span className="text-sm font-semibold text-white">On this page</span>
      </div>
      <ul className="space-y-1.5 border-l border-[var(--border)]">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block text-sm py-1 transition-colors border-l-2 -ml-px ${
                activeId === h.id
                  ? 'border-accent text-accent-light pl-3'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)] pl-3'
              }`}
              style={{ paddingLeft: `${(h.level - 1) * 12 + 12}px` }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}