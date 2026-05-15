'use client';

import { useState } from 'react';
import { Copy, Check, Share2 } from 'lucide-react';

export default function ArticleActions({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);

  const url = `https://sts2bestbuilds.vercel.app/${slug}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title, url });
    } else {
      handleCopy();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-[rgba(255,255,255,0.04)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-white hover:border-[var(--border-hover)] transition-colors"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
      <button
        onClick={handleShare}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-[rgba(255,255,255,0.04)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-white hover:border-[var(--border-hover)] transition-colors"
      >
        <Share2 className="w-3.5 h-3.5" />
        Share
      </button>
    </div>
  );
}