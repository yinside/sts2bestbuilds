'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Search, Command, X } from 'lucide-react';
import type { PostMeta } from '@/lib/posts';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(false);

  const doSearch = useCallback(async (q: string) => {
    if (q.length < 2) { setResults([]); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => doSearch(query), 200);
    return () => clearTimeout(timer);
  }, [query, doSearch]);

  return (
    <div className="container-site py-12 md:py-16 min-h-[60vh]">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">
          Search <span className="text-accent-light">Guides</span>
        </h1>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search builds, relics, bosses, strategies..."
            className="w-full pl-12 pr-20 py-3.5 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all"
            autoFocus
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-[var(--text-muted)]">
            <Command className="w-3 h-3" />K
          </div>
          {query && (
            <button
              onClick={() => { setQuery(''); setResults([]); }}
              className="absolute right-16 top-1/2 -translate-y-1/2 p-1 text-[var(--text-muted)] hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {query.length > 0 && query.length < 2 && (
          <p className="text-sm text-[var(--text-muted)] text-center py-8">
            Type at least 2 characters to search...
          </p>
        )}

        {query.length >= 2 && (
          <>
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="skeleton h-24 w-full" />
                ))}
              </div>
            ) : (
              <>
                <p className="text-xs text-[var(--text-muted)] mb-4">
                  {results.length} result{results.length !== 1 ? 's' : ''} for &quot;{query}&quot;
                </p>
                {results.length > 0 ? (
                  <div className="space-y-2">
                    {results.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/${post.slug}`}
                        className="block card-premium p-4 group hover:border-accent/20"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-accent/10 text-accent-light border border-accent/20">
                                {post.category}
                              </span>
                              <span className="text-xs text-[var(--text-muted)]">{post.date}</span>
                            </div>
                            <h3 className="font-semibold text-white group-hover:text-accent-light transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mt-1">
                              {post.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-[var(--text-muted)] text-lg">No results found.</p>
                    <p className="text-[var(--text-muted)] text-sm mt-2">Try different keywords or browse categories.</p>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {query.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4 opacity-30" />
            <p className="text-[var(--text-muted)]">
              Search across all guides, builds, relics, and boss strategies.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}