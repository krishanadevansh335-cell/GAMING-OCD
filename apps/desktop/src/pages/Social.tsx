import { motion } from 'motion/react';
import { Users } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/common/Button';
import { useUIStore } from '../store/useUIStore';
import { useEffectiveReducedMotion } from '../hooks/useEffectiveReducedMotion';
import socialPineImg from '../assets/social-pine-mist.jpg';

export function SocialPage() {
  const openModal = useUIStore((s) => s.openModal);
  const { reducedMotion } = useEffectiveReducedMotion();

  return (
    <PageContainer
      title="Social"
      subtitle="Connect with friends and the GCC community (coming soon)."
    >
      <div className="relative flex min-h-[clamp(240px,46vh,540px)] flex-1 flex-col items-center justify-center overflow-hidden rounded-[18px] border border-[#242D28] bg-[#0B0F0D] p-6 text-center shadow-[0_14px_40px_rgba(0,0,0,0.45)] sm:p-8">
        <img
          src={socialPineImg}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-bottom opacity-90"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 44%, rgba(32, 166, 106, 0.14), rgba(8, 11, 10, 0.45) 75%)',
          }}
        />

        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            animate={reducedMotion ? undefined : { y: [0, -4, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-4 text-[#25C47A] drop-shadow-[0_0_24px_rgba(37,196,122,0.55)] sm:mb-5"
          >
            <Users size={56} strokeWidth={1.5} />
          </motion.div>

          <h2 className="font-display text-[clamp(1.25rem,2vw,1.65rem)] font-bold text-[#EEF2EF]">
            Community Coming Soon
          </h2>
          <p className="mt-2 max-w-md text-xs leading-relaxed text-[#9AA59E] sm:text-sm">
            Friends, chat, groups and more will be added in a future release.
          </p>

          <div className="mt-5 sm:mt-6">
            <Button
              variant="crimson"
              size="md"
              onClick={() =>
                openModal('placeholder-info', {
                  title: 'Social & Community',
                  description:
                    'User accounts, authentication, friends lists, and online social features are not available in GCC v0.0.01.',
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
