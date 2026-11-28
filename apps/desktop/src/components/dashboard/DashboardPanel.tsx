import { Activity, Clock, Download, Layers } from 'lucide-react';
import { PlaceholderPanel } from '../common/PlaceholderPanel';

export function DashboardPanel() {
  return (
    <section aria-labelledby="dashboard-modules-heading" className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 id="dashboard-modules-heading" className="font-display text-lg font-semibold text-[#E9EFEB]">
          Dashboard Modules
        </h2>
        <span className="font-mono text-[11px] uppercase tracking-wider text-[#626B65]">
          Foundation Placeholders
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <PlaceholderPanel
          title="Recently Accessed"
          description="No recent sessions recorded. Library history will appear after game launching is implemented."
          status="Coming soon"
          icon={<Clock size={18} />}
        />
        <PlaceholderPanel
          title="Activity"
          description="Session activity and achievements feed is reserved for a future release."
          status="Coming soon"
          icon={<Activity size={18} />}
        />
        <PlaceholderPanel
          title="Downloads"
          description="No active downloads. Download queue management is not implemented in v0.0.01."
          status="Coming soon"
          icon={<Download size={18} />}
        />
      </div>

      <div className="flex items-center justify-between rounded-[14px] border border-dashed border-[#303A33] bg-[#1C2420]/40 px-5 py-3.5 text-xs text-[#A2ADA6]">
        <div className="flex items-center gap-2.5">
          <Layers size={15} className="text-[#20A66A]" />
          <span>
            GCC v0.0.01 displays placeholder modules only. No hardware telemetry, background scanning, or network services are running.
          </span>
        </div>
        <span className="hidden font-mono text-[10px] uppercase tracking-wider text-[#DC2638] sm:inline">
          v0.0.01 SHELL
        </span>
      </div>
    </section>
  );
}
