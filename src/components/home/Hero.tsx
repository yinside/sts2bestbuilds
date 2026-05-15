'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sword, TrendingUp, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/3 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(185,28,28,0.03)_0%,transparent_70%)]" />
      </div>

      <div className="container-site relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent-light text-sm font-medium mb-6"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Slay the Spire 2 Strategy Platform
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
            Best Slay the Spire 2{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light via-red-400 to-accent">
              Builds &amp; Strategy
            </span>{' '}
            Guides
          </h1>

          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
            Meta builds, relic synergies, boss strategies, and advanced deck optimization.
            Master every character with pro-level analysis.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/builds" className="btn-primary group text-base px-8 py-3.5">
              <Sword className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Explore Builds
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/tier-lists" className="btn-secondary text-base px-8 py-3.5">
              View Tier Lists
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto"
        >
          {[
            { label: 'Builds', value: '10+' },
            { label: 'Guides', value: '25+' },
            { label: 'Categories', value: '6' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-[var(--text-muted)] mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}