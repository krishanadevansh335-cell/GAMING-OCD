import React from 'react';
import { Play, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { useGameStore } from '../../stores/useGameStore';

export const HomePage: React.FC = () => {
  const { games, launchCurrentGame } = useGameStore();
  const heroGame = games[0];

  return (
    <div className="p-8 space-y-8">
      {/* Hero Banner */}
      {heroGame && (
        <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900/40 p-8 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent z-10" />
          
          <div className="relative z-20 max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Featured Title
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white">{heroGame.title}</h1>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Ready to launch via {heroGame.platform}. Optimized performance profile applied automatically.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <button 
                onClick={() => launchCurrentGame(heroGame.id)}
                className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold rounded-xl transition shadow-lg shadow-cyan-500/20 active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                Launch Game
              </button>

              <div className="flex items-center gap-2 text-xs text-neutral-400 bg-neutral-900/80 px-3 py-2 rounded-lg border border-neutral-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Anti-Cheat Verified</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/40">
          <div className="flex items-center gap-3 text-cyan-400 mb-2">
            <Zap className="w-5 h-5" />
            <h3 className="font-semibold text-sm text-neutral-200">OS Handoff Target</h3>
          </div>
          <p className="text-2xl font-bold text-neutral-100">Bazzite Linux</p>
          <p className="text-xs text-neutral-400 mt-1">Boot priority configured for next restart</p>
        </div>

        <div className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/40">
          <div className="flex items-center gap-3 text-emerald-400 mb-2">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="font-semibold text-sm text-neutral-200">Compatibility Index</h3>
          </div>
          <p className="text-2xl font-bold text-neutral-100">98% Verified</p>
          <p className="text-xs text-neutral-400 mt-1">Steam Proton & Windows Native</p>
        </div>

        <div className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/40">
          <div className="flex items-center gap-3 text-purple-400 mb-2">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-semibold text-sm text-neutral-200">Game Mode State</h3>
          </div>
          <p className="text-2xl font-bold text-neutral-100">Ultra Priority</p>
          <p className="text-xs text-neutral-400 mt-1">Background apps throttled, GPU boosted</p>
        </div>
      </div>
    </div>
  );
};
