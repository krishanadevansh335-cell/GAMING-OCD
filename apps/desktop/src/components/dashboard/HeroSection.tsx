import { motion } from 'motion/react';
import { useEffectiveReducedMotion } from '../../hooks/useEffectiveReducedMotion';
import { useUIStore } from '../../store/useUIStore';
import { Button } from '../common/Button';
import type { PageId } from '../../app/router';

interface HeroSectionProps {
  onNavigate: (page: PageId) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const { reducedMotion } = useEffectiveReducedMotion();
  const openModal = useUIStore((s) => s.openModal);

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.48, ease: [0.2, 0.8, 0.2, 1] }}
      className="flex min-h-[clamp(190px,34vh,360px)] flex-col justify-center py-2 sm:py-4"
    >
      <div className="max-w-xl">
        <motion.span
          initial={reducedMotion ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 0.06 }}
          className="inline-flex items-center rounded-md bg-gradient-to-r from-[#DC2638] to-[#941C2C] px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wider text-[#FFFFFF] shadow-[0_4px_16px_rgba(220,38,56,0.35)] sm:px-3 sm:text-[11px]"
        >
          GCC v0.0.01
        </motion.span>

        <motion.h1
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-3 font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.06] tracking-tight text-[#EEF2EF] sm:mt-4"
        >
          Welcome to GCC
        </motion.h1>

        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16 }}
          className="mt-2.5 max-w-md text-[clamp(0.84rem,1.1vw,1rem)] leading-relaxed text-[#C2CCC6] sm:mt-3"
        >
          Your gaming control center. Manage, enhance and personalize your gaming experience.
        </motion.p>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.22 }}
          className="mt-5 flex flex-wrap items-center gap-3 sm:mt-7 sm:gap-3.5"
        >
          <Button
            variant="forest"
            size="lg"
            onClick={() => onNavigate('games')}
          >
            Explore (Preview)
          </Button>
          <Button
            variant="crimson-outline"
            size="lg"
            onClick={() => openModal('foundation-info')}
          >
            Learn More
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
