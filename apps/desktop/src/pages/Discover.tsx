import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CalendarDays, ChevronLeft, ChevronRight, Gamepad2, Layers } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/common/Button';
import { useUIStore } from '../store/useUIStore';
import { useEffectiveReducedMotion } from '../hooks/useEffectiveReducedMotion';
import discoverValleyImg from '../assets/discover-valley.jpg';

const BANNER_SLIDES = [
  {
    title: 'Explore New Experiences',
    description: 'Game recommendations, news and more will be available soon.',
  },
  {
    title: 'Curated Collections (Preview)',
    description: 'Hand-picked genre spotlights and community favorites will arrive in a future release.',
  },
  {
    title: 'Seasonal Events & Updates',
    description: 'Major game updates and event timelines are reserved for future online integration.',
  },
];

const DISCOVER_COMING_SOON = [
  { title: 'Game Recommendations', subtitle: 'Coming soon', icon: Gamepad2 },
  { title: 'Curated Collections', subtitle: 'Coming soon', icon: Layers },
  { title: 'Events & Updates', subtitle: 'Coming soon', icon: CalendarDays },
];

export function DiscoverPage() {
  const [slideIndex, setSlideIndex] = useState(0);
  const openModal = useUIStore((s) => s.openModal);
  const { reducedMotion } = useEffectiveReducedMotion();

  const slide = BANNER_SLIDES[slideIndex];

  const showDiscoverInfo = () =>
    openModal('placeholder-info', {
      title: 'Discover & Recommendations',
      description:
        'Personalized recommendations, curated collections, and live event feeds require online catalog services and are not available in GCC v0.0.01.',
    });

  return (
    <PageContainer
      title="Discover"
      subtitle="Explore new games, features and content (coming soon)."
    >
      {/* Fluid cinematic discovery banner */}
      <div className="relative flex min-h-[clamp(190px,28vh,290px)] flex-col justify-center overflow-hidden rounded-[18px] border border-[#242D28] bg-[#0B0E0D] p-5 shadow-[0_18px_46px_rgba(0,0,0,0.5)] sm:p-8">
        <motion.div
          aria-hidden="true"
          animate={reducedMotion ? undefined : { scale: [1.03, 1.06, 1.03] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute inset-0"
        >
          <img
            src={discoverValleyImg}
            alt=""
            className="h-full w-full object-cover object-center opacity-90"
          />
        </motion.div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(8,11,10,0.94) 0%, rgba(8,11,10,0.78) 46%, rgba(8,11,10,0.18) 100%)',
          }}
        />

        <div className="relative z-10 max-w-lg pr-10 sm:pr-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={slideIndex}
              initial={reducedMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.24 }}
            >
              <h2 className="font-display text-[clamp(1.35rem,2.4vw,2rem)] font-bold text-[#EEF2EF]">
                {slide.title}
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-[#C2CCC6] sm:mt-2.5 sm:text-sm">
                {slide.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-5 sm:mt-6">
            <Button variant="crimson" size="md" onClick={showDiscoverInfo}>
              Coming Soon
            </Button>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 sm:bottom-5 sm:right-6">
          <button
            type="button"
            aria-label="Previous preview banner"
            onClick={() =>
              setSlideIndex((i) => (i - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length)
            }
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#242D28] bg-[#0B0E0D]/80 text-[#EEF2EF] backdrop-blur-sm transition-colors hover:border-[#20A66A]"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            type="button"
            aria-label="Next preview banner"
            onClick={() => setSlideIndex((i) => (i + 1) % BANNER_SLIDES.length)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#242D28] bg-[#0B0E0D]/80 text-[#EEF2EF] backdrop-blur-sm transition-colors hover:border-[#20A66A]"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-1.5" aria-label="Discovery banner indicators">
        {BANNER_SLIDES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Show preview slide ${idx + 1}`}
            onClick={() => setSlideIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-200 ${
              slideIndex === idx ? 'w-4 bg-[#DC2638]' : 'w-1.5 bg-[#58615C] hover:bg-[#9AA59E]'
            }`}
          />
        ))}
      </div>

      {/* Coming Soon responsive 3-card grid */}
      <div className="flex flex-1 flex-col justify-end space-y-3">
        <h3 className="font-display text-base font-semibold text-[#EEF2EF] sm:text-lg">
          Coming Soon
        </h3>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3 sm:gap-4">
          {DISCOVER_COMING_SOON.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32, delay: idx * 0.06 }}
                whileHover={reducedMotion ? undefined : { y: -3 }}
                className="flex flex-col items-center justify-center rounded-[14px] border border-[#242D28] bg-[#101513]/85 p-5 text-center transition-colors hover:border-[#DC2638]/45 sm:p-6"
              >
                <Icon
                  size={26}
                  strokeWidth={1.7}
                  className="mb-2.5 text-[#DC2638] drop-shadow-[0_0_12px_rgba(220,38,56,0.45)] sm:mb-3"
                />
                <div className="font-display text-sm font-semibold text-[#EEF2EF] sm:text-[15px]">
                  {item.title}
                </div>
                <div className="mt-1 text-xs text-[#9AA59E]">{item.subtitle}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </PageContainer>
  );
}
