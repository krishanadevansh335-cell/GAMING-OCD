import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemePreference = 'forest-crimson' | 'deep-forest' | 'high-contrast';
export type SidebarBehaviour = 'collapsible' | 'expanded' | 'compact';
export type ReducedMotionMode = 'system' | 'reduced' | 'full';

interface PreferencesState {
  theme: ThemePreference;
  sidebarBehaviour: SidebarBehaviour;
  sidebarPinned: boolean;
  sidebarHoverExpand: boolean;
  reducedMotionMode: ReducedMotionMode;
  autoCheckUpdates: boolean;
  setTheme: (theme: ThemePreference) => void;
  setSidebarBehaviour: (behaviour: SidebarBehaviour) => void;
  setSidebarPinned: (pinned: boolean) => void;
  toggleSidebarPin: () => void;
  setSidebarHoverExpand: (enabled: boolean) => void;
  setReducedMotionMode: (mode: ReducedMotionMode) => void;
  setAutoCheckUpdates: (enabled: boolean) => void;
  resetPreferences: () => void;
}

const DEFAULT_PREFERENCES = {
  theme: 'forest-crimson' as ThemePreference,
  sidebarBehaviour: 'collapsible' as SidebarBehaviour,
  sidebarPinned: false,
  sidebarHoverExpand: true,
  reducedMotionMode: 'system' as ReducedMotionMode,
  autoCheckUpdates: true,
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      ...DEFAULT_PREFERENCES,
      setTheme: (theme) => set({ theme }),
      setSidebarBehaviour: (sidebarBehaviour) =>
        set((state) => ({
          sidebarBehaviour,
          sidebarPinned:
            sidebarBehaviour === 'expanded'
              ? true
              : sidebarBehaviour === 'compact'
                ? false
                : state.sidebarPinned,
        })),
      setSidebarPinned: (sidebarPinned) => set({ sidebarPinned }),
      toggleSidebarPin: () =>
        set((state) => {
          if (state.sidebarBehaviour !== 'collapsible') return state;
          return { sidebarPinned: !state.sidebarPinned };
        }),
      setSidebarHoverExpand: (sidebarHoverExpand) => set({ sidebarHoverExpand }),
      setReducedMotionMode: (reducedMotionMode) => set({ reducedMotionMode }),
      setAutoCheckUpdates: (autoCheckUpdates) => set({ autoCheckUpdates }),
      resetPreferences: () => set(DEFAULT_PREFERENCES),
    }),
    {
      name: 'gcc-preferences-v0.0.01',
    },
  ),
);
