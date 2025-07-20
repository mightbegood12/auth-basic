import { create } from "zustand";

export const useAppStore = create((set) => ({
  isAuthorized: false,
  setIsAuthorized: () =>
    set((state) => ({ isAuthorized: !state.isAuthorized })),
}));
