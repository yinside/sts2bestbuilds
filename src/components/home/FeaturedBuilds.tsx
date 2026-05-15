'use client';

import { motion } from 'framer-motion';
import BuildCard from './BuildCard';
import type { PostMeta } from '@/lib/posts';

export default function FeaturedBuilds({ builds }: { builds: PostMeta[] }) {
  if (builds.length === 0) return null;

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
            Featured <span className="text-accent-light">Builds</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            Hand-picked meta builds with detailed card choices, relic synergies, and boss matchup analysis.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {builds.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <BuildCard post={post} featured={i === 0} />
            </motion.div>
          ))}
        </div>

        {builds.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[var(--text-muted)]">No builds published yet. Check back soon.</p>
          </div>
        )}
      </div>
    </section>
  );
}