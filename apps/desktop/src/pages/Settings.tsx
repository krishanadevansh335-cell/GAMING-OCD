import { useEffect, useState } from 'react';
import { isTauri, invoke } from '@tauri-apps/api/core';
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Cpu,
  DownloadCloud,
  Download,
  Layout,
  Palette,
  Power,
  RotateCcw,
  RefreshCw,
  Settings2,
  SlidersHorizontal,
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/common/Button';
import {
  usePreferencesStore,
  type ReducedMotionMode,
  type SidebarBehaviour,
  type ThemePreference,
} from '../store/usePreferencesStore';
import { useUIStore } from '../store/useUIStore';
import { useUpdaterStore } from '../store/useUpdaterStore';

type SettingsSectionId =
  | 'general'
  | 'appearance'
  | 'interface'
  | 'notifications'
  | 'updates'
  | 'advanced';

const SECTIONS: { id: SettingsSectionId; label: string; icon: typeof Settings2 }[] = [
  { id: 'general', label: 'General', icon: Settings2 },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'interface', label: 'Interface', icon: Layout },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'updates', label: 'Updates', icon: DownloadCloud },
  { id: 'advanced', label: 'Advanced', icon: Cpu },
];

function DisabledToggleRow({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: typeof Power;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 opacity-80">
      <div className="flex min-w-0 items-center gap-3.5">
        <Icon size={17} className="shrink-0 text-[#9AA59E]" />
        <div className="min-w-0">
          <div className="text-sm font-medium text-[#EEF2EF]">{title}</div>
          <div className="mt-0.5 text-xs text-[#9AA59E]">{description}</div>
        </div>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={false}
        aria-label={`${title} (not available in GCC 0.0.01)`}
        title="Not available in GCC 0.0.01"
        disabled
        className="relative h-6 w-11 shrink-0 cursor-not-allowed rounded-full border border-[#242D28] bg-[#171E1B]"
      >
        <span className="block h-4 w-4 translate-x-1 rounded-full bg-[#9AA59E]" />
      </button>
    </div>
  );
}

