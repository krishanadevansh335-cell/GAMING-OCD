import { motion } from 'motion/react';
import { Box, Headphones, Layers, Sliders } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/common/Button';
import { useUIStore } from '../store/useUIStore';
import { useEffectiveReducedMotion } from '../hooks/useEffectiveReducedMotion';

const WAVEFORM_BARS = [
  8, 12, 18, 14, 24, 34, 22, 46, 32, 62, 42, 78, 52, 92, 66, 100, 66, 92, 52, 78, 42, 62, 32, 46,
  22, 34, 24, 14, 18, 12, 8,
];

const AUDIO_MODULES = [
  { title: 'Audio Device', status: '(Not implemented)', icon: Headphones },
  { title: 'Effects & EQ', status: '(Coming Soon)', icon: Sliders },
  { title: 'Spatial Audio', status: '(Coming Soon)', icon: Box },
  { title: 'Profiles', status: '(Coming Soon)', icon: Layers },
];

export function AudioStudioPage() {
  const openModal = useUIStore((s) => s.openModal);
  const { reducedMotion } = useEffectiveReducedMotion();

  return (
    <PageContainer
      title="Audio Studio"
      subtitle="Advanced audio tools and sound customization (coming soon)."
    >
      <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr] lg:gap-5">
        {/* Left main audio preview card */}
        <div
          className="relative flex min-h-[clamp(240px,42vh,500px)] flex-col items-center justify-center overflow-hidden rounded-[18px] border border-[#242D28] bg-[#0B0E0D] p-6 text-center shadow-[0_14px_40px_rgba(0,0,0,0.45)] sm:p-8"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 35%, rgba(220, 38, 56, 0.2), transparent 52%), radial-gradient(circle at 50% 96%, rgba(32, 166, 106, 0.16), transparent 48%)',
          }}
        >
          {/* Fluid crimson vertical waveform */}
          <div
            aria-hidden="true"
            className="mb-6 flex h-24 w-full max-w-sm items-center justify-center gap-[3px] px-2 sm:mb-8 sm:h-28 sm:gap-1.5"
          >
            {WAVEFORM_BARS.map((height, idx) => (
              <motion.span
                key={idx}
                animate={
                  reducedMotion
                    ? undefined
                    : { opacity: [0.68, 1, 0.68], scaleY: [0.94, 1.04, 0.94] }
                }
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  delay: idx * 0.05,
                  ease: 'easeInOut',
                }}
                className="min-w-[2px] flex-1 max-w-[4px] rounded-full"
                style={{
                  height: `${height}%`,
                  background: 'linear-gradient(180deg, #FF4B5C 0%, #DC2638 50%, #7B111E 100%)',
                  boxShadow: '0 0 10px rgba(220, 38, 56, 0.45)',
                }}
              />
            ))}
          </div>

          <h2 className="font-display text-[clamp(1.15rem,1.8vw,1.5rem)] font-bold text-[#EEF2EF]">
            Audio Studio is not available in v0.0.01
          </h2>
          <p className="mt-2 max-w-md text-xs leading-relaxed text-[#9AA59E] sm:text-sm">
            Audio enhancement, equalizer and other tools will be added in a future update.
          </p>

          <div className="mt-5 sm:mt-6">
            <Button
              variant="crimson"
              size="md"
              onClick={() =>
                openModal('placeholder-info', {
                  title: 'Audio Studio',
                  description:
                    'Audio device routing, EQ, and spatial sound processing are visual placeholders only in GCC v0.0.01. No audio stream is accessed.',
                })
              }
            >
              Coming Soon
            </Button>
          </div>
        </div>

        {/* Right 4 crimson-icon module cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:flex-col lg:justify-between">
          {AUDIO_MODULES.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <motion.div
                key={mod.title}
                initial={reducedMotion ? false : { opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                whileHover={reducedMotion ? undefined : { x: 3 }}
                className="flex flex-1 items-center gap-4 rounded-[14px] border border-[#242D28] bg-[#101513]/90 px-4 py-3.5 transition-colors hover:border-[#DC2638]/40 sm:px-5 sm:py-4"
              >
                <Icon
                  size={22}
                  strokeWidth={1.8}
                  className="shrink-0 text-[#DC2638] drop-shadow-[0_0_10px_rgba(220,38,56,0.45)]"
                />
                <div className="min-w-0">
                  <div className="font-display text-sm font-semibold text-[#EEF2EF] sm:text-[15px]">
                    {mod.title}
                  </div>
                  <div className="mt-0.5 text-xs text-[#9AA59E]">{mod.status}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </PageContainer>
  );
}
