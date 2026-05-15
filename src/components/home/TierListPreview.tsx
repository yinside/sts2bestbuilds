'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Crown, Star, Award } from 'lucide-react';

const TIERS = [
  {
    rank: 'S',
    color: '#f59e0b',
    icon: Crown,
    items: [
      { name: 'Ironclad Perfected Strike', description: 'Highest winrate build. Stack Strikes, scale hard.' },
      { name: 'Silent Shiv Spam', description: 'Infinite shiv generation with Accuracies.' },
    ],
  },
  {
    rank: 'A',
    color: '#ef4444',
    icon: Star,
    items: [
      { name: 'Defect Frost Orb Build', description: 'Defensive scaling with Blizzard finisher.' },
      { name: 'Watcher Divinity Rush', description: 'Fast divinity stance cycling.' },
    ],
  },
  {
    rank: 'B',
    color: '#f97316',
    icon: Award,
    items: [
      { name: 'Ironclad Fire Breathing', description: 'Status card synergy build.' },
      { name: 'Silent Poison Stacking', description: 'Catalyst + Noxious Fumes combo.' },
    ],
  },
];

export default function TierListPreview() {
  return (
    <section className="py-16 md:py-20 bg-[var(--bg-elevated)]">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Meta <span className="text-accent-light">Tier List</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            Current meta rankings based on Ascension 20 win rates, community data, and pro player analysis.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.rank}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="card-premium p-5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg"
                  style={{ background: `${tier.color}20`, color: tier.color }}
                >
                  {tier.rank}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{tier.rank} Tier</div>
                  <div className="text-xs text-[var(--text-muted)]">Top builds</div>
                </div>
              </div>
              <ul className="space-y-3">
                {tier.items.map((item) => (
                  <li key={item.name} className="text-sm">
                    <div className="font-medium text-white">{item.name}</div>
                    <div className="text-xs text-[var(--text-muted)] mt-0.5">{item.description}</div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/tier-lists" className="btn-secondary text-sm">
            View Full Tier List
          </Link>
        </div>
      </div>
    </section>
  );
}