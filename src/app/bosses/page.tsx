import { getPostsByType } from '@/lib/posts';
import Link from 'next/link';
import { Skull, Clock, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Boss Strategies - Slay the Spire 2 Boss Guides',
  description: 'Detailed boss strategy guides for every Slay the Spire 2 encounter. Learn attack patterns and optimal counters.',
};

export default function BossesPage() {
  const bosses = getPostsByType('boss');

  return (
    <div className="container-site py-12 md:py-16">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
          Boss <span className="text-accent-light">Strategies</span>
        </h1>
        <p className="text-[var(--text-secondary)] max-w-xl">
          Learn every boss fight pattern, optimal counters, and deck requirements for each encounter.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {bosses.map((boss) => (
          <Link key={boss.slug} href={`/bosses/${boss.slug}`} className="block group">
            <article className="card-premium p-5 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-md bg-accent/10">
                  <Skull className="w-4 h-4 text-accent-light" />
                </div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-[var(--text-muted)]">
                  {boss.category}
                </span>
              </div>
              <h3 className="font-semibold text-white group-hover:text-accent-light transition-colors mb-2">
                {boss.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-4 flex-1">{boss.description}</p>
              <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                  <Clock className="w-3 h-3" />{boss.date}
                </span>
                <span className="text-xs text-accent-light flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {bosses.length === 0 && (
        <div className="text-center py-20">
          <p className="text-[var(--text-muted)] text-lg">No boss guides published yet.</p>
        </div>
      )}
    </div>
  );
}