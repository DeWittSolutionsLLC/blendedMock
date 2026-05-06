/**
 * UI Store — Zustand (not persisted)
 * Controls transient UI state like the cart drawer visibility.
 */

import { create } from 'zustand';

export const useUiStore = create((set) => ({
  isCartOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((s) => ({ isCartOpen: !s.isCartOpen })),
}));
