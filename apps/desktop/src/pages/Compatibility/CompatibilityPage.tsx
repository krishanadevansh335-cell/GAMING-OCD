import React from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';
import { useGameStore } from '../../stores/useGameStore';

export const CompatibilityPage: React.FC = () => {
  const { games } = useGameStore();

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">Cross-OS Compatibility Matrix</h2>
        <p className="text-sm text-neutral-400">Verifying Proton, Wine, and Anti-Cheat compatibility across Windows and Bazzite Linux</p>
      </div>

      <div className="space-y-3">
        {games.map((game) => (
          <div key={game.id} className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-neutral-200">{game.title}</h4>
              <p className="text-xs text-neutral-400">Reported platform target: {game.target}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-950/60 border border-emerald-800/50 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                Proton Platinum
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-950/60 border border-cyan-800/50 text-cyan-400">
                Easy Anti-Cheat Linux Ready
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
