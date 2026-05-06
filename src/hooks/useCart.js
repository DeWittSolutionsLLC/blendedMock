/**
 * useCart — Cart interaction hook
 *
 * Thin ergonomic wrapper over cartStore that also exposes checkout logic.
 * UI components import this hook, NOT the store directly, to maintain
 * the decoupling boundary between state and transport.
 *
 * Checkout flow:
 *   1. validateModifiers() — enforced by cartStore.addItem, but can also be
 *      called pre-emptively from an ItemModal "Add to Cart" button.
 *   2. placeOrder()       — builds payload, calls orderService, clears cart.
 */

import { useCartStore } from '../store/cartStore';
import { useUserStore } from '../store/userStore';
import { useStoreLocationStore } from '../store/storeLocationStore';
import { buildOrderPayload, createOrder } from '../services/orderService';
import { useState, useCallback } from 'react';

export function useCart() {
  const store = useCartStore();
  const { userId } = useUserStore();
  const { selectedStoreId } = useStoreLocationStore();

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [lastOrderId, setLastOrderId] = useState(null);

  // Derived values — computed fresh each render (Zustand triggers re-render on change)
  const itemCount = store.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = store.items.reduce((sum, i) => {
    const modTotal = Object.values(i.selectedModifiers)
      .flat()
      .reduce((s, opt) => s + (opt.price ?? 0), 0);
    return sum + (i.item.price + modTotal) * i.quantity;
  }, 0);

  /**
   * Submit the cart as an order.
   *
   * @param {{
   *   customer: { name: string, phone: string, email: string },
   *   orderType: 'PICKUP'|'DELIVERY'|'DINE_IN',
   *   walletCredits?: number,
   *   notes?: string,
   * }} opts
   * @returns {Promise<string>} orderId on success
   */
  const placeOrder = useCallback(
    async ({ customer, orderType, walletCredits = 0, notes = '' }) => {
      setIsPlacingOrder(true);
      setOrderError(null);

      try {
        const payload = buildOrderPayload({
          cartItems: store.items,
          customer,
          storeId: selectedStoreId,
          orderType,
          walletCredits,
          notes,
        });

        const result = await createOrder(payload);

        // Store order ID so OrderReturn can retrieve it after the redirect
        sessionStorage.setItem('pending_order_id', result.order_id);
        store.clearCart();
        setLastOrderId(result.order_id);

        if (result.payment_url) {
          // Hand off to uEngage's hosted payment page.
          // setIsRedirecting stays true — the component stays in "loading" state
          // until the browser navigates away, preventing double-submission.
          setIsRedirecting(true);
          window.location.href = result.payment_url;
          return result.order_id;
        }

        // Fallback: API returned no payment_url (e.g. cash/pay-at-counter orders)
        return result.order_id;
      } catch (err) {
        setOrderError(err.message);
        throw err;
      } finally {
        setIsPlacingOrder(false);
      }
    },
    [store, selectedStoreId],
  );

  return {
    // State
    items: store.items,
    itemCount,
    subtotal,
    isPlacingOrder,
    isRedirecting,
    orderError,
    lastOrderId,

    // Cart mutations
    addItem: store.addItem.bind(store),
    removeItem: store.removeItem.bind(store),
    updateQuantity: store.updateQuantity.bind(store),
    updateNotes: store.updateNotes.bind(store),
    clearCart: store.clearCart.bind(store),

    // Validation (expose for pre-flight checks in ItemModal)
    validateModifiers: store.validateModifiers.bind(store),

    // Checkout
    placeOrder,
  };
}
