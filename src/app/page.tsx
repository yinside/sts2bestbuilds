import { getFeaturedPosts, getLatestPosts } from '@/lib/posts';
import Hero from '@/components/home/Hero';
import FeaturedBuilds from '@/components/home/FeaturedBuilds';
import TierListPreview from '@/components/home/TierListPreview';
import LatestGuides from '@/components/home/LatestGuides';

export const dynamic = 'force-static';

export default function HomePage() {
  const featuredBuilds = getFeaturedPosts();
  const latestGuides = getLatestPosts(6);

  return (
    <>
      <Hero />
      <FeaturedBuilds builds={featuredBuilds} />
      <TierListPreview />
      <LatestGuides guides={latestGuides} />
    </>
  );
}