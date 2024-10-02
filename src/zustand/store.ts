import { create } from 'zustand';

type PageState = 'main' | 'location' | 'date' | 'result';

type StoreState = {
  currentPage: PageState;
  setCurrentPage: (page: PageState) => void;
};

const useStore = create<StoreState>((set) => ({
  currentPage: 'main',
  setCurrentPage: (page) => set({ currentPage: page }),
}));

export default useStore;
