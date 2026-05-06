/**
 * Menu Service — uEngage Edge /menu
 *
 * Responsible for fetching the raw menu payload from the Edge API.
 * The raw shape is a deeply-nested tree:
 *
 *   { categories: [{ id, name, items: [{ id, name, price, modifier_groups: [...] }] }] }
 *
 * Transformation / flattening lives in useMenu.js, not here, keeping
 * this layer purely concerned with transport.
 */

import { edgeClient } from './apiClient';

/**
 * Fetch the full menu for the active store.
 * storeId is also injected by the Axios middleware, but uEngage
 * expects it as a query param as well for catalogue scoping.
 *
 * @param {string} storeId
 * @returns {Promise<object>} Raw uEngage menu payload
 */
export async function fetchMenuByStore(storeId) {
  const { data } = await edgeClient.get('/v1/menu', {
    params: { store_id: storeId },
  });
  return data;
}

/**
 * Fetch a single item's full detail (used for item detail modal).
 *
 * @param {string} itemId
 * @returns {Promise<object>}
 */
export async function fetchItemDetail(itemId) {
  const { data } = await edgeClient.get(`/v1/menu/items/${itemId}`);
  return data;
}
