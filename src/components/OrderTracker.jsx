import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getOrderStatus } from '../services/orderService'
import './styles/OrderTracker.css'

const POLL_INTERVAL = 30_000 // 30 seconds

const STATUS_META = {
  CONFIRMED:  { label: 'Order Confirmed',  color: 'var(--teal)',   step: 1 },
  PREPARING:  { label: 'Preparing',        color: '#f59e0b',       step: 2 },
  READY:      { label: 'Ready for Pickup', color: '#22c55e',       step: 3 },
  DELIVERED:  { label: 'Delivered',        color: 'var(--gray)',   step: 4 },
  CANCELLED:  { label: 'Cancelled',        color: 'var(--pink)',   step: 0 },
}

const STEPS = [
  { key: 'CONFIRMED', label: 'Confirmed' },
  { key: 'PREPARING', label: 'Preparing' },
  { key: 'READY',     label: 'Ready' },
  { key: 'DELIVERED', label: 'Delivered' },
]

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function OrderTracker() {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchStatus = useCallback(async () => {
    try {
      const data = await getOrderStatus(orderId)
      setOrder(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }, [orderId])

  // Initial fetch + polling
  useEffect(() => {
    fetchStatus()
    const interval = setInterval(fetchStatus, POLL_INTERVAL)
    return () => clearInterval(interval)
  }, [fetchStatus])

  // Stop polling once the order reaches a terminal state
  useEffect(() => {
    if (order?.status === 'DELIVERED' || order?.status === 'CANCELLED') return
    const interval = setInterval(fetchStatus, POLL_INTERVAL)
    return () => clearInterval(interval)
  }, [order?.status, fetchStatus])

  const meta = order ? (STATUS_META[order.status] ?? STATUS_META.CONFIRMED) : null
  const currentStep = meta?.step ?? 0

  return (
    <>
      <Helmet>
        <title>Order Status — Blended Nutrition</title>
      </Helmet>

      <main className="tracker-page">
        <div className="container">

          {/* Header */}
          <div className="tr-header">
            <p className="section-label">Live Tracking</p>
            <h1 className="tr-h1">Order Status</h1>
            <p className="tr-order-id">#{orderId}</p>
          </div>

          {isLoading && !order && (
            <div className="tr-skeleton-wrap">
              <div className="skeleton" style={{ height: 180, borderRadius: 20 }} />
              <div className="skeleton" style={{ height: 120, borderRadius: 20, marginTop: '1.5rem' }} />
            </div>
          )}

          {error && (
            <div className="tr-error">
              <p>{error}</p>
              <button className="btn btn-dark" onClick={fetchStatus}>Retry</button>
            </div>
          )}

          {order && (
            <>
              {/* Status hero card */}
              <div className="tr-status-card" style={{ '--status-color': meta.color }}>
                <div className="tr-status-dot" />
                <div>
                  <p className="tr-status-label">Current Status</p>
                  <p className="tr-status-text">{meta.label}</p>
                </div>
                {order.status !== 'DELIVERED' && order.status !== 'CANCELLED' && order.eta_minutes > 0 && (
                  <div className="tr-eta">
                    <p className="tr-eta-num">{order.eta_minutes}</p>
                    <p className="tr-eta-unit">min est.</p>
                  </div>
                )}
              </div>

              {/* Progress stepper */}
              {order.status !== 'CANCELLED' && (
                <div className="tr-steps">
                  {STEPS.map((step, idx) => {
                    const done = currentStep > idx + 1
                    const active = currentStep === idx + 1
                    return (
                      <div key={step.key} className={`tr-step${done ? ' done' : ''}${active ? ' active' : ''}`}>
                        <div className="tr-step-dot">
                          {done ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          ) : (
                            <span>{idx + 1}</span>
                          )}
                        </div>
                        {idx < STEPS.length - 1 && <div className={`tr-connector${done ? ' done' : ''}`} />}
                        <p className="tr-step-label">{step.label}</p>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Timeline */}
              {order.timeline?.length > 0 && (
                <div className="tr-timeline-wrap">
                  <h2 className="tr-section-title">Order Timeline</h2>
                  <ul className="tr-timeline">
                    {order.timeline.map((event, i) => (
                      <li key={i} className="tr-tl-item">
                        <div className="tr-tl-dot" />
                        <div className="tr-tl-body">
                          <p className="tr-tl-status">
                            {STATUS_META[event.status]?.label ?? event.status}
                          </p>
                          <p className="tr-tl-time">{formatTime(event.timestamp)}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="tr-actions">
                <Link to="/menu" className="btn btn-dark">Order Again</Link>
                <Link to="/" className="btn btn-outline">Back to Home</Link>
              </div>
            </>
          )}

        </div>
      </main>
    </>
  )
}
