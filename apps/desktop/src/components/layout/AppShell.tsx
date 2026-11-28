import { useEffect, useState, type ReactNode } from 'react';
import { invoke } from '@tauri-apps/api/core';
import type { PageId } from '../../app/router';
import { AmbientBackground } from '../effects/AmbientBackground';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { ModalLayer } from '../common/Modal';
import { NotificationLayer } from '../common/NotificationLayer';
import { UpdatePrompt } from '../common/UpdatePrompt';
import { usePreferencesStore } from '../../store/usePreferencesStore';
import { useUpdaterStore } from '../../store/useUpdaterStore';

interface AppShellProps {
  page: PageId;
  onNavigate: (page: PageId) => void;
  children: ReactNode;
}

export function AppShell({ page, onNavigate, children }: AppShellProps) {
  const [version, setVersion] = useState('0.0.01');
  const autoCheckUpdates = usePreferencesStore((s) => s.autoCheckUpdates);
  const checkForUpdate = useUpdaterStore((s) => s.checkForUpdate);

  useEffect(() => {
    void invoke<string>('app_version')
      .then((v) => {
        if (v) setVersion(v);
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    if (autoCheckUpdates) void checkForUpdate();
  }, [autoCheckUpdates, checkForUpdate]);

  return (
    <div className="relative flex h-[100dvh] w-screen min-h-0 overflow-hidden bg-[#070908] text-[#EEF2EF]">
      <AmbientBackground />

      {/* Subtle outer emerald edge highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-40 border border-[#20A66A]/20"
      />

      <Sidebar page={page} onNavigate={onNavigate} />

      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
        <Topbar page={page} onNavigate={onNavigate} />

        <main className="relative flex-1 overflow-y-auto overflow-x-hidden gcc-scroll">
          {children}
        </main>

        <footer className="relative z-20 flex h-7 shrink-0 items-center justify-between gap-2 border-t border-[#242D28]/70 bg-[#080B0A]/85 px-4 font-mono text-[10px] text-[#9AA59E] backdrop-blur-md sm:px-5 sm:text-[11px]">
          <div className="flex min-w-0 items-center gap-2 truncate">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#25C47A]" />
            <span className="truncate">GCC v{version}</span>
            <span className="hidden text-[#242D28] sm:inline">•</span>
            <span className="hidden sm:inline">Forest Crimson Shell</span>
          </div>
          <div className="hidden items-center gap-2 text-[#58615C] sm:flex">
            <span>Foundation Release</span>
            <span className="text-[#242D28]">•</span>
            <span>Hover sidebar to expand</span>
          </div>
        </footer>
      </div>

      <ModalLayer />
      <NotificationLayer />
      <UpdatePrompt />
    </div>
  );
}
