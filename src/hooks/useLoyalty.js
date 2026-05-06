/**
 * useLoyalty — Prism loyalty/wallet hook
 *
 * Fetches the authenticated user's wallet balance and reward points,
 * then exposes helpers for applying credits at checkout.
 *
 * Designed to be mounted in the Checkout component — it does NOT auto-fetch
 * on app boot to avoid unauthenticated Prism calls.
 *
 * Usage:
 *   const { walletBalance, rewardPoints, maxRedeemable, applyCredits, isLoading } = useLoyalty(orderTotal);
 */

import { useState, useEffect, useCallback } from 'react';
import { useUserStore } from '../store/userStore';
import {
  fetchLoyaltyWallet,
  validateWalletRedemption,
  redeemWalletCredits,
} from '../services/loyaltyService';

/**
 * @param {number} [orderTotal=0]  — current cart subtotal, used to compute max redeemable
 */
export function useLoyalty(orderTotal = 0) {
  const { userId, isAuthenticated } = useUserStore();

  const [walletBalance, setWalletBalance] = useState(0);
  const [rewardPoints, setRewardPoints] = useState(0);
  const [tier, setTier] = useState(null);
  const [maxRedeemable, setMaxRedeemable] = useState(0);
  const [appliedCredits, setAppliedCredits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch wallet on mount (only if authenticated)
  useEffect(() => {
    if (!isAuthenticated()) return;

    let cancelled = false;
    setIsLoading(true);

    fetchLoyaltyWallet(userId)
      .then((data) => {
        if (cancelled) return;
        setWalletBalance(data.wallet_balance ?? 0);
        setRewardPoints(data.reward_points ?? 0);
        setTier(data.tier ?? null);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Re-validate max redeemable whenever order total changes
  useEffect(() => {
    if (!isAuthenticated() || orderTotal <= 0) return;

    validateWalletRedemption({ userId, orderTotal })
      .then((data) => setMaxRedeemable(data.max_redeemable ?? 0))
      .catch(() => setMaxRedeemable(0));
  }, [userId, orderTotal]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Toggle wallet credit application.
   * Applies the maximum redeemable amount or removes if already applied.
   */
  const toggleCredits = useCallback(() => {
    setAppliedCredits((prev) => (prev > 0 ? 0 : maxRedeemable));
  }, [maxRedeemable]);

  /**
   * Confirm redemption after order is placed.
   * Called by useCart.placeOrder() — pass the returned orderId.
   *
   * @param {string} orderId
   */
  const confirmRedemption = useCallback(
    async (orderId) => {
      if (appliedCredits <= 0) return;
      await redeemWalletCredits({ userId, orderId, creditsUsed: appliedCredits });
      setWalletBalance((prev) => prev - appliedCredits);
      setAppliedCredits(0);
    },
    [userId, appliedCredits],
  );

  return {
    walletBalance,
    rewardPoints,
    tier,
    maxRedeemable,
    appliedCredits,
    isLoading,
    error,
    toggleCredits,
    confirmRedemption,
  };
}
