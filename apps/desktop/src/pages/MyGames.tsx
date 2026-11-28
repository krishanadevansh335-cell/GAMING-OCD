import { useState } from 'react';
import { motion } from 'motion/react';
import { Gamepad2, LayoutGrid, List, Search } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/common/Button';
import { useUIStore } from '../store/useUIStore';
import { useEffectiveReducedMotion } from '../hooks/useEffectiveReducedMotion';
import waveBackdropImg from '../assets/wave-forest-crimson.jpg';

export function MyGamesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const openModal = useUIStore((s) => s.openModal);
  const { reducedMotion } = useEffectiveReducedMotion();

  return (
    <PageContainer
      title="My Games"
      subtitle="Your game library will appear here."
      backdrop={
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <img
            src={waveBackdropImg}
            alt=""
            className="h-full w-full object-cover object-bottom opacity-90"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(7,9,8,0.94) 0%, rgba(7,9,8,0.6) 45%, rgba(7,9,8,0.15) 100%)',
            }}
          />
        </div>
      }
    >
      {/* Fluid filter & search placeholder bar */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
        <div className="flex w-full min-w-0 items-center gap-2.5 rounded-[10px] border border-[#242D28] bg-[#101513]/85 px-3.5 py-2 text-xs text-[#58615C] backdrop-blur-sm sm:flex-1 sm:max-w-md">
          <Search size={15} className="shrink-0 text-[#9AA59E]" />
          <input
            type="text"
            disabled
            aria-label="Search in library placeholder"
            placeholder="Search in library..."
            className="min-w-0 w-full cursor-not-allowed bg-transparent text-xs text-[#9AA59E] placeholder:text-[#58615C] focus:outline-none"
          />
        </div>

        <div className="flex flex-1 flex-wrap items-center gap-2 sm:flex-initial">
          <select
            disabled
            aria-label="Filter games placeholder"
            defaultValue="all"
            className="h-9 cursor-not-allowed rounded-[10px] border border-[#242D28] bg-[#101513]/85 px-3 text-xs text-[#EEF2EF]/80 backdrop-blur-sm"
          >
            <option value="all">All Games</option>
          </select>

          <select
            disabled
            aria-label="Sort games placeholder"
            defaultValue="az"
            className="h-9 cursor-not-allowed rounded-[10px] border border-[#242D28] bg-[#101513]/85 px-3 text-xs text-[#EEF2EF]/80 backdrop-blur-sm"
          >
            <option value="az">Sort: A - Z</option>
          </select>
        </div>

        <div className="ml-auto flex items-center gap-1 rounded-[10px] border border-[#242D28] bg-[#101513]/85 p-0.5">
          <button
            type="button"
            aria-label="Grid view"
            onClick={() => setViewMode('grid')}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
              viewMode === 'grid'
                ? 'bg-gradient-to-b from-[#DC2638] to-[#941C2C] text-[#FFFFFF] shadow-[0_2px_10px_rgba(220,38,56,0.4)]'
                : 'text-[#9AA59E] hover:text-[#EEF2EF]'
            }`}
          >
            <LayoutGrid size={15} />
          </button>
          <button
            type="button"
            aria-label="List view"
            onClick={() => setViewMode('list')}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
              viewMode === 'list'
                ? 'bg-gradient-to-b from-[#DC2638] to-[#941C2C] text-[#FFFFFF] shadow-[0_2px_10px_rgba(220,38,56,0.4)]'
                : 'text-[#9AA59E] hover:text-[#EEF2EF]'
            }`}
          >
            <List size={15} />
          </button>
        </div>
      </div>

      {/* Centered empty state scaling fluidly */}
      <div className="flex flex-1 flex-col items-center justify-center py-6 text-center sm:py-10">
        <motion.div
          animate={reducedMotion ? undefined : { y: [0, -5, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="mb-4 text-[#25C47A] drop-shadow-[0_0_26px_rgba(37,196,122,0.55)] sm:mb-5"
        >
          <Gamepad2 size={58} strokeWidth={1.6} />
        </motion.div>

        <h2 className="font-display text-[clamp(1.25rem,2vw,1.65rem)] font-bold text-[#EEF2EF]">
          Your library is empty
        </h2>
        <p className="mt-2 max-w-md text-xs leading-relaxed text-[#9AA59E] sm:text-sm">
          Game detection and library management will be available in a future release.
        </p>

        <div className="mt-5 sm:mt-6">
          <Button
            variant="crimson"
            size="md"
            onClick={() =>
              openModal('placeholder-info', {
                title: 'Game Library & Launchers',
                description:
                  'Automatic game scanning, launcher integrations (Steam, Epic, EA, Ubisoft), and game launching are intentionally not implemented in GCC v0.0.01.',
              })
            }
          >
            Coming Soon
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