export function SettingsPage() {
  const [section, setSection] = useState<SettingsSectionId>('general');
  const {
    theme,
    sidebarBehaviour,
    sidebarHoverExpand,
    reducedMotionMode,
    autoCheckUpdates,
    setTheme,
    setSidebarBehaviour,
    setSidebarHoverExpand,
    setReducedMotionMode,
    setAutoCheckUpdates,
    resetPreferences,
  } = usePreferencesStore();
  const notify = useUIStore((s) => s.notify);
  const {
    status: updateStatus,
    pendingUpdate,
    error: updateError,
    downloadedBytes,
    contentLength,
    checkForUpdate,
    installUpdate,
  } = useUpdaterStore();
  const [appVersion, setAppVersion] = useState('0.0.01');
  const isDesktopApp = isTauri();

  useEffect(() => {
    void invoke<string>('app_version')
      .then((version) => setAppVersion(version))
      .catch(() => undefined);
  }, []);

  const isReducedMotionOn = reducedMotionMode === 'reduced';

  const handleReset = () => {
    resetPreferences();
    notify({
      title: 'UI Preferences Reset',
      message: 'Restored default Forest Crimson theme, hover-expand sidebar, and system motion.',
      tone: 'forest',
    });
  };

  return (
    <PageContainer
      title="Settings"
      subtitle="Configure GCC and personalize your experience."
      actions={
        <Button variant="outline" size="sm" icon={<RotateCcw size={14} />} onClick={handleReset}>
          Reset Defaults
        </Button>
      }
    >
      <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-[235px_1fr] lg:gap-5">
        {/* Section nav (horizontal scrollable on < lg, vertical rail on lg+) */}
        <nav
          aria-label="Settings sections"
          className="flex flex-row gap-1.5 overflow-x-auto rounded-[16px] border border-[#242D28] bg-[#0D110F]/90 p-2.5 gcc-scroll lg:flex-col lg:p-3"
        >
          {SECTIONS.map((item) => {
            const Icon = item.icon;
            const active = section === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSection(item.id)}
                className={`flex shrink-0 items-center gap-2.5 rounded-[10px] px-3.5 py-2 text-left text-[13px] font-medium transition-colors lg:gap-3 lg:py-2.5 ${
                  active
                    ? 'bg-gradient-to-r from-[#22B570] to-[#145A36] text-[#FFFFFF] shadow-[0_4px_16px_rgba(32,166,106,0.34)]'
                    : 'text-[#9AA59E] hover:bg-[#141A17] hover:text-[#EEF2EF]'
                }`}
              >
                <Icon size={16} className={active ? 'text-[#FFFFFF]' : 'text-[#9AA59E]'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right content panel */}
        <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
          {section === 'general' && (
            <>
              <div className="rounded-[16px] border border-[#242D28] bg-[#0D110F]/90 p-4 sm:p-5">
                <h2 className="mb-2 font-display text-base font-semibold text-[#EEF2EF]">
                  General
                </h2>
                <div className="divide-y divide-[#242D28]/70">
                  <DisabledToggleRow
                    icon={Power}
                    title="Start GCC with Windows"
                    description="Launch automatically when you sign in (placeholder in v0.0.01)."
                  />
                  <DisabledToggleRow
                    icon={Layout}
                    title="Minimize to system tray"
                    description="Keep GCC running in the background (placeholder in v0.0.01)."
                  />
                  <div className="flex items-center justify-between gap-4 py-3">
                    <div className="flex min-w-0 items-center gap-3.5">
                      <SlidersHorizontal size={17} className="shrink-0 text-[#25C47A]" />
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-[#EEF2EF]">Reduced motion</div>
                        <div className="mt-0.5 text-xs text-[#9AA59E]">
                          Limit animations and visual effects.
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={isReducedMotionOn}
                      aria-label="Toggle reduced motion"
                      onClick={() => {
                        const next = isReducedMotionOn ? 'full' : 'reduced';
                        setReducedMotionMode(next);
                        notify({
                          title:
                            next === 'reduced'
                              ? 'Reduced motion enabled'
                              : 'Immersive motion enabled',
                          message: 'Animation preference saved locally.',
                          tone: 'forest',
                        });
                      }}
                      className={`relative h-6 w-11 shrink-0 rounded-full border transition-colors ${
                        isReducedMotionOn
                          ? 'border-[#25C47A]/60 bg-[#20A66A]'
                          : 'border-[#242D28] bg-[#171E1B]'
                      }`}
                    >
                      <span
                        className={`block h-4 w-4 rounded-full bg-[#FFFFFF] transition-transform ${
                          isReducedMotionOn ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-[16px] border border-[#242D28] bg-[#0D110F]/90 p-4 sm:p-5">
                <h2 className="mb-3 font-display text-base font-semibold text-[#EEF2EF]">
                  Appearance
                </h2>
                <div className="space-y-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-sm text-[#EEF2EF]">Theme</span>
                    <div className="flex items-center gap-2 rounded-lg border border-[#242D28] bg-[#121715] px-3 py-1.5">
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#25C47A]" />
                      <select
                        aria-label="Theme preference"
                        value={theme}
                        onChange={(e) => {
                          setTheme(e.target.value as ThemePreference);
                          notify({
                            title: 'Theme updated',
                            message: 'Visual theme saved locally.',
                            tone: 'forest',
                          });
                        }}
                        className="bg-transparent text-xs text-[#EEF2EF] focus:outline-none"
                      >
                        <option value="forest-crimson" className="bg-[#121715]">
                          Forest (Default)
                        </option>
                        <option value="deep-forest" className="bg-[#121715]">
                          Deep Forest
                        </option>
                        <option value="high-contrast" className="bg-[#121715]">
                          High Contrast Dark
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-sm text-[#EEF2EF]">Sidebar behaviour</span>
                    <select
                      aria-label="Sidebar behaviour"
                      value={sidebarBehaviour}
                      onChange={(e) => {
                        setSidebarBehaviour(e.target.value as SidebarBehaviour);
                        notify({
                          title: 'Sidebar updated',
                          message: 'Sidebar layout preference saved.',
                          tone: 'forest',
                        });
                      }}
                      className="h-9 rounded-lg border border-[#242D28] bg-[#121715] px-3 text-xs text-[#EEF2EF] focus:border-[#20A66A]"
                    >
                      <option value="collapsible">Collapsible (Hover Expand)</option>
                      <option value="expanded">Always Expanded</option>
                      <option value="compact">Compact Icons</option>
                    </select>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-sm text-[#EEF2EF]">Language</span>
                    <select
                      disabled
                      aria-label="Language"
                      defaultValue="en"
                      className="h-9 cursor-not-allowed rounded-lg border border-[#242D28] bg-[#121715] px-3 text-xs text-[#9AA59E]"
                    >
                      <option value="en">English (EN)</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}

          {section === 'appearance' && (
            <div className="space-y-5 rounded-[16px] border border-[#242D28] bg-[#0D110F]/90 p-5 sm:p-6">
              <div>
                <h2 className="font-display text-lg font-semibold text-[#EEF2EF]">Appearance</h2>
                <p className="mt-1 text-xs text-[#9AA59E]">
                  Customize theme palette and animation intensity.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#242D28] bg-[#121715] px-4 py-4">
                <div>
                  <div className="text-sm font-medium text-[#EEF2EF]">Theme</div>
                  <div className="mt-0.5 text-xs text-[#9AA59E]">
                    Forest Crimson is the primary GCC visual identity.
                  </div>
                </div>
                <select
                  aria-label="Theme preference"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as ThemePreference)}
                  className="h-9 rounded-lg border border-[#242D28] bg-[#0B0E0D] px-3 text-xs text-[#EEF2EF]"
                >
                  <option value="forest-crimson">Forest (Default)</option>
                  <option value="deep-forest">Deep Forest</option>
                  <option value="high-contrast">High Contrast Dark</option>
                </select>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#242D28] bg-[#121715] px-4 py-4">
                <div>
                  <div className="text-sm font-medium text-[#EEF2EF]">Motion Intensity</div>
                  <div className="mt-0.5 text-xs text-[#9AA59E]">
                    Follow OS settings, force reduced motion, or enable full immersive motion.
                  </div>
                </div>
                <select
                  aria-label="Motion intensity"
                  value={reducedMotionMode}
                  onChange={(e) => setReducedMotionMode(e.target.value as ReducedMotionMode)}
                  className="h-9 rounded-lg border border-[#242D28] bg-[#0B0E0D] px-3 text-xs text-[#EEF2EF]"
                >
                  <option value="system">System Default</option>
                  <option value="full">Immersive</option>
                  <option value="reduced">Reduced Motion</option>
                </select>
              </div>
            </div>
          )}

          {section === 'interface' && (
            <div className="space-y-5 rounded-[16px] border border-[#242D28] bg-[#0D110F]/90 p-5 sm:p-6">
              <div>
                <h2 className="font-display text-lg font-semibold text-[#EEF2EF]">Interface</h2>
                <p className="mt-1 text-xs text-[#9AA59E]">
                  Configure sidebar expansion and navigation behaviour.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#242D28] bg-[#121715] px-4 py-4">
                <div>
                  <div className="text-sm font-medium text-[#EEF2EF]">Sidebar behaviour</div>
                  <div className="mt-0.5 text-xs text-[#9AA59E]">
                    Choose collapsible, always expanded, or compact icon rail.
                  </div>
                </div>
                <select
                  aria-label="Sidebar behaviour"
                  value={sidebarBehaviour}
                  onChange={(e) => setSidebarBehaviour(e.target.value as SidebarBehaviour)}
                  className="h-9 rounded-lg border border-[#242D28] bg-[#0B0E0D] px-3 text-xs text-[#EEF2EF]"
                >
                  <option value="collapsible">Collapsible</option>
                  <option value="expanded">Always Expanded</option>
                  <option value="compact">Compact Icons</option>
                </select>
              </div>

              <div className="flex items-center justify-between gap-4 rounded-xl border border-[#242D28] bg-[#121715] px-4 py-4">
                <div className="min-w-0">
                  <div className="text-sm font-medium text-[#EEF2EF]">
                    Auto-expand sidebar on cursor hover
                  </div>
                  <div className="mt-0.5 text-xs text-[#9AA59E]">
                    Automatically expand the sidebar whenever the cursor moves over it.
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={sidebarHoverExpand}
                  aria-label="Auto-expand sidebar on cursor hover"
                  onClick={() => setSidebarHoverExpand(!sidebarHoverExpand)}
                  className={`relative h-6 w-11 shrink-0 rounded-full border transition-colors ${
                    sidebarHoverExpand
                      ? 'border-[#25C47A]/60 bg-[#20A66A]'
                      : 'border-[#242D28] bg-[#171E1B]'
                  }`}
                >
                  <span
                    className={`block h-4 w-4 rounded-full bg-[#FFFFFF] transition-transform ${
                      sidebarHoverExpand ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {section === 'notifications' && (
            <div className="space-y-3 rounded-[16px] border border-[#242D28] bg-[#0D110F]/90 p-5 sm:p-6">
              <div>
                <h2 className="font-display text-lg font-semibold text-[#EEF2EF]">Notifications</h2>
                <p className="mt-1 text-xs text-[#9AA59E]">
                  Desktop notification channels are placeholders in v0.0.01.
                </p>
              </div>
              <div className="divide-y divide-[#242D28]/70">
                <DisabledToggleRow
                  icon={Bell}
                  title="Download completion alerts"
                  description="Show a notification when a download finishes."
                />
                <DisabledToggleRow
                  icon={Bell}
                  title="Friend activity alerts"
                  description="Show alerts when friends come online or join a game."
                />
              </div>
            </div>
          )}

          {section === 'updates' && (
            <div className="space-y-4 rounded-[16px] border border-[#242D28] bg-[#0D110F]/90 p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-lg font-semibold text-[#EEF2EF]">Updates</h2>
                  <p className="mt-1 max-w-2xl text-xs leading-relaxed text-[#9AA59E]">
                    GCC checks for signed releases when it starts. It asks before installing, and never restarts a game.
                  </p>
                </div>
                <span className="shrink-0 rounded-md border border-[#E7B45A]/30 bg-[#E7B45A]/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[#E7B45A]">
                  {updateStatus === 'up-to-date' ? 'UP TO DATE' : updateStatus.replace('-', ' ')}
                </span>
              </div>

              <div className="divide-y divide-[#242D28] rounded-xl border border-[#242D28] bg-[#121715] text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
                  <span className="text-[#9AA59E]">Installed version</span>
                  <span className="font-mono text-[#25C47A]">{appVersion}</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
                  <span className="text-[#9AA59E]">Update source</span>
                   <span className="text-right text-[#E7B45A]">Public feed setup required</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
                  <span className="text-[#9AA59E]">Package verification</span>
                  <span className="text-[#25C47A]">Tauri signature verification required</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#242D28] bg-[#121715] px-4 py-3.5">
                <div>
                  <div className="text-sm font-medium text-[#EEF2EF]">Check automatically</div>
                  <div className="mt-0.5 text-xs text-[#9AA59E]">Look for a new release when GCC starts.</div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={autoCheckUpdates}
                  aria-label="Check for GCC updates automatically"
                  onClick={() => setAutoCheckUpdates(!autoCheckUpdates)}
                  className={`relative h-6 w-11 shrink-0 rounded-full border transition-colors ${autoCheckUpdates ? 'border-[#25C47A]/60 bg-[#20A66A]' : 'border-[#242D28] bg-[#171E1B]'}`}
                >
                  <span className={`block h-4 w-4 rounded-full bg-white transition-transform ${autoCheckUpdates ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <Button
                  variant="outline"
                  size="sm"
                  icon={<RefreshCw size={14} className={updateStatus === 'checking' ? 'animate-spin' : ''} />}
                  disabled={!isDesktopApp || updateStatus === 'checking' || updateStatus === 'downloading' || updateStatus === 'installing'}
                  onClick={() => void checkForUpdate()}
                >
                  {updateStatus === 'checking' ? 'Checking…' : 'Check for updates'}
                </Button>
                {pendingUpdate && updateStatus !== 'downloading' && updateStatus !== 'installing' && (
                  <Button variant="forest" size="sm" icon={<Download size={14} />} onClick={() => void installUpdate()}>
                    Install {pendingUpdate.version} and restart
                  </Button>
                )}
              </div>

              {updateStatus === 'unsupported' && (
                <p className="text-xs text-[#9AA59E]">Update checks run in the installed Windows desktop app, not in the browser preview.</p>
              )}
              {updateStatus === 'up-to-date' && (
                <p role="status" className="flex items-center gap-2 text-xs text-[#25C47A]"><CheckCircle2 size={15} /> GCC is up to date.</p>
              )}
              {updateStatus === 'error' && updateError && (
                <p role="alert" className="flex items-start gap-2 rounded-lg border border-[#DC2638]/30 bg-[#941C2C]/10 p-3 text-xs text-[#F0A0A8]"><AlertTriangle size={15} className="mt-0.5 shrink-0" />{updateError}</p>
              )}
              {updateStatus === 'downloading' && (
                <div className="rounded-lg border border-[#242D28] bg-[#121715] p-3">
                  <div className="mb-2 flex justify-between text-xs text-[#A8B1AA]"><span>Downloading signed update…</span><span>{contentLength ? `${Math.min(100, Math.round(downloadedBytes / contentLength * 100))}%` : `${Math.round(downloadedBytes / 1024)} KB`}</span></div>
                  <progress className="h-1.5 w-full accent-[#25C47A]" max={contentLength ?? Math.max(downloadedBytes, 1)} value={downloadedBytes} aria-label="Update download progress" />
                </div>
              )}
              {updateStatus === 'installing' && <p role="status" className="text-xs text-[#25C47A]">Installing update and restarting GCC…</p>}
              {pendingUpdate?.body && (
                <div className="rounded-lg border border-[#242D28] bg-[#121715] p-3.5">
                  <h3 className="mb-2 text-xs font-semibold text-[#EEF2EF]">GCC {pendingUpdate.version} release notes</h3>
                  <p className="whitespace-pre-wrap text-xs leading-relaxed text-[#9AA59E]">{pendingUpdate.body}</p>
                </div>
              )}
              <p className="text-[11px] leading-relaxed text-[#6F7A72]">
                Automatic installation is off. You can defer an update and install it later from here.
              </p>
            </div>
          )}

          {section === 'advanced' && (
            <div className="space-y-4 rounded-[16px] border border-[#242D28] bg-[#0D110F]/90 p-5 sm:p-6">
              <div>
                <h2 className="font-display text-lg font-semibold text-[#EEF2EF]">Advanced</h2>
                <p className="mt-1 text-xs text-[#9AA59E]">
                  Local SQLite foundation and diagnostic placeholders.
                </p>
              </div>
              <div className="rounded-xl border border-[#242D28] bg-[#121715] px-4 py-3.5 text-xs">
                <div className="font-medium text-[#EEF2EF]">Local Database Foundation</div>
                <div className="mt-1 text-[#9AA59E]">
                  SQLite is initialized via <code className="font-mono text-[#25C47A]">gcc-database</code> with non-destructive migrations for application metadata and settings.
                </div>
              </div>
              <DisabledToggleRow
                icon={Cpu}
                title="Hardware acceleration diagnostics"
                description="Verbose WebView2 and GPU diagnostic logging (reserved)."
              />
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
