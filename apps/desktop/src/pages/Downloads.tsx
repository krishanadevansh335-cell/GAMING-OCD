import { motion } from 'motion/react';
import { Download } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/common/Button';
import { useUIStore } from '../store/useUIStore';
import { useEffectiveReducedMotion } from '../hooks/useEffectiveReducedMotion';
import waveBackdropImg from '../assets/wave-forest-crimson.jpg';

export function DownloadsPage() {
  const openModal = useUIStore((s) => s.openModal);
  const { reducedMotion } = useEffectiveReducedMotion();

  return (
    <PageContainer
      title="Downloads"
      subtitle="Manage your game and content downloads (coming soon)."
    >
      <div className="relative flex min-h-[clamp(240px,46vh,540px)] flex-1 flex-col items-center justify-center overflow-hidden rounded-[18px] border border-[#242D28] bg-[#080B0A] p-6 text-center shadow-[0_14px_40px_rgba(0,0,0,0.45)] sm:p-8">
        <img
          src={waveBackdropImg}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-bottom opacity-95"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(8,11,10,0.85) 0%, rgba(8,11,10,0.35) 55%, rgba(8,11,10,0.2) 100%)',
          }}
        />

        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            animate={reducedMotion ? undefined : { y: [0, -4, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-4 text-[#25C47A] drop-shadow-[0_0_24px_rgba(37,196,122,0.55)] sm:mb-5"
          >
            <Download size={58} strokeWidth={1.6} />
          </motion.div>

          <h2 className="font-display text-[clamp(1.25rem,2vw,1.65rem)] font-bold text-[#EEF2EF]">
            No downloads
          </h2>
          <p className="mt-2 max-w-md text-xs leading-relaxed text-[#9AA59E] sm:text-sm">
            Download management will be available in a future release.
          </p>

          <div className="mt-5 sm:mt-6">
            <Button
              variant="crimson"
              size="md"
              onClick={() =>
                openModal('placeholder-info', {
                  title: 'Downloads Manager',
                  description:
                    'Game and content download management is not implemented in GCC v0.0.01. No background transfers are active.',
                })
              }
            >
              Coming Soon
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
