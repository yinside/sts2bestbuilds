import { getPostsByType } from '@/lib/posts';
import Link from 'next/link';
import { Gem, Clock, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Relic Guides - Slay the Spire 2 Relic Tier Lists & Synergies',
  description: 'Complete Slay the Spire 2 relic guides. Tier rankings, synergy analysis, and pick priority for every relic.',
};

export default function RelicsPage() {
  const relics = getPostsByType('relic');

  return (
    <div className="container-site py-12 md:py-16">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
          Relic <span className="text-accent-light">Guides</span>
        </h1>
        <p className="text-[var(--text-secondary)] max-w-xl">
          Detailed relic analysis, tier rankings, and synergy breakdowns for every relic in Slay the Spire 2.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {relics.map((relic) => (
          <Link key={relic.slug} href={`/${relic.slug}`} className="block group">
            <article className="card-premium p-5 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-md bg-accent/10">
                  <Gem className="w-4 h-4 text-accent-light" />
                </div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-[var(--text-muted)]">
                  {relic.category}
                </span>
              </div>
              <h3 className="font-semibold text-white group-hover:text-accent-light transition-colors mb-2">
                {relic.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-4 flex-1">{relic.description}</p>
              <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                  <Clock className="w-3 h-3" />{relic.date}
                </span>
                <span className="text-xs text-accent-light flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {relics.length === 0 && (
        <div className="text-center py-20">
          <p className="text-[var(--text-muted)] text-lg">No relic guides published yet.</p>
        </div>
      )}
    </div>
  );
}