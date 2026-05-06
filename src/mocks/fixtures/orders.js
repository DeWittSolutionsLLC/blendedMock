/**
 * Mock order fixtures — mirrors uEngage Edge /v1/orders responses.
 */

export const mockCreateOrderResponse = {
  order_id: 'ord-mock-8821',
  status: 'PENDING_PAYMENT',
  total: 1050,
  // uEngage hosted payment page — in mock mode we send to our own /order/return
  // with pre-filled query params so the full redirect loop can be tested locally.
  payment_url: `${window.location.origin}/order/return?order_id=ord-mock-8821&status=paid&transaction_id=txn-mock-001`,
};

export const mockOrderStatusResponse = {
  order_id: 'ord-mock-8821',
  status: 'PREPARING',
  eta_minutes: 8,
  timeline: [
    { status: 'CONFIRMED', timestamp: new Date(Date.now() - 60000).toISOString() },
    { status: 'PREPARING', timestamp: new Date().toISOString() },
  ],
};
