export type Platform = 'Steam' | 'Heroic' | 'Epic' | 'Gog' | 'Manual';

export interface Game {
  id: string;
  title: string;
  platform: Platform;
  target: 'NativeWindows' | 'NativeLinux' | string;
  is_favorite: boolean;
  banner_image?: string;
  compatibility?: {
    status: 'Verified' | 'Playable' | 'Borked';
    anticheat_supported: boolean;
  };
}

export interface SystemStats {
  os_name: string;
  hostname: string;
  arch: string;
  active_game_mode: boolean;
}
