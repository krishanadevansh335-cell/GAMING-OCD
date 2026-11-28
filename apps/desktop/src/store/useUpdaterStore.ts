import { isTauri } from '@tauri-apps/api/core';
import {
  check,
  type DownloadEvent,
  type Update,
} from '@tauri-apps/plugin-updater';
import { relaunch } from '@tauri-apps/plugin-process';
import { create } from 'zustand';

export type UpdateStatus =
  | 'idle'
  | 'checking'
  | 'available'
  | 'up-to-date'
  | 'downloading'
  | 'installing'
  | 'error'
  | 'unsupported';

interface UpdaterState {
  status: UpdateStatus;
  pendingUpdate: Update | null;
  error: string | null;
  downloadedBytes: number;
  contentLength: number | null;
  promptDismissed: boolean;
  checkForUpdate: () => Promise<void>;
  installUpdate: () => Promise<void>;
  remindMeLater: () => void;
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function onDownloadEvent(event: DownloadEvent) {
  const update = useUpdaterStore.getState();
  switch (event.event) {
    case 'Started':
      useUpdaterStore.setState({
        status: 'downloading',
        downloadedBytes: 0,
        contentLength: event.data.contentLength ?? null,
      });
      break;
    case 'Progress':
      useUpdaterStore.setState({
        status: 'downloading',
        downloadedBytes: update.downloadedBytes + event.data.chunkLength,
      });
      break;
    case 'Finished':
      useUpdaterStore.setState({ status: 'installing' });
      break;
  }
}

export const useUpdaterStore = create<UpdaterState>((set, get) => ({
  status: 'idle',
  pendingUpdate: null,
  error: null,
  downloadedBytes: 0,
  contentLength: null,
  promptDismissed: false,

  checkForUpdate: async () => {
    if (get().status === 'checking') return;
    if (!isTauri()) {
      set({
        status: 'unsupported',
        error: 'Update checks are available in the installed GCC desktop app.',
      });
      return;
    }

    set({ status: 'checking', error: null, promptDismissed: false });
    try {
      const update = await check();
      if (!update) {
        set({ status: 'up-to-date', pendingUpdate: null });
        return;
      }
      set({ status: 'available', pendingUpdate: update, promptDismissed: false });
    } catch (error) {
      set({ status: 'error', error: getErrorMessage(error) });
    }
  },

  installUpdate: async () => {
    const update = get().pendingUpdate;
    if (!update || get().status === 'downloading' || get().status === 'installing') return;

    set({ status: 'downloading', error: null, downloadedBytes: 0, contentLength: null });
    try {
      await update.downloadAndInstall(onDownloadEvent);
      set({ status: 'installing' });
      await relaunch();
    } catch (error) {
      set({ status: 'error', error: getErrorMessage(error) });
    }
  },

  remindMeLater: () => set({ promptDismissed: true }),
}));
