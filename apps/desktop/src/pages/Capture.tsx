import { motion } from 'motion/react';
import { Layers, Mic, Play, RotateCcw, Video } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/common/Button';
import { useUIStore } from '../store/useUIStore';
import { useEffectiveReducedMotion } from '../hooks/useEffectiveReducedMotion';

const CAPTURE_SETTINGS_PLACEHOLDERS = [
  { label: 'Record Gameplay', status: '(Not implemented)', icon: Video },
  { label: 'Instant Replay', status: '(Coming Soon)', icon: RotateCcw },
  { label: 'Microphone', status: '(Coming Soon)', icon: Mic },
  { label: 'Overlay', status: '(Coming Soon)', icon: Layers },
];

export function CapturePage() {
  const openModal = useUIStore((s) => s.openModal);
  const { reducedMotion } = useEffectiveReducedMotion();

  return (
    <PageContainer
      title="Capture"
      subtitle="Record, capture and manage your gameplay (coming soon)."
    >
      <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-[1.65fr_1fr] lg:gap-5">
        {/* Main capture preview card */}
        <div
          className="flex min-h-[clamp(240px,42vh,500px)] flex-col items-center justify-center rounded-[18px] border border-[#242D28] bg-[#0B0E0D] p-6 text-center shadow-[0_14px_40px_rgba(0,0,0,0.45)] sm:p-8"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 42%, rgba(32, 166, 106, 0.14), transparent 58%)',
          }}
        >
          <motion.div
            animate={reducedMotion ? undefined : { scale: [1, 1.03, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-5 flex h-18 w-24 items-center justify-center rounded-2xl border-2 border-[#25C47A] bg-[#0E2419]/50 py-4 text-[#25C47A] shadow-[0_0_28px_rgba(37,196,122,0.38)] sm:mb-6 sm:h-20 sm:w-28"
          >
            <Play size={28} strokeWidth={2} className="ml-0.5" />
          </motion.div>

          <h2 className="font-display text-[clamp(1.2rem,2vw,1.6rem)] font-bold text-[#EEF2EF]">
            Capture is not available yet
          </h2>
          <p className="mt-2 max-w-md text-xs leading-relaxed text-[#9AA59E] sm:text-sm">
            Gameplay recording, instant replay and screenshots will be added in a future release.
          </p>

          <div className="mt-5 sm:mt-6">
            <Button
              variant="crimson"
              size="md"
              onClick={() =>
                openModal('placeholder-info', {
                  title: 'Capture & Recording',
                  description:
                    'Screen capture, instant replay, and screenshot galleries are not active in GCC v0.0.01.',
                })
              }
            >
              Coming Soon
            </Button>
          </div>
        </div>

        {/* Unified Capture Settings card */}
        <div className="flex flex-col rounded-[18px] border border-[#242D28] bg-[#101513]/90 p-5">
          <h3 className="pb-3 font-display text-base font-semibold text-[#EEF2EF]">
            Capture Settings
          </h3>

          <div className="flex flex-1 flex-col divide-y divide-[#242D28]">
            {CAPTURE_SETTINGS_PLACEHOLDERS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex flex-1 items-center justify-between gap-3 py-3 opacity-80"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <Icon size={18} className="shrink-0 text-[#EEF2EF]/80" />
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium text-[#EEF2EF]">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-[#9AA59E]">{item.status}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={false}
                    aria-label={`${item.label} (disabled)`}
                    disabled
                    className="relative h-5 w-9 shrink-0 cursor-not-allowed rounded-full border border-[#303A33] bg-[#1C2420]"
                  >
                    <span className="block h-3.5 w-3.5 translate-x-0.5 rounded-full bg-[#9AA59E]" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
