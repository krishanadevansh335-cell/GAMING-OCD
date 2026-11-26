import { create } from 'zustand';
import { Game } from '../types/game';
import { tauriBridge } from '../services/tauriBridge';

interface GameState {
  games: Game[];
  selectedGame: Game | null;
  activeTab: string;
  isLoading: boolean;
  setActiveTab: (tab: string) => void;
  setSelectedGame: (game: Game | null) => void;
  loadGames: () => Promise<void>;
  launchCurrentGame: (id: string) => Promise<void>;
}

export const useGameStore = create<GameState>((set) => ({
  games: [],
  selectedGame: null,
  activeTab: 'library',
  isLoading: false,
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedGame: (game) => set({ selectedGame: game }),
  loadGames: async () => {
    set({ isLoading: true });
    const list = await tauriBridge.listGames();
    set({ games: list, selectedGame: list[0] ?? null, isLoading: false });
  },
  launchCurrentGame: async (id: string) => {
    await tauriBridge.launchGame(id);
  },
}));
