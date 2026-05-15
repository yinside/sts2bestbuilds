import { getPostsByType, getAllTags } from '@/lib/posts';
import BuildCard from '@/components/home/BuildCard';
import type { Metadata } from 'next';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'All Builds - Slay the Spire 2 Build Guides',
  description: 'Browse all Slay the Spire 2 build guides. Meta builds for Ironclad, Silent, Defect, and Watcher.',
};

export default function BuildsPage() {
  const builds = getPostsByType('build');
  const allTags = getAllTags();

  return (
    <div className="container-site py-12 md:py-16">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
          All <span className="text-accent-light">Builds</span>
        </h1>
        <p className="text-[var(--text-secondary)] max-w-xl">
          Complete build guides with card choices, relic synergies, pathing advice, and boss matchup breakdowns.
        </p>
      </div>

      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {allTags.slice(0, 12).map((tag) => (
            <span key={tag.name} className="text-xs px-2.5 py-1 rounded-full bg-[rgba(255,255,255,0.04)] text-[var(--text-muted)] border border-[var(--border)] hover:text-white hover:border-[var(--border-hover)] transition-colors">
              {tag.name}
              <span className="text-[var(--text-muted)] ml-1">({tag.count})</span>
            </span>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {builds.map((build) => (
          <BuildCard key={build.slug} post={build} />
        ))}
      </div>

      {builds.length === 0 && (
        <div className="text-center py-20">
          <p className="text-[var(--text-muted)] text-lg">No builds published yet.</p>
          <p className="text-[var(--text-muted)] text-sm mt-2">Publish your first build from the CMS to see it here.</p>
        </div>
      )}
    </div>
  );
}