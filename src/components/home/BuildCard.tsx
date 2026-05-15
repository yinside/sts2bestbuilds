import Link from 'next/link';
import Image from 'next/image';
import { Star, Clock, Zap } from 'lucide-react';
import type { PostMeta } from '@/lib/posts';

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'text-green-400',
  intermediate: 'text-yellow-400',
  advanced: 'text-red-400',
};

export default function BuildCard({ post, featured }: { post: PostMeta; featured?: boolean }) {
  return (
    <Link href={`/builds/${post.slug}`} className="block group">
      <article
        className={`card-premium overflow-hidden ${featured ? 'glow-border' : ''}`}
      >
        {post.image && (
          <div className="relative h-40 overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] to-transparent" />
          </div>
        )}

        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-accent/10 text-accent-light border border-accent/20">
              {post.category}
            </span>
            <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.date}
            </span>
          </div>

          <h3 className="font-semibold text-white group-hover:text-accent-light transition-colors line-clamp-2 mb-2">
            {post.title}
          </h3>

          <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-3 leading-relaxed">
            {post.description}
          </p>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-accent-light" />
              <span className="text-xs text-[var(--text-muted)]">Build Guide</span>
            </div>
            {post.tags.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap">
                {post.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.04)] text-[var(--text-muted)]">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}