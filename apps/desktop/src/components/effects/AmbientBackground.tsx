import { useEffectiveReducedMotion } from '../../hooks/useEffectiveReducedMotion';

export function AmbientBackground() {
  const { reducedMotion } = useEffectiveReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[var(--bg-app)]"
    >
      {/* Top-center/right emerald aura */}
      <div
        className={`absolute -top-40 right-12 h-[540px] w-[540px] rounded-full blur-3xl ${
          reducedMotion ? '' : 'gcc-ambient-green'
        }`}
        style={{ background: 'var(--ambient-green)' }}
      />
      {/* Bottom-left deep crimson sidebar & corner glow */}
      <div
        className={`absolute -bottom-32 -left-24 h-[460px] w-[420px] rounded-full blur-3xl ${
          reducedMotion ? '' : 'gcc-ambient-red'
        }`}
        style={{ background: 'var(--ambient-red)' }}
      />
      {/* Bottom-right subtle emerald glow */}
      <div
        className="absolute -bottom-44 right-0 h-[420px] w-[420px] rounded-full blur-3xl opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(20, 90, 54, 0.25), transparent 70%)' }}
      />
    </div>
  );
}
