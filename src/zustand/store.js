import { create } from "zustand";

export const useStore = create((set) => ({
  login: false,
  toggleLogin: () => set((state) => ({ login: !state.login })),
}));
