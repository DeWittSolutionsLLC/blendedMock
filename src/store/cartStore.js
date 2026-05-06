/**
 * Cart Store — Zustand (persisted)
 *
 * Central state for the shopping cart. Key design decisions:
 *
 *  1. Each cart entry gets a unique `cartItemId` (crypto.randomUUID) so
 *     the same menu item can appear multiple times with different modifiers.
 *
 *  2. `selectedModifiers` is keyed by modifier group ID:
 *       { [groupId]: ModifierOption[] }
 *     This makes validation O(n groups) and rendering trivial.
 *
 *  3. Validation lives in the store (validateModifiers) so any surface
 *     (ItemModal, QuickAdd, etc.) gets the same rules without prop-drilling.
 *
 *  4. The derived total is computed at read time — no double-bookkeeping.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Calculate the price of a single cart entry including all selected modifiers.
 * @param {object} cartItem
 */
function lineItemTotal(cartItem) {
  const modifierTotal = Object.values(cartItem.selectedModifiers)
    .flat()
    .reduce((sum, opt) => sum + (opt.price ?? 0), 0);

  return (cartItem.item.price + modifierTotal) * cartItem.quantity;
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useCartStore = create(
  persist(
    (set, get) => ({
      /** @type {CartItem[]} */
      items: [],

      // -----------------------------------------------------------------------
      // Validation
      // -----------------------------------------------------------------------

      /**
       * Validates that all required modifier groups for an item have a selection.
       * Returns an array of error strings (empty = valid).
       *
       * @param {object} menuItem              — raw item from the flattened menu
       * @param {object} selectedModifiers     — { [groupId]: ModifierOption[] }
       * @returns {string[]}
       */
      validateModifiers(menuItem, selectedModifiers) {
        const errors = [];
        const groups = menuItem.modifier_groups ?? [];

        for (const group of groups) {
          const selections = selectedModifiers[group.id] ?? [];
          const count = selections.length;

          if (group.required && count < 1) {
            errors.push(`"${group.name}" is required.`);
            continue;
          }
          if (group.min_selections && count < group.min_selections) {
            errors.push(
              `"${group.name}" requires at least ${group.min_selections} selection(s).`,
            );
          }
          if (group.max_selections && count > group.max_selections) {
            errors.push(
              `"${group.name}" allows at most ${group.max_selections} selection(s).`,
            );
          }
        }

        return errors;
      },

      // -----------------------------------------------------------------------
      // Mutations
      // -----------------------------------------------------------------------

      /**
       * Add an item to the cart. Validates modifiers first — throws if invalid
       * so the calling UI can surface the errors without mutating state.
       *
       * @param {object} menuItem
       * @param {object} selectedModifiers   — { [groupId]: ModifierOption[] }
       * @param {number} [quantity=1]
       * @param {string} [notes='']
       */
      addItem(menuItem, selectedModifiers = {}, quantity = 1, notes = '') {
        const errors = get().validateModifiers(menuItem, selectedModifiers);
        if (errors.length > 0) throw new Error(errors.join('\n'));

        const cartItemId = crypto.randomUUID();
        set((state) => ({
          items: [
            ...state.items,
            { cartItemId, item: menuItem, selectedModifiers, quantity, notes },
          ],
        }));
      },

      /**
       * Remove a specific cart entry by its unique cartItemId.
       * @param {string} cartItemId
       */
      removeItem(cartItemId) {
        set((state) => ({
          items: state.items.filter((i) => i.cartItemId !== cartItemId),
        }));
      },

      /**
       * Update the quantity of a cart entry. Removes if quantity reaches 0.
       * @param {string} cartItemId
       * @param {number} quantity
       */
      updateQuantity(cartItemId, quantity) {
        if (quantity <= 0) {
          get().removeItem(cartItemId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.cartItemId === cartItemId ? { ...i, quantity } : i,
          ),
        }));
      },

      /**
       * Update special instructions for a cart entry.
       * @param {string} cartItemId
       * @param {string} notes
       */
      updateNotes(cartItemId, notes) {
        set((state) => ({
          items: state.items.map((i) =>
            i.cartItemId === cartItemId ? { ...i, notes } : i,
          ),
        }));
      },

      clearCart() {
        set({ items: [] });
      },

      // -----------------------------------------------------------------------
      // Derived state (computed at read time)
      // -----------------------------------------------------------------------

      get itemCount() {
        return get().items.reduce((sum, i) => sum + i.quantity, 0);
      },

      get subtotal() {
        return get().items.reduce((sum, i) => sum + lineItemTotal(i), 0);
      },
    }),
    {
      name: 'blended-cart',
      // Only persist items — derived values are always recomputed
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
