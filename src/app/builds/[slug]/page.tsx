import { getPostBySlug, getPostsByType, getRelatedPosts, estimateReadingTime, extractHeadings } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar, Tag, ArrowLeft, ChevronRight } from 'lucide-react';
import ReadingProgress from '@/components/article/ReadingProgress';
import TableOfContents from '@/components/article/TableOfContents';
import ArticleActions from '@/components/article/ArticleActions';
import type { Metadata } from 'next';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return getPostsByType('build').map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Not Found' };
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      images: post.image ? [post.image] : undefined,
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description },
  };
}

export default async function BuildPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || post.type !== 'build') notFound();

  const processed = await remark().use(html).process(post.content);
  const htmlContent = processed.toString();
  const readingTime = estimateReadingTime(post.content);
  const headings = extractHeadings(post.content);
  const related = getRelatedPosts(post, 3);

  return (
    <>
      <ReadingProgress />

      <article>
        <div className="bg-[var(--bg-elevated)] border-b border-[var(--border)]">
          <div className="container-site py-10 md:py-14">
            <Link href="/builds" className="inline-flex items-center gap-1 text-sm text-[var(--text-muted)] hover:text-white transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to Builds
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs uppercase tracking-wider font-bold px-2.5 py-1 rounded-md bg-accent/10 text-accent-light border border-accent/20">
                {post.category}
              </span>
              <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {readingTime} min read
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              {post.title}
            </h1>

            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mb-6">
              {post.description}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <ArticleActions title={post.title} slug={post.slug} />
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-md bg-[rgba(255,255,255,0.04)] text-[var(--text-muted)] hover:text-white transition-colors">
                      <Tag className="w-3 h-3 inline mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container-site py-10">
          <div className="flex gap-10">
            <aside className="hidden lg:block w-56 shrink-0">
              <TableOfContents headings={headings} />
            </aside>

            <div className="flex-1 min-w-0 max-w-3xl">
              <div className="markdown-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />

              <div className="mt-12 pt-8 border-t border-[var(--border)]">
                <h3 className="text-lg font-semibold text-white mb-5">Related Builds</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/builds/${r.slug}`}
                      className="card-premium p-4 group"
                    >
                      <span className="text-[10px] uppercase tracking-wider font-bold text-accent-light mb-2 block">
                        {r.category}
                      </span>
                      <h4 className="text-sm font-semibold text-white group-hover:text-accent-light transition-colors line-clamp-2 mb-1">
                        {r.title}
                      </h4>
                      <p className="text-xs text-[var(--text-muted)] line-clamp-2">{r.description}</p>
                    </Link>
                  ))}
                </div>
                {related.length === 0 && (
                  <p className="text-sm text-[var(--text-muted)]">More builds coming soon.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}