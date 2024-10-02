import { create } from 'zustand';

type ChatStore = {
  unreadCounts: Record<string, number>;
  setUnreadCount: (tripId: string, count: number) => void;
  getUnreadCount: (tripId: string) => number;
  getTotalUnreadCount: () => number;
};

const useChatStore = create<ChatStore>((set, get) => ({
  unreadCounts: {},
  setUnreadCount: (tripId, count) =>
    set((state) => ({
      unreadCounts: { ...state.unreadCounts, [tripId]: count },
    })),
  getUnreadCount: (tripId) => {
    const state = get();
    return state.unreadCounts[tripId] || 0;
  },
  getTotalUnreadCount: () => {
    const state = get();
    return Object.values(state.unreadCounts).reduce((a, b) => a + b, 0);
  },
}));

export default useChatStore;
