import { useEffect, type ReactNode } from 'react';
import { MotionConfig } from 'motion/react';
import { useEffectiveReducedMotion } from '../../hooks/useEffectiveReducedMotion';
import { usePreferencesStore } from '../../store/usePreferencesStore';

interface MotionProviderProps {
  children: ReactNode;
}

export function MotionProvider({ children }: MotionProviderProps) {
  const { reducedMotion } = useEffectiveReducedMotion();
  const theme = usePreferencesStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-reduced-motion', String(reducedMotion));
  }, [theme, reducedMotion]);

  return (
    <MotionConfig
      reducedMotion={reducedMotion ? 'always' : 'never'}
      transition={{ duration: 0.24, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </MotionConfig>
  );
}
