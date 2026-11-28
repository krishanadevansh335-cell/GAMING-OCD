import { create } from 'zustand';

export type ModalType = 'foundation-info' | 'placeholder-info' | null;

export interface ModalPayload {
  title?: string;
  description?: string;
  feature?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  tone: 'forest' | 'crimson' | 'neutral';
}

interface UIState {
  activeModal: ModalType;
  modalPayload: ModalPayload | null;
  notifications: NotificationItem[];
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
  toggleMobileNav: () => void;
  openModal: (modal: Exclude<ModalType, null>, payload?: ModalPayload) => void;
  closeModal: () => void;
  notify: (item: Omit<NotificationItem, 'id'>) => void;
  dismissNotification: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeModal: null,
  modalPayload: null,
  notifications: [],
  mobileNavOpen: false,
  setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen }),
  toggleMobileNav: () => set((state) => ({ mobileNavOpen: !state.mobileNavOpen })),
  openModal: (activeModal, modalPayload) =>
    set({ activeModal, modalPayload: modalPayload ?? null }),
  closeModal: () => set({ activeModal: null, modalPayload: null }),
  notify: (item) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    set((state) => ({
      notifications: [...state.notifications.slice(-2), { ...item, id }],
    }));
    window.setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      }));
    }, 4200);
  },
  dismissNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));
