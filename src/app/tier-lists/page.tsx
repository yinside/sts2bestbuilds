import { Crown, Star, Award, Zap, TrendingUp } from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Tier Lists - Slay the Spire 2 Meta Rankings',
  description: 'Current Slay the Spire 2 meta tier list. S, A, B tier rankings based on Ascension 20 win rates and community data.',
};

const TIERS = [
  {
    rank: 'S Tier',
    color: '#f59e0b',
    icon: Crown,
    description: 'Dominant meta builds with the highest A20 win rates.',
    builds: [
      { name: 'Ironclad Perfected Strike', winrate: '68%', difficulty: 'Medium' },
      { name: 'Silent Shiv Spam', winrate: '65%', difficulty: 'Easy' },
      { name: 'Defect Power Spam', winrate: '62%', difficulty: 'Hard' },
    ],
  },
  {
    rank: 'A Tier',
    color: '#ef4444',
    icon: Star,
    description: 'Strong builds that consistently win A20 runs.',
    builds: [
      { name: 'Watcher Divinity Rush', winrate: '58%', difficulty: 'Hard' },
      { name: 'Ironclad Barricade Build', winrate: '56%', difficulty: 'Medium' },
      { name: 'Silent Poison Stacking', winrate: '55%', difficulty: 'Medium' },
    ],
  },
  {
    rank: 'B Tier',
    color: '#f97316',
    icon: Award,
    description: 'Viable builds that can win with the right relics.',
    builds: [
      { name: 'Ironclad Fire Breathing', winrate: '48%', difficulty: 'Easy' },
      { name: 'Defect Claw Build', winrate: '45%', difficulty: 'Easy' },
      { name: 'Watcher Pressure Points', winrate: '42%', difficulty: 'Hard' },
    ],
  },
  {
    rank: 'C Tier',
    color: '#a1a1aa',
    icon: Zap,
    description: 'Niche builds requiring specific relic combinations.',
    builds: [
      { name: 'Silent Discard Synergy', winrate: '35%', difficulty: 'Hard' },
      { name: 'Defect Blizzard Build', winrate: '32%', difficulty: 'Medium' },
    ],
  },
];

export default function TierListsPage() {
  return (
    <div className="container-site py-12 md:py-16">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-accent/10">
            <TrendingUp className="w-5 h-5 text-accent-light" />
          </div>
          <span className="text-sm text-accent-light font-medium">Ascension 20 Meta</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">
          Meta <span className="text-accent-light">Tier List</span>
        </h1>
        <p className="text-[var(--text-secondary)] max-w-2xl">
          Current Slay the Spire 2 meta rankings based on A20 win rate data, community consensus, and pro player analysis. Updated regularly.
        </p>
      </div>

      <div className="space-y-8">
        {TIERS.map((tier, i) => (
          <div key={tier.rank} className="card-premium overflow-hidden">
            <div className="flex items-center gap-3 p-5 border-b border-[var(--border)]">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold shrink-0"
                style={{ background: `${tier.color}15`, color: tier.color }}
              >
                <tier.icon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{tier.rank}</h2>
                <p className="text-xs text-[var(--text-muted)]">{tier.description}</p>
              </div>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {tier.builds.map((build, j) => (
                <div key={build.name} className="flex items-center justify-between p-4 hover:bg-[var(--bg-hover)] transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold" style={{ color: tier.color, opacity: 0.5 }}>
                      {j + 1}
                    </span>
                    <div>
                      <div className="font-semibold text-white">{build.name}</div>
                      <div className="text-xs text-[var(--text-muted)]">Difficulty: {build.difficulty}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold" style={{ color: tier.color }}>
                      {build.winrate}
                    </div>
                    <div className="text-[10px] uppercase text-[var(--text-muted)]">Win Rate</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}