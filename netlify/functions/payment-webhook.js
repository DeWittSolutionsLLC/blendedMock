/**
 * Netlify Function: payment-webhook
 * Endpoint: /.netlify/functions/payment-webhook
 *
 * uEngage POSTs a signed event here after payment completes or fails.
 * Configure this URL in the uEngage merchant dashboard under
 * Settings → Integrations → Webhook URL.
 *
 * Verification: uEngage signs each request with an HMAC-SHA256 digest
 * of the raw body using your webhook secret. Set UENGAGE_WEBHOOK_SECRET
 * as an environment variable in Netlify (Site settings → Environment variables).
 *
 * Expected payload shape:
 * {
 *   event:          'PAYMENT_SUCCESS' | 'PAYMENT_FAILED' | 'ORDER_CANCELLED',
 *   order_id:       string,
 *   transaction_id: string,
 *   amount:         number,   // in cents
 *   store_id:       string,
 *   timestamp:      string,   // ISO 8601
 * }
 */

const crypto = require('crypto');

function verifySignature(rawBody, receivedSig, secret) {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');
  // Constant-time comparison prevents timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(expected, 'hex'),
    Buffer.from(receivedSig, 'hex'),
  );
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const secret = process.env.UENGAGE_WEBHOOK_SECRET;
  const signature = event.headers['x-uengage-signature'] ?? '';
  const rawBody = event.body ?? '';

  // Skip verification in development (secret not configured)
  if (secret) {
    try {
      if (!verifySignature(rawBody, signature, secret)) {
        console.error('[webhook] Invalid signature — request rejected');
        return { statusCode: 401, body: 'Unauthorized' };
      }
    } catch {
      return { statusCode: 401, body: 'Unauthorized' };
    }
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { event: eventType, order_id, transaction_id, amount } = payload;

  console.log(`[webhook] ${eventType} — order: ${order_id}, tx: ${transaction_id}, amount: ${amount}`);

  switch (eventType) {
    case 'PAYMENT_SUCCESS':
      // TODO: mark order as paid in your DB / send confirmation email
      break;
    case 'PAYMENT_FAILED':
      // TODO: flag order for retry or notify customer
      break;
    case 'ORDER_CANCELLED':
      // TODO: trigger refund flow if payment was already captured
      break;
    default:
      console.warn(`[webhook] Unhandled event type: ${eventType}`);
  }

  // Always return 200 — uEngage will retry on non-2xx responses
  return { statusCode: 200, body: 'OK' };
};
