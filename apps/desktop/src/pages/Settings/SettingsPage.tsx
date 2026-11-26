import React, { useState } from 'react';
import { Repeat, HardDrive } from 'lucide-react';
import { tauriBridge } from '../../services/tauriBridge';

export const SettingsPage: React.FC = () => {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleReboot = async (target: string) => {
    const res = await tauriBridge.requestReboot(target);
    setStatusMessage(res);
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">OS Router & System Settings</h2>
        <p className="text-sm text-neutral-400">Manage non-destructive reboot handoffs between Windows and Bazzite Linux</p>
      </div>

      {statusMessage && (
        <div className="p-4 rounded-xl bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 text-sm">
          {statusMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-4">
          <div className="flex items-center gap-3">
            <Repeat className="w-6 h-6 text-cyan-400" />
            <h3 className="font-bold text-neutral-100">Reboot to Bazzite Linux</h3>
          </div>
          <p className="text-xs text-neutral-400">
            Sets UEFI next-boot target to Bazzite / SteamOS GameScope environment for maximum gamepad fidelity.
          </p>
          <button
            onClick={() => handleReboot('Bazzite Linux')}
            className="w-full py-2.5 px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg transition"
          >
            Schedule Handoff to Bazzite
          </button>
        </div>

        <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-4">
          <div className="flex items-center gap-3">
            <HardDrive className="w-6 h-6 text-emerald-400" />
            <h3 className="font-bold text-neutral-100">Reboot to Windows 11</h3>
          </div>
          <p className="text-xs text-neutral-400">
            Schedules BCD / bootloader handoff to Windows for kernel-level anti-cheat titles.
          </p>
          <button
            onClick={() => handleReboot('Windows')}
            className="w-full py-2.5 px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg transition"
          >
            Schedule Handoff to Windows
          </button>
        </div>
      </div>
    </div>
  );
};
