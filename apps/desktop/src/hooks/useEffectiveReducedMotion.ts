import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { usePreferencesStore } from '../store/usePreferencesStore';

/**
 * Returns whether animations should be reduced or paused.
 * Respects user preference, OS reduced-motion setting, and hidden/minimized window state.
 */
export function useEffectiveReducedMotion(): {
  reducedMotion: boolean;
  isWindowHidden: boolean;
} {
  const osReduced = useReducedMotion() ?? false;
  const reducedMotionMode = usePreferencesStore((s) => s.reducedMotionMode);
  const [isWindowHidden, setIsWindowHidden] = useState(
    typeof document !== 'undefined' ? document.hidden : false,
  );

  useEffect(() => {
    const handleVisibility = () => {
      setIsWindowHidden(document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const userReduced =
    reducedMotionMode === 'reduced'
      ? true
      : reducedMotionMode === 'full'
        ? false
        : osReduced;

  return {
    reducedMotion: userReduced || isWindowHidden,
    isWindowHidden,
  };
}
