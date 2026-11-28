import { motion } from 'motion/react';
import { ArrowRight, Compass, Download, Gamepad2, Users } from 'lucide-react';
import type { PageId } from '../../app/router';
import { useEffectiveReducedMotion } from '../../hooks/useEffectiveReducedMotion';

interface LibraryPreviewProps {
  onNavigate: (page: PageId) => void;
}

const QUICK_ACCESS_CARDS: {
  id: PageId;
  title: string;
  icon: typeof Gamepad2;
  iconColor: string;
  hoverBorder: string;
}[] = [
  {
    id: 'games',
    title: 'My Games',
    icon: Gamepad2,
    iconColor: 'text-[#25C47A] drop-shadow-[0_0_12px_rgba(37,196,122,0.45)]',
    hoverBorder: 'hover:border-[#25C47A]/55',
  },
  {
    id: 'discover',
    title: 'Discover',
    icon: Compass,
    iconColor: 'text-[#25C47A] drop-shadow-[0_0_12px_rgba(37,196,122,0.45)]',
    hoverBorder: 'hover:border-[#25C47A]/55',
  },
  {
    id: 'social',
    title: 'Social',
    icon: Users,
    iconColor: 'text-[#DC2638] drop-shadow-[0_0_12px_rgba(220,38,56,0.45)]',
    hoverBorder: 'hover:border-[#DC2638]/55',
  },
  {
    id: 'downloads',
    title: 'Downloads',
    icon: Download,
    iconColor: 'text-[#DC2638] drop-shadow-[0_0_12px_rgba(220,38,56,0.45)]',
    hoverBorder: 'hover:border-[#DC2638]/55',
  },
];

export function LibraryPreview({ onNavigate }: LibraryPreviewProps) {
  const { reducedMotion } = useEffectiveReducedMotion();

  return (
    <section aria-labelledby="quick-access-heading" className="mt-auto pt-2 sm:pt-4">
      <div className="mb-3 flex items-center justify-between gap-2 sm:mb-4">
        <div className="flex items-center gap-4 sm:gap-6">
          <h2 id="quick-access-heading" className="font-display text-base font-semibold text-[#EEF2EF] sm:text-lg">
            Quick Access
          </h2>
          <div aria-hidden="true" className="hidden items-center gap-1.5 sm:flex">
            <span className="h-1.5 w-4 rounded-full bg-[#25C47A]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#DC2638]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#58615C]" />
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('games')}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#EEF2EF]/90 transition-colors hover:text-[#25C47A]"
        >
          <span>View All</span>
          <ArrowRight size={14} className="text-[#DC2638]" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {QUICK_ACCESS_CARDS.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.button
              key={card.id}
              type="button"
              onClick={() => onNavigate(card.id)}
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.14 + index * 0.06 }}
              whileHover={reducedMotion ? undefined : { y: -4, scale: 1.015 }}
              whileTap={reducedMotion ? undefined : { scale: 0.985 }}
              className={`group flex h-[clamp(96px,14vh,148px)] flex-col items-center justify-center gap-2.5 rounded-[14px] border border-[#242D28]/90 bg-[#0D1310]/78 p-4 text-center backdrop-blur-md transition-colors duration-200 hover:bg-[#121A16]/90 sm:gap-3 sm:p-5 ${card.hoverBorder}`}
            >
              <Icon
                size={28}
                strokeWidth={1.7}
                className={`transition-transform duration-200 group-hover:scale-110 ${card.iconColor}`}
              />
              <span className="font-display text-xs font-medium text-[#EEF2EF] sm:text-sm">
                {card.title}
              </span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
