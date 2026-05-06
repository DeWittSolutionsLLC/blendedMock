/**
 * Order Service — uEngage Edge /orders
 *
 * Handles order creation, status polling, and order history.
 * The cart store formats the payload; this layer only handles transport.
 *
 * Expected POST body shape (v1):
 * {
 *   store_id: string,
 *   items: [{ item_id, quantity, modifier_selections: [{ group_id, option_ids }] }],
 *   customer: { name, phone, email },
 *   loyalty_redemption?: { wallet_credits: number },
 *   notes?: string,
 *   order_type: 'PICKUP' | 'DELIVERY' | 'DINE_IN',
 * }
 */

import { edgeClient } from './apiClient';

/**
 * Submit a new order.
 *
 * @param {object} orderPayload  - fully-formed order body
 * @returns {Promise<{ order_id: string, status: string, eta_minutes: number }>}
 */
export async function createOrder(orderPayload) {
  const { data } = await edgeClient.post('/v1/orders', orderPayload);
  return data;
}

/**
 * Poll order status by order ID.
 *
 * @param {string} orderId
 * @returns {Promise<{ order_id, status, eta_minutes, timeline: [] }>}
 */
export async function getOrderStatus(orderId) {
  const { data } = await edgeClient.get(`/v1/orders/${orderId}`);
  return data;
}

/**
 * Fetch paginated order history for the authenticated user.
 *
 * @param {{ page?: number, limit?: number }} params
 * @returns {Promise<{ orders: [], total: number }>}
 */
export async function fetchOrderHistory(params = {}) {
  const { data } = await edgeClient.get('/v1/orders/history', { params });
  return data;
}

/**
 * Build the canonical order payload from cart store state.
 * Called by useCart before dispatching to createOrder().
 *
 * @param {object} opts
 * @param {object[]} opts.cartItems    - from cartStore.items
 * @param {object}   opts.customer
 * @param {string}   opts.storeId
 * @param {string}   opts.orderType
 * @param {number}   [opts.walletCredits]
 * @param {string}   [opts.notes]
 * @returns {object} orderPayload
 */
export function buildOrderPayload({ cartItems, customer, storeId, orderType, walletCredits = 0, notes = '' }) {
  const items = cartItems.map((cartItem) => ({
    item_id: cartItem.item.id,
    quantity: cartItem.quantity,
    modifier_selections: Object.entries(cartItem.selectedModifiers).map(
      ([groupId, options]) => ({
        group_id: groupId,
        option_ids: options.map((o) => o.id),
      }),
    ),
    special_instructions: cartItem.notes || '',
  }));

  const payload = { store_id: storeId, items, customer, order_type: orderType, notes };

  if (walletCredits > 0) {
    payload.loyalty_redemption = { wallet_credits: walletCredits };
  }

  return payload;
}
