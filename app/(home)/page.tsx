import AgencyCTA from '@/components/agency-cta';
import FeaturesSection from '@/components/features';
import HeroSection from '@/components/hero';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <AgencyCTA />
    </div>
  );
}
