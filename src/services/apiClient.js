/**
 * Axios API Client — uEngage Edge + Prism
 *
 * All services import this singleton. The request interceptor injects:
 *   - X-Engage-Api-Key  (required by every uEngage endpoint)
 *   - X-Store-Id        (scoped from storeLocationStore so callers don't repeat it)
 *
 * Base URLs are read from Vite env vars so they never touch source:
 *   VITE_UENGAGE_EDGE_URL   — Edge ordering API root
 *   VITE_UENGAGE_PRISM_URL  — Prism CRM / loyalty API root
 *   VITE_UENGAGE_API_KEY    — shared API key (rotate via env, not code)
 */

import axios from 'axios';
import { useStoreLocationStore } from '../store/storeLocationStore';

// ---------------------------------------------------------------------------
// Edge client  (menu, orders, catalogue)
// ---------------------------------------------------------------------------
export const edgeClient = axios.create({
  baseURL: import.meta.env.VITE_UENGAGE_EDGE_URL,
  timeout: 12000,
  headers: { 'Content-Type': 'application/json' },
});

// ---------------------------------------------------------------------------
// Prism client  (loyalty, wallet, CRM)
// ---------------------------------------------------------------------------
export const prismClient = axios.create({
  baseURL: import.meta.env.VITE_UENGAGE_PRISM_URL,
  timeout: 12000,
  headers: { 'Content-Type': 'application/json' },
});

// ---------------------------------------------------------------------------
// Shared request interceptor factory
// Injects auth key and the currently-selected store on every outbound request.
// ---------------------------------------------------------------------------
function attachAuthMiddleware(client) {
  client.interceptors.request.use(
    (config) => {
      config.headers['X-Engage-Api-Key'] = import.meta.env.VITE_UENGAGE_API_KEY;

      // Pull store id from Zustand outside of React (getState() is synchronous)
      const storeId = useStoreLocationStore.getState().selectedStoreId;
      if (storeId) {
        config.headers['X-Store-Id'] = storeId;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );
}

// ---------------------------------------------------------------------------
// Shared response interceptor factory
// Normalises uEngage error envelopes into a consistent JS Error shape
// so consuming hooks never need to parse raw API error payloads.
// ---------------------------------------------------------------------------
function attachErrorNormaliser(client) {
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      const apiMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message ||
        'An unknown API error occurred.';

      const normalisedError = new Error(apiMessage);
      normalisedError.status = error?.response?.status ?? null;
      normalisedError.raw = error?.response?.data ?? null;

      return Promise.reject(normalisedError);
    },
  );
}

attachAuthMiddleware(edgeClient);
attachAuthMiddleware(prismClient);
attachErrorNormaliser(edgeClient);
attachErrorNormaliser(prismClient);
