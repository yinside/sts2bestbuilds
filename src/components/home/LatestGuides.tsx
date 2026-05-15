'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import type { PostMeta } from '@/lib/posts';

export default function LatestGuides({ guides }: { guides: PostMeta[] }) {
  return (
    <section className="py-16 md:py-20">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Latest <span className="text-accent-light">Guides</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            Beginner tips, advanced strategies, and boss tactics for every run.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {guides.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <Link href={`/${post.slug}`} className="block group">
                <article className="card-premium p-5 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 rounded-md bg-accent/10">
                      <BookOpen className="w-4 h-4 text-accent-light" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[var(--text-muted)]">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-accent-light transition-colors mb-2 flex-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-3">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-[var(--border)]">
                    <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="text-xs text-accent-light flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>

        {guides.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[var(--text-muted)]">No guides published yet. Check back soon.</p>
          </div>
        )}
      </div>
    </section>
  );
}