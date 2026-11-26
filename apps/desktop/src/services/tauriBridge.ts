import { Game, SystemStats } from '../types/game';

// Safe IPC abstraction with in-browser mock fallback
export const tauriBridge = {
  async getSystemSummary(): Promise<SystemStats> {
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      return await invoke<SystemStats>('get_system_summary');
    } catch {
      return {
        os_name: 'Windows 11 / Bazzite Hybrid',
        hostname: 'Gaming-Host',
        arch: 'x86_64',
        active_game_mode: true,
      };
    }
  },

  async listGames(): Promise<Game[]> {
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      return await invoke<Game[]>('list_games');
    } catch {
      return [
        {
          id: 'steam_cyberpunk',
          title: 'Cyberpunk 2077',
          platform: 'Steam',
          target: 'NativeWindows',
          is_favorite: true,
          compatibility: { status: 'Verified', anticheat_supported: true },
        },
        {
          id: 'steam_elden_ring',
          title: 'Elden Ring',
          platform: 'Steam',
          target: 'NativeLinux',
          is_favorite: true,
          compatibility: { status: 'Verified', anticheat_supported: true },
        },
        {
          id: 'heroic_witcher',
          title: 'The Witcher 3: Wild Hunt',
          platform: 'Heroic',
          target: 'NativeWindows',
          is_favorite: false,
          compatibility: { status: 'Playable', anticheat_supported: true },
        },
      ];
    }
  },

  async launchGame(gameId: string): Promise<number> {
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      return await invoke<number>('launch_game_by_id', { id: gameId });
    } catch {
      console.log(`[Dev Simulation] Launched game: ${gameId}`);
      return 1337;
    }
  },

  async requestReboot(targetOs: string): Promise<string> {
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      return await invoke<string>('request_os_reboot', { targetOs });
    } catch {
      return `[Dev Simulation] Reboot target ${targetOs} scheduled successfully`;
    }
  },
};
