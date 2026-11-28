import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, Info, X } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';

export function NotificationLayer() {
  const { notifications, dismissNotification } = useUIStore();

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-9 right-3 z-50 flex w-[calc(100vw-1.5rem)] max-w-80 flex-col gap-2.5 sm:right-6"
    >
      <AnimatePresence>
        {notifications.map((item) => {
          const borderTone =
            item.tone === 'crimson'
              ? 'border-[#DC2638]/40'
              : item.tone === 'forest'
                ? 'border-[#20A66A]/40'
                : 'border-[#303A33]';

          const iconColor =
            item.tone === 'crimson'
              ? 'text-[#DC2638]'
              : item.tone === 'forest'
                ? 'text-[#20A66A]'
                : 'text-[#A2ADA6]';

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
              className={`pointer-events-auto flex items-start gap-3 rounded-xl border bg-[#121715]/95 p-3.5 shadow-[0_14px_32px_rgba(0,0,0,0.5)] backdrop-blur-md ${borderTone}`}
            >
              <span className={`mt-0.5 shrink-0 ${iconColor}`}>
                {item.tone === 'forest' ? <CheckCircle2 size={17} /> : <Info size={17} />}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-[#EEF2EF]">{item.title}</div>
                <div className="mt-0.5 text-xs leading-snug text-[#9AA59E]">{item.message}</div>
              </div>
              <button
                type="button"
                onClick={() => dismissNotification(item.id)}
                aria-label="Dismiss notification"
                className="shrink-0 rounded p-0.5 text-[#9AA59E] transition-colors hover:text-[#EEF2EF]"
              >
                <X size={14} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
