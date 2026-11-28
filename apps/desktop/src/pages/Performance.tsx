import { motion } from 'motion/react';
import { Cpu, HardDrive, MemoryStick, Rocket } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/common/Button';
import { useUIStore } from '../store/useUIStore';
import { useEffectiveReducedMotion } from '../hooks/useEffectiveReducedMotion';

const TELEMETRY_PLACEHOLDERS = [
  { id: 'cpu', label: 'CPU', icon: Cpu },
  { id: 'gpu', label: 'GPU', icon: HardDrive },
  { id: 'ram', label: 'RAM', icon: MemoryStick },
];

export function PerformancePage() {
  const openModal = useUIStore((s) => s.openModal);
  const { reducedMotion } = useEffectiveReducedMotion();

  return (
    <PageContainer
      title="Performance"
      subtitle="Monitor and optimize your system for gaming (coming soon)."
    >
      {/* 3-column metric placeholder cards */}
      <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-3">
        {TELEMETRY_PLACEHOLDERS.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.id}
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, delay: idx * 0.06 }}
              className="flex flex-col rounded-[16px] border border-[#242D28] bg-[#101513]/90 p-4 sm:p-5"
            >
              <div className="mb-3 flex items-center gap-3 sm:mb-4">
                <Icon
                  size={22}
                  strokeWidth={1.8}
                  className="shrink-0 text-[#DC2638] drop-shadow-[0_0_10px_rgba(220,38,56,0.4)]"
                />
                <div className="min-w-0">
                  <div className="font-display text-sm font-semibold text-[#EEF2EF] sm:text-base">
                    {metric.label}
                  </div>
                  <div className="text-xs text-[#9AA59E]">Not Available</div>
                </div>
              </div>

              {/* Fluid emerald-tinted grid box */}
              <div
                className="flex min-h-[clamp(110px,22vh,240px)] flex-1 flex-col items-center justify-center rounded-xl border border-[#20A66A]/20 bg-[#080C0A] p-3 text-center"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgba(32,166,106,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(32,166,106,0.14) 1px, transparent 1px)',
                  backgroundSize: '26px 26px',
                }}
              >
                <span className="text-xs font-medium text-[#EEF2EF]/85">Data not available</span>
                <span className="mt-0.5 text-[11px] text-[#9AA59E]">(Coming soon)</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom notice banner */}
      <div className="flex flex-col items-start justify-between gap-4 rounded-[16px] border border-[#242D28] bg-[#101513]/90 p-5 sm:flex-row sm:items-center sm:p-6">
        <div className="flex items-center gap-4 sm:gap-5">
          <Rocket
            size={32}
            strokeWidth={1.7}
            className="shrink-0 text-[#DC2638] drop-shadow-[0_0_14px_rgba(220,38,56,0.45)]"
          />
          <div>
            <h2 className="font-display text-sm font-semibold text-[#EEF2EF] sm:text-base">
              Performance tools are not available in v0.0.01
            </h2>
            <p className="mt-1 text-xs text-[#9AA59E]">
              System monitoring, optimization and tuning will be added in a future release.
            </p>
          </div>
        </div>
        <Button
          variant="crimson"
          size="md"
          onClick={() =>
            openModal('placeholder-info', {
              title: 'Performance & Telemetry',
              description:
                'CPU, GPU, RAM telemetry, process management, and Windows optimization are intentionally disabled in GCC v0.0.01.',
            })
          }
        >
          Coming Soon
        </Button>
      </div>
    </PageContainer>
  );
}
