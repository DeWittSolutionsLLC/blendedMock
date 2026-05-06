/**
 * MSW Request Handlers
 *
 * Each handler intercepts a real outbound Axios request and returns fixture data.
 * The URL patterns must match the baseURLs in apiClient.js:
 *   Edge  → VITE_UENGAGE_EDGE_URL  (defaulted to https://api.uengage.in/edge in dev)
 *   Prism → VITE_UENGAGE_PRISM_URL (defaulted to https://api.uengage.in/prism in dev)
 *
 * To simulate an error for a specific endpoint, change `res(ctx.json(...))` to
 * `res(ctx.status(500), ctx.json({ message: 'Simulated server error' }))`.
 */

import { http, HttpResponse } from 'msw';
import { mockMenuResponse } from './fixtures/menu';
import {
  mockWalletResponse,
  mockRedemptionValidation,
  mockRedeemResponse,
  mockOtpRequestResponse,
  mockOtpVerifyResponse,
} from './fixtures/loyalty';
import { mockCreateOrderResponse, mockOrderStatusResponse } from './fixtures/orders';

// When env vars are absent, Axios sends to the current origin (e.g. localhost:5173).
// Using window.location.origin as the fallback ensures handlers intercept those same URLs.
// When real API URLs are configured, both Axios and the handlers use them consistently.
const EDGE = import.meta.env.VITE_UENGAGE_EDGE_URL || window.location.origin;
const PRISM = import.meta.env.VITE_UENGAGE_PRISM_URL || window.location.origin;

export const handlers = [

  // -------------------------------------------------------------------------
  // Edge — Menu
  // -------------------------------------------------------------------------
  http.get(`${EDGE}/v1/menu`, () => {
    return HttpResponse.json(mockMenuResponse);
  }),

  http.get(`${EDGE}/v1/menu/items/:itemId`, ({ params }) => {
    const allItems = mockMenuResponse.categories.flatMap((c) => c.items);
    const item = allItems.find((i) => i.id === params.itemId);
    if (!item) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(item);
  }),

  // -------------------------------------------------------------------------
  // Edge — Orders
  // -------------------------------------------------------------------------
  http.post(`${EDGE}/v1/orders`, () => {
    // Simulate a brief network delay so loading states are testable
    return HttpResponse.json(mockCreateOrderResponse);
  }),

  http.get(`${EDGE}/v1/orders/:orderId`, () => {
    return HttpResponse.json(mockOrderStatusResponse);
  }),

  http.get(`${EDGE}/v1/orders/history`, () => {
    return HttpResponse.json({ orders: [], total: 0 });
  }),

  // -------------------------------------------------------------------------
  // Prism — Auth (OTP)
  // -------------------------------------------------------------------------
  http.post(`${PRISM}/v1/auth/otp/request`, () => {
    return HttpResponse.json(mockOtpRequestResponse);
  }),

  http.post(`${PRISM}/v1/auth/otp/verify`, () => {
    return HttpResponse.json(mockOtpVerifyResponse);
  }),

  // -------------------------------------------------------------------------
  // Prism — Loyalty / Wallet
  // -------------------------------------------------------------------------
  http.get(`${PRISM}/v1/loyalty/wallet`, () => {
    return HttpResponse.json(mockWalletResponse);
  }),

  http.post(`${PRISM}/v1/loyalty/validate-redemption`, () => {
    return HttpResponse.json(mockRedemptionValidation);
  }),

  http.post(`${PRISM}/v1/loyalty/redeem`, () => {
    return HttpResponse.json(mockRedeemResponse);
  }),
];
