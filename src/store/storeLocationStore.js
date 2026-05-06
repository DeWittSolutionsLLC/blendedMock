/**
 * Store Location Store — Zustand (persisted)
 *
 * Holds the currently-selected restaurant location (storeId).
 * This is the single source of truth consumed by:
 *   - apiClient.js  — injected as X-Store-Id header on every request
 *   - useMenu.js    — determines which menu catalogue to fetch
 *   - cartStore.js  — attached to order payload at checkout
 *
 * Persisted to localStorage so the user's selected location survives
 * page refreshes without requiring a re-selection on every visit.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStoreLocationStore = create(
  persist(
    (set, get) => ({
      /** @type {string|null} uEngage store UUID */
      selectedStoreId: null,

      /** @type {object|null} Full store metadata (name, address, hours) */
      selectedStoreDetails: null,

      /** @type {object[]} All available locations for the brand */
      availableStores: [],

      /**
       * Select a location. Always call this before navigating to the menu.
       * @param {string} storeId
       * @param {object} [storeDetails]
       */
      selectStore(storeId, storeDetails = null) {
        set({ selectedStoreId: storeId, selectedStoreDetails: storeDetails });
      },

      /** Load all brand locations (called once at app boot). */
      setAvailableStores(stores) {
        set({ availableStores: stores });
      },

      clearStore() {
        set({ selectedStoreId: null, selectedStoreDetails: null });
      },

      hasStore() {
        return Boolean(get().selectedStoreId);
      },
    }),
    {
      name: 'blended-store-location',
      partialize: (state) => ({
        selectedStoreId: state.selectedStoreId,
        selectedStoreDetails: state.selectedStoreDetails,
      }),
    },
  ),
);
