import Link from 'next/link';
import { Sword } from 'lucide-react';

const FOOTER_LINKS: Record<string, { label: string; href: string; external?: boolean }[]> = {
  Builds: [
    { label: 'All Builds', href: '/builds' },
    { label: 'Tier Lists', href: '/tier-lists' },
    { label: 'Relic Guides', href: '/relics' },
  ],
  Strategy: [
    { label: 'Beginner Guides', href: '/guides' },
    { label: 'Boss Strategies', href: '/bosses' },
    { label: 'Search', href: '/search' },
  ],
  Connect: [
    { label: 'GitHub', href: 'https://github.com/yinside/sts2bestbuilds', external: true },
    { label: 'Sitemap', href: '/sitemap.xml' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[#090909]">
      <div className="container-site py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
                <Sword className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">
                STS2<span className="text-accent">Best</span>Builds
              </span>
            </Link>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Premium Slay the Spire 2 strategy guides, build recommendations, and meta analysis.
            </p>
          </div>
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--text-muted)] hover:text-white transition-colors"
                      {...(link.external ? { target: '_blank', rel: 'noopener' } : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} STS2BestBuilds. AI-powered strategy guides for Slay the Spire 2.
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Not affiliated with Mega Crit Games.
          </p>
        </div>
      </div>
    </footer>
  );
}