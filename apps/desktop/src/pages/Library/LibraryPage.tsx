import React from 'react';
import { Play, CheckCircle2 } from 'lucide-react';
import { useGameStore } from '../../stores/useGameStore';

export const LibraryPage: React.FC = () => {
  const { games, launchCurrentGame } = useGameStore();

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Installed Library</h2>
          <p className="text-sm text-neutral-400">Synchronized from Steam and Heroic game stores</p>
        </div>
        <div className="text-xs font-medium text-neutral-400 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-lg">
          {games.length} titles discovered
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {games.map((game) => (
          <div 
            key={game.id}
            className="group relative rounded-xl border border-neutral-800 bg-neutral-900/50 p-5 hover:border-cyan-500/40 hover:bg-neutral-900 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded">
                  {game.platform}
                </span>
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {game.compatibility?.status ?? 'Ready'}
                </span>
              </div>
              <h3 className="font-bold text-base text-neutral-100 group-hover:text-cyan-300 transition-colors">
                {game.title}
              </h3>
              <p className="text-xs text-neutral-400 mt-1">Platform: {game.target}</p>
            </div>

            <div className="pt-5 mt-4 border-t border-neutral-800/60 flex items-center justify-between">
              <span className="text-xs text-neutral-500">Auto-tuned</span>
              <button
                onClick={() => launchCurrentGame(game.id)}
                className="flex items-center gap-1.5 px-4 py-2 bg-neutral-800 hover:bg-cyan-500 hover:text-neutral-950 text-neutral-200 text-xs font-semibold rounded-lg transition"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Play
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
