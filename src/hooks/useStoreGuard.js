/**
 * useStoreGuard — Multi-location route protection hook
 *
 * Ensures the user has selected a store before accessing any
 * page that requires a scoped store context (menu, checkout, etc.).
 *
 * Usage in a route-level component:
 *   const { isReady, selectedStore } = useStoreGuard({ redirectTo: '/locations' });
 *
 * If no store is selected, navigates to `redirectTo` automatically so
 * the user can pick a location. The hook returns `isReady: false` during
 * that redirect, letting the component render null or a skeleton.
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoreLocationStore } from '../store/storeLocationStore';

/**
 * @param {{ redirectTo?: string }} [options]
 */
export function useStoreGuard({ redirectTo = '/locations' } = {}) {
  const navigate = useNavigate();
  const selectedStoreId = useStoreLocationStore((s) => s.selectedStoreId);
  const selectedStoreDetails = useStoreLocationStore((s) => s.selectedStoreDetails);

  const isReady = Boolean(selectedStoreId);

  useEffect(() => {
    if (!isReady) {
      navigate(redirectTo, { replace: true });
    }
  }, [isReady, navigate, redirectTo]);

  return {
    isReady,
    selectedStoreId,
    selectedStore: selectedStoreDetails,
  };
}
