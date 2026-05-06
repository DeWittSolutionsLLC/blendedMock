/**
 * OrderReturn — Payment redirect landing page
 * Route: /order/return
 *
 * uEngage redirects here after the hosted payment page completes.
 * Query params (set by uEngage):
 *   order_id       — the order reference
 *   status         — 'paid' | 'failed' | 'cancelled'
 *   transaction_id — payment gateway transaction reference
 */

import { useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import './styles/OrderReturn.css'

const STATUS_MAP = {
  paid:      { success: true,  heading: 'Payment Confirmed!',  sub: 'Your order is being prepared.' },
  success:   { success: true,  heading: 'Payment Confirmed!',  sub: 'Your order is being prepared.' },
  failed:    { success: false, heading: 'Payment Failed',       sub: 'Your card was not charged. Please try again.' },
  cancelled: { success: false, heading: 'Payment Cancelled',    sub: 'You cancelled the payment. Your cart has been cleared.' },
}

export default function OrderReturn() {
  const [params] = useSearchParams()
  const orderId     = params.get('order_id') || sessionStorage.getItem('pending_order_id')
  const status      = params.get('status') ?? 'failed'
  const transaction = params.get('transaction_id')

  const meta = STATUS_MAP[status] ?? STATUS_MAP.failed

  // Clear the pending order from session once we've landed here
  useEffect(() => {
    sessionStorage.removeItem('pending_order_id')
  }, [])

  return (
    <>
      <Helmet>
        <title>{meta.heading} — Blended Nutrition</title>
      </Helmet>

      <main className="or-page">
        <div className="container">
          <div className="or-card">

            {/* Icon */}
            <div className={`or-icon${meta.success ? ' success' : ' fail'}`}>
              {meta.success ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              )}
            </div>

            <h1 className="or-heading">{meta.heading}</h1>
            <p className="or-sub">{meta.sub}</p>

            {/* Order details */}
            {orderId && (
              <div className="or-details">
                <div className="or-detail-row">
                  <span>Order</span>
                  <span className="or-detail-val">#{orderId}</span>
                </div>
                {transaction && (
                  <div className="or-detail-row">
                    <span>Transaction</span>
                    <span className="or-detail-val">{transaction}</span>
                  </div>
                )}
                <div className="or-detail-row">
                  <span>Status</span>
                  <span className={`or-status-pill${meta.success ? ' paid' : ' fail'}`}>
                    {status.toUpperCase()}
                  </span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="or-actions">
              {meta.success && orderId ? (
                <>
                  <Link to={`/order/${orderId}`} className="btn btn-dark">
                    Track My Order
                  </Link>
                  <Link to="/menu" className="btn btn-outline">Order Again</Link>
                </>
              ) : (
                <>
                  <Link to="/checkout" className="btn btn-pink">Try Again</Link>
                  <Link to="/menu" className="btn btn-outline">Back to Menu</Link>
                </>
              )}
            </div>

          </div>
        </div>
      </main>
    </>
  )
}
