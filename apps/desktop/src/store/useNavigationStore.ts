import { create } from 'zustand';
import type { PageId } from '../app/router';

interface NavigationState {
  page: PageId;
  navigate: (page: PageId) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  page: 'home',
  navigate: (page) => set({ page }),
}));
