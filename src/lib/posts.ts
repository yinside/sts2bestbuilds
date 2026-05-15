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
}

export interface Post extends PostMeta {
  content: string;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md'));

  const posts = files
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
      } as PostMeta;
    })
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  return posts;
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
    content,
  };
}