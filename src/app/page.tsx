import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';

export const dynamic = 'force-static';

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div>
      <section className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">
          Slay the Spire 2 <span className="text-[var(--red)]">Builds & Guides</span>
        </h1>
        <p className="text-[var(--muted)]">
          Expert strategy guides, build recommendations, and tier lists for Slay the Spire 2.
        </p>
      </section>

      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[var(--muted)] text-lg">No guides yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/${post.slug}`}
              className="block bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 hover:border-[var(--red)]/30 transition-all hover:shadow-lg hover:shadow-[var(--red)]/5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--red)]/10 text-[var(--red)] border border-[var(--red)]/20">
                      {post.category}
                    </span>
                    {post.date && (
                      <span className="text-xs text-[var(--muted)]">{post.date}</span>
                    )}
                  </div>
                  <h2 className="text-lg font-semibold text-white hover:text-[var(--red)] transition-colors truncate">
                    {post.title}
                  </h2>
                  {post.description && (
                    <p className="text-sm text-[var(--muted)] mt-1 line-clamp-2">{post.description}</p>
                  )}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-xs text-[var(--muted)]">#{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}