import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface GameCardProps {
  title: string;
  subtitle?: string;
  badge?: string;
  icon: ReactNode;
  iconTone?: string;
  selected?: boolean;
  onClick?: () => void;
}

export function GameCard({
  title,
  subtitle,
  badge,
  icon,
  iconTone = 'border-[#20A66A]/30 bg-[#0E2419] text-[#20A66A]',
  selected = false,
  onClick,
}: GameCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
      className={`group flex flex-col justify-between rounded-[14px] border p-5 text-left transition-colors duration-200 ${
        selected
          ? 'border-[#20A66A] bg-[#0E2419]/85 shadow-[0_0_24px_rgba(32,166,106,0.2)]'
          : 'border-[#242D28] bg-[#121715]/85 hover:border-[#20A66A]/55 hover:bg-[#171E1B]'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-transform duration-200 group-hover:scale-105 ${iconTone}`}
        >
          {icon}
        </div>
        <ArrowRight
          size={16}
          className="text-[#58615C] transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[#20A66A]"
        />
      </div>

      <div className="mt-4">
        <h3 className="font-display text-[15px] font-semibold text-[#EEF2EF]">{title}</h3>
        {subtitle && (
          <p className="mt-1 text-xs leading-relaxed text-[#9AA59E]">{subtitle}</p>
        )}
      </div>

      {badge && (
        <div className="mt-3 border-t border-[#242D28]/80 pt-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#9AA59E]">
            {badge}
          </span>
        </div>
      )}
    </motion.button>
  );
}
