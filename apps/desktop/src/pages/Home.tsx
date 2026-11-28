import { useState, type MouseEvent } from 'react';
import { motion } from 'motion/react';
import type { PageId } from '../app/router';
import { HeroSection } from '../components/dashboard/HeroSection';
import { LibraryPreview } from '../components/dashboard/LibraryPreview';
import { useEffectiveReducedMotion } from '../hooks/useEffectiveReducedMotion';
import heroForestImg from '../assets/hero-forest-crimson.jpg';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { reducedMotion } = useEffectiveReducedMotion();
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x: relX * -18, y: relY * -12 });
  };

  const handleMouseLeave = () => {
    setParallax({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-full w-full flex-col overflow-hidden"
    >
      {/* Full-bleed cinematic Forest Crimson backdrop */}
      <motion.div
        aria-hidden="true"
        animate={reducedMotion ? undefined : { x: parallax.x, y: parallax.y, scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 70, damping: 24 }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <img
          src={heroForestImg}
          alt=""
          className="h-full w-full object-cover object-[70%_center] opacity-95 sm:object-center"
        />
      </motion.div>

      {/* Seamless readability gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(7,9,8,0.92) 0%, rgba(7,9,8,0.68) 45%, rgba(7,9,8,0.12) 100%), linear-gradient(180deg, rgba(7,9,8,0.35) 0%, rgba(7,9,8,0.08) 45%, rgba(7,9,8,0.9) 100%)',
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1680px] flex-1 flex-col justify-between gap-4 px-4 py-5 sm:gap-6 sm:px-6 sm:py-6 md:px-8 xl:px-10 2xl:px-14">
        <HeroSection onNavigate={onNavigate} />
        <LibraryPreview onNavigate={onNavigate} />
      </div>
    </div>
  );
}
