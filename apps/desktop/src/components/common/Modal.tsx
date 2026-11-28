import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Info, ShieldAlert, X } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { Button } from './Button';

export function ModalLayer() {
  const { activeModal, modalPayload, closeModal } = useUIStore();

  useEffect(() => {
    if (!activeModal) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeModal, closeModal]);

  const isFoundation = activeModal === 'foundation-info';

  return (
    <AnimatePresence>
      {activeModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="gcc-modal-title"
        >
          <div
            className="absolute inset-0 bg-[#0A0D0C]/75 backdrop-blur-sm"
            onClick={closeModal}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.24, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative z-10 w-full max-w-lg rounded-[16px] border border-[#303A33] bg-[#1C2420] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.65)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                    isFoundation
                      ? 'border-[#20A66A]/35 bg-[#10291D] text-[#20A66A]'
                      : 'border-[#DC2638]/35 bg-[#941C2C]/25 text-[#DC2638]'
                  }`}
                >
                  {isFoundation ? <Info size={20} /> : <ShieldAlert size={20} />}
                </div>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#A2ADA6]">
                    {isFoundation ? 'GCC v0.0.01 · Foundation Release' : 'Feature Placeholder'}
                  </span>
                  <h2 id="gcc-modal-title" className="text-lg font-semibold text-[#E9EFEB]">
                    {modalPayload?.title ??
                      (isFoundation
                        ? 'Gaming Control Center Architecture'
                        : 'Not available in GCC 0.0.01')}
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close modal"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#A2ADA6] transition-colors hover:bg-[#111413] hover:text-[#E9EFEB]"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#A2ADA6]">
              <p>
                {modalPayload?.description ??
                  (isFoundation
                    ? 'GCC v0.0.01 establishes the Windows desktop application shell, Forest Crimson design system, modular Rust backend boundaries, and SQLite preferences foundation.'
                    : 'This capability is intentionally unimplemented in GCC v0.0.01. No game scanning, telemetry polling, or background system modification is active.')}
              </p>

              {isFoundation && (
                <div className="rounded-xl border border-[#303A33] bg-[#111413]/80 p-3.5 text-xs">
                  <div className="mb-2 font-mono text-[11px] uppercase tracking-wider text-[#20A66A]">
                    Included in v0.0.01
                  </div>
                  <ul className="space-y-1.5 text-[#A2ADA6]">
                    <li>• Collapsible Forest Crimson desktop shell &amp; 9 navigation views</li>
                    <li>• Local UI preferences (theme, sidebar behaviour, reduced motion)</li>
                    <li>• Modular Tauri 2 / Rust backend &amp; SQLite migration foundation</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-end gap-2.5">
              <Button variant="forest" size="sm" onClick={closeModal}>
                Understood
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
