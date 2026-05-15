import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';
import type { Metadata } from 'next';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Not Found' };
  return {
    title: post.title,
    description: post.description,
    openGraph: post.image ? { images: [post.image] } : undefined,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const processed = await remark().use(html).process(post.content);
  const htmlContent = processed.toString();

  return (
    <article className="max-w-3xl mx-auto">
      <Link href="/" className="text-sm text-[var(--red)] hover:underline mb-4 inline-block">
        ← Back to Guides
      </Link>

      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full rounded-xl mb-6 max-h-80 object-cover"
        />
      )}

      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--red)]/10 text-[var(--red)] border border-[var(--red)]/20">
          {post.category}
        </span>
        {post.date && (
          <span className="text-xs text-[var(--muted)]">{post.date}</span>
        )}
      </div>

      <h1 className="text-3xl font-bold text-white mb-2">{post.title}</h1>

      {post.description && (
        <p className="text-[var(--muted)] mb-6">{post.description}</p>
      )}

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-8">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-md bg-[rgba(255,255,255,0.04)] text-[var(--muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
}