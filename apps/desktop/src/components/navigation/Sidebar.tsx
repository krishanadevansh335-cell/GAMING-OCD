import React from 'react';
import { 
  Gamepad2, 
  Library, 
  Flame, 
  Cpu, 
  Settings, 
  Repeat, 
  Volume2, 
  Radio
} from 'lucide-react';
import { useGameStore } from '../../stores/useGameStore';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab } = useGameStore();

  const navItems = [
    { id: 'home', label: 'Home', icon: Flame },
    { id: 'library', label: 'Library', icon: Library },
    { id: 'compatibility', label: 'Compatibility', icon: Gamepad2 },
    { id: 'performance', label: 'Performance', icon: Cpu },
    { id: 'streaming', label: 'Streaming', icon: Radio },
    { id: 'audio', label: 'Audio', icon: Volume2 },
    { id: 'routing', label: 'OS Switcher', icon: Repeat },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-black/60 border-r border-neutral-800/80 p-4 flex flex-col justify-between backdrop-blur-md">
      <div>
        <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-neutral-800">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg border border-cyan-500/40">
            G
          </div>
          <div>
            <h1 className="font-extrabold text-sm tracking-wider uppercase text-neutral-100">GAMING-OCD</h1>
            <p className="text-xs text-neutral-400">Control Center</p>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-neutral-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-3 bg-neutral-900/50 rounded-xl border border-neutral-800 text-xs">
        <div className="flex justify-between items-center text-neutral-400 mb-1">
          <span>Active Profile</span>
          <span className="text-emerald-400 font-semibold">Game Mode ON</span>
        </div>
        <div className="text-[11px] text-neutral-500">Windows &harr; Bazzite Ready</div>
      </div>
    </aside>
  );
};
