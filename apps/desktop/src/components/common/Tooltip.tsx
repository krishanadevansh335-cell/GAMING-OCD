import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface TooltipProps {
  content: string;
  enabled?: boolean;
  side?: 'right' | 'top' | 'bottom';
  children: ReactNode;
}

export function Tooltip({
  content,
  enabled = true,
  side = 'right',
  children,
}: TooltipProps) {
  const [open, setOpen] = useState(false);

  const posClass =
    side === 'right'
      ? 'left-full top-1/2 -translate-y-1/2 ml-3'
      : side === 'top'
        ? 'bottom-full left-1/2 -translate-x-1/2 mb-2'
        : 'top-full left-1/2 -translate-x-1/2 mt-2';

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => enabled && setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => enabled && setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      <AnimatePresence>
        {enabled && open && (
          <motion.div
            role="tooltip"
            initial={{ opacity: 0, x: side === 'right' ? -4 : 0, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.14, ease: [0.2, 0.8, 0.2, 1] }}
            className={`pointer-events-none absolute z-50 whitespace-nowrap rounded-lg border border-[#303A33] bg-[#1C2420] px-2.5 py-1.5 text-xs font-medium text-[#E9EFEB] shadow-[0_10px_24px_rgba(0,0,0,0.45)] ${posClass}`}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
