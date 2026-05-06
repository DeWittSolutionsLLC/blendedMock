/**
 * Shared formatting utilities.
 * Prices in the uEngage API are stored in cents (850 = $8.50).
 */

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

/** @param {number} cents */
export const formatPrice = (cents) => usd.format(cents / 100);
