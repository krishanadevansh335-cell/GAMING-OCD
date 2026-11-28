import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { useEffectiveReducedMotion } from '../../hooks/useEffectiveReducedMotion';

interface PageTransitionProps {
  pageKey: string;
  children: ReactNode;
}

export function PageTransition({ pageKey, children }: PageTransitionProps) {
  const { reducedMotion } = useEffectiveReducedMotion();

  return (
    <motion.div
      key={pageKey}
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
      transition={{
        duration: reducedMotion ? 0 : 0.34,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      className="flex min-h-full flex-col"
    >
      {children}
    </motion.div>
  );
}
