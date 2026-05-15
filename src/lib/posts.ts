import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  tags: string[];
  image?: string;
  type: 'build' | 'guide' | 'relic' | 'boss' | 'tier-list' | 'general';
}

export interface Post extends PostMeta {
  content: string;
}

export interface TierEntry {
  name: string;
  rank: 'S' | 'A' | 'B' | 'C';
  description: string;
}

function mapCategory(cat: string): PostMeta['type'] {
  const m: Record<string, PostMeta['type']> = {
    'build-guide': 'build',
    'relic-guide': 'relic',
    'tier-list': 'tier-list',
    'beginner-guide': 'guide',
    'boss-guide': 'boss',
    'strategy': 'guide',
  };
  return m[cat] || 'general';
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(contentDir)) return [];
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md'));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(contentDir, file), 'utf-8');
      const { data } = matter(raw);
      return {
        slug: file.replace('.md', ''),
        title: data.title || file.replace('.md', ''),
        description: data.description || '',
        category: data.category || 'general',
        date: data.date || '',
        tags: data.tags || [],
        image: data.image || null,
        type: mapCategory(data.category || ''),
      } as PostMeta;
    })
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(contentDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title || slug,
    description: data.description || '',
    category: data.category || 'general',
    date: data.date || '',
    tags: data.tags || [],
    image: data.image || null,
    type: mapCategory(data.category || ''),
    content,
  };
}

export function getPostsByType(type: PostMeta['type']): PostMeta[] {
  return getAllPosts().filter((p) => p.type === type);
}

export function getFeaturedPosts(): PostMeta[] {
  return getAllPosts().filter((p) => p.type === 'build').slice(0, 6);
}

export function getLatestPosts(count = 6): PostMeta[] {
  return getAllPosts().slice(0, count);
}

export function getRelatedPosts(current: PostMeta, count = 3): PostMeta[] {
  const all = getAllPosts().filter((p) => p.slug !== current.slug);
  const scored = all.map((p) => {
    let score = 0;
    if (p.type === current.type) score += 3;
    current.tags.forEach((t) => { if (p.tags.includes(t)) score += 2; });
    return { post: p, score };
  });
  return scored.sort((a, b) => b.score - a.score).slice(0, count).map((e) => e.post);
}

export function getAllTags(): { name: string; count: number }[] {
  const tagMap = new Map<string, number>();
  getAllPosts().forEach((p) => {
    p.tags.forEach((t) => { tagMap.set(t, (tagMap.get(t) || 0) + 1); });
  });
  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function searchPosts(query: string): PostMeta[] {
  const q = query.toLowerCase();
  return getAllPosts().filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q)
  );
}

export function estimateReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function extractHeadings(content: string): { level: number; text: string; id: string }[] {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const headings: { level: number; text: string; id: string }[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[2].trim();
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    headings.push({ level: match[1].length, text, id });
  }
  return headings;
}