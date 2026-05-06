/**
 * Loyalty Service — uEngage Prism CRM/Loyalty
 *
 * Interfaces with the Prism API for wallet balance, point history,
 * and credit redemption at checkout. All calls use the prismClient
 * which shares the same auth middleware as edgeClient.
 *
 * Prism identifies users by phone number (primary) or by a session
 * token returned after OTP verification.
 */

import { prismClient } from './apiClient';

/**
 * Fetch wallet balance and reward points for the authenticated user.
 *
 * @param {string} userId  — Prism user UUID (from userStore after login)
 * @returns {Promise<{ wallet_balance: number, reward_points: number, tier: string }>}
 */
export async function fetchLoyaltyWallet(userId) {
  const { data } = await prismClient.get('/v1/loyalty/wallet', {
    params: { user_id: userId },
  });
  return data;
}

/**
 * Validate how many wallet credits can be applied to a given order total.
 * Prism enforces redemption caps (e.g., max 20% of order value).
 *
 * @param {{ userId: string, orderTotal: number }} params
 * @returns {Promise<{ max_redeemable: number, equivalent_discount: number }>}
 */
export async function validateWalletRedemption({ userId, orderTotal }) {
  const { data } = await prismClient.post('/v1/loyalty/validate-redemption', {
    user_id: userId,
    order_total: orderTotal,
  });
  return data;
}

/**
 * Confirm wallet credit redemption after order creation.
 * This is called server-side in production; exposed here for
 * client-confirmed redemption flows (Prism's "optimistic" mode).
 *
 * @param {{ userId: string, orderId: string, creditsUsed: number }} params
 * @returns {Promise<{ success: boolean, new_balance: number }>}
 */
export async function redeemWalletCredits({ userId, orderId, creditsUsed }) {
  const { data } = await prismClient.post('/v1/loyalty/redeem', {
    user_id: userId,
    order_id: orderId,
    credits_used: creditsUsed,
  });
  return data;
}

/**
 * Send OTP to phone for Prism login / registration.
 *
 * @param {string} phone  — E.164 format recommended
 * @returns {Promise<{ session_token: string }>}
 */
export async function requestOtp(phone) {
  const { data } = await prismClient.post('/v1/auth/otp/request', { phone });
  return data;
}

/**
 * Verify OTP and receive authenticated user profile.
 *
 * @param {{ phone: string, otp: string, sessionToken: string }} params
 * @returns {Promise<{ user_id, name, phone, email, auth_token }>}
 */
export async function verifyOtp({ phone, otp, sessionToken }) {
  const { data } = await prismClient.post('/v1/auth/otp/verify', {
    phone,
    otp,
    session_token: sessionToken,
  });
  return data;
}
