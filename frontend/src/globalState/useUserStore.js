import { create } from 'zustand';

const useUserStore = create(set => ({
  user: null,
  isLoggedIn: false,

  setUser: (userData) => set({ user: userData, isLoggedIn: true }),
  clearUser: () => set({ user: null, isLoggedIn: false });

}));

export default useUserStore;