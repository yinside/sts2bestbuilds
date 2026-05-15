import { getPostBySlug, getPostsByType, getRelatedPosts, estimateReadingTime, extractHeadings } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';
import { Clock, Calendar, ArrowLeft, Tag } from 'lucide-react';
import ReadingProgress from '@/components/article/ReadingProgress';
import TableOfContents from '@/components/article/TableOfContents';
import ArticleActions from '@/components/article/ArticleActions';
import type { Metadata } from 'next';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return getPostsByType('boss').map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Not Found' };
  return { title: post.title, description: post.description };
}

export default async function BossPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || post.type !== 'boss') notFound();

  const processed = await remark().use(html).process(post.content);
  const htmlContent = processed.toString();
  const readingTime = estimateReadingTime(post.content);
  const headings = extractHeadings(post.content);

  return (
    <>
      <ReadingProgress />
      <article>
        <div className="bg-[var(--bg-elevated)] border-b border-[var(--border)]">
          <div className="container-site py-10 md:py-14">
            <Link href="/bosses" className="inline-flex items-center gap-1 text-sm text-[var(--text-muted)] hover:text-white transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />Back to Bosses
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs uppercase tracking-wider font-bold px-2.5 py-1 rounded-md bg-accent/10 text-accent-light border border-accent/20">
                {post.category}
              </span>
              <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />{post.date}
              </span>
              <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />{readingTime} min read
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4">{post.title}</h1>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mb-6">{post.description}</p>
            <ArticleActions title={post.title} slug={post.slug} />
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-4">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 rounded-md bg-[rgba(255,255,255,0.04)] text-[var(--text-muted)]">
                    <Tag className="w-3 h-3 inline mr-1" />{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="container-site py-10">
          <div className="flex gap-10">
            <aside className="hidden lg:block w-56 shrink-0">
              <TableOfContents headings={headings} />
            </aside>
            <div className="flex-1 min-w-0 max-w-3xl">
              <div className="markdown-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}