import {
  AudioLines,
  Compass,
  Download,
  Gamepad2,
  Gauge,
  House,
  Images,
  Settings2,
  Users,
  type LucideIcon,
} from 'lucide-react';

export type PageId =
  | 'home'
  | 'games'
  | 'discover'
  | 'social'
  | 'audio'
  | 'capture'
  | 'performance'
  | 'downloads'
  | 'settings';

export interface NavItemConfig {
  id: PageId;
  label: string;
  subtitle: string;
  icon: LucideIcon;
  section: 'main' | 'system';
}

export const NAV_ITEMS: NavItemConfig[] = [
  {
    id: 'home',
    label: 'Home',
    subtitle: 'Your gaming command center',
    icon: House,
    section: 'main',
  },
  {
    id: 'games',
    label: 'My Games',
    subtitle: 'Your game library will appear here.',
    icon: Gamepad2,
    section: 'main',
  },
  {
    id: 'discover',
    label: 'Discover',
    subtitle: 'Explore new games, features and content (coming soon).',
    icon: Compass,
    section: 'main',
  },
  {
    id: 'social',
    label: 'Social',
    subtitle: 'Connect with friends and the GCC community (coming soon).',
    icon: Users,
    section: 'main',
  },
  {
    id: 'audio',
    label: 'Audio Studio',
    subtitle: 'Advanced audio tools and sound customization (coming soon).',
    icon: AudioLines,
    section: 'main',
  },
  {
    id: 'capture',
    label: 'Capture',
    subtitle: 'Record, capture and manage your gameplay (coming soon).',
    icon: Images,
    section: 'main',
  },
  {
    id: 'performance',
    label: 'Performance',
    subtitle: 'Monitor and optimize your system for gaming (coming soon).',
    icon: Gauge,
    section: 'main',
  },
  {
    id: 'downloads',
    label: 'Downloads',
    subtitle: 'Manage your game and content downloads (coming soon).',
    icon: Download,
    section: 'main',
  },
  {
    id: 'settings',
    label: 'Settings',
    subtitle: 'Configure GCC and personalize your experience.',
    icon: Settings2,
    section: 'system',
  },
];

export const PAGE_META: Record<PageId, NavItemConfig> = NAV_ITEMS.reduce(
  (acc, item) => {
    acc[item.id] = item;
    return acc;
  },
  {} as Record<PageId, NavItemConfig>,
);
