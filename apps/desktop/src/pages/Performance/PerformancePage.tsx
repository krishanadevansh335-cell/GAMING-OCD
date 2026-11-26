import React, { useState } from 'react';

export const PerformancePage: React.FC = () => {
  const [profile, setProfile] = useState<'Eco' | 'Balanced' | 'Performance' | 'Turbo'>('Performance');

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">Performance & Game Mode</h2>
        <p className="text-sm text-neutral-400">Configure power limits, process priorities, and GPU boost behavior</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {(['Eco', 'Balanced', 'Performance', 'Turbo'] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setProfile(mode)}
            className={`p-5 rounded-xl border text-left transition ${
              profile === mode
                ? 'border-cyan-500 bg-cyan-500/10 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                : 'border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700'
            }`}
          >
            <div className="font-bold text-lg mb-1">{mode}</div>
            <p className="text-xs text-neutral-400">
              {mode === 'Turbo' ? 'Max TDP & GPU Overclock' : mode === 'Performance' ? 'High clocks & frame pacing' : 'Power efficient'}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
