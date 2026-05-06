import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useCart } from '../hooks/useCart'
import { useLoyalty } from '../hooks/useLoyalty'
import { useUserStore } from '../store/userStore'
import { useStoreLocationStore } from '../store/storeLocationStore'
import { formatPrice } from '../utils/format'
import './styles/Checkout.css'

const ORDER_TYPES = [
  { value: 'PICKUP', label: 'Pickup' },
  { value: 'DINE_IN', label: 'Dine In' },
  { value: 'DELIVERY', label: 'Delivery' },
]

const INITIAL_FORM = { name: '', phone: '', email: '', orderType: 'PICKUP', notes: '' }

export default function Checkout() {
  const navigate = useNavigate()
  const { items, subtotal, isPlacingOrder, isRedirecting, orderError, placeOrder } = useCart()
  const { userId, name: savedName, phone: savedPhone, email: savedEmail } = useUserStore()
  const { selectedStoreDetails } = useStoreLocationStore()

  // Loyalty
  const {
    walletBalance, rewardPoints, tier, maxRedeemable,
    appliedCredits, toggleCredits, confirmRedemption, isLoading: loyaltyLoading,
  } = useLoyalty(subtotal)

  const [form, setForm] = useState({
    ...INITIAL_FORM,
    name: savedName ?? '',
    phone: savedPhone ?? '',
    email: savedEmail ?? '',
  })
  const [validationErrors, setValidationErrors] = useState({})

  // Redirect to menu if cart is empty
  useEffect(() => {
    if (items.length === 0) navigate('/menu', { replace: true })
  }, [items.length, navigate])

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setValidationErrors((e) => ({ ...e, [name]: undefined }))
  }

  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required.'
    if (!form.phone.trim()) errs.phone = 'Phone number is required.'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Enter a valid email address.'
    }
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setValidationErrors(errs); return }

    try {
      const orderId = await placeOrder({
        customer: { name: form.name, phone: form.phone, email: form.email },
        orderType: form.orderType,
        walletCredits: appliedCredits,
        notes: form.notes,
      })
      // Confirm wallet redemption if credits were applied
      if (appliedCredits > 0) await confirmRedemption(orderId)
      navigate(`/order/${orderId}`)
    } catch {
      // orderError is set by useCart — rendered below
    }
  }

  const discount = appliedCredits
  const total = Math.max(0, subtotal - discount)

  return (
    <>
      <Helmet>
        <title>Checkout — Blended Nutrition</title>
      </Helmet>

      <main className="checkout-page">
        <div className="container">
          <div className="co-grid">

            {/* ── LEFT: Form ── */}
            <section className="co-form-col">
              <p className="section-label">Step 1</p>
              <h1 className="co-h1">Your Details</h1>
              <div className="divider-bar" />

              {selectedStoreDetails && (
                <div className="co-store-badge">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{selectedStoreDetails.name ?? 'Selected Location'}</span>
                </div>
              )}

              <form className="co-form" onSubmit={handleSubmit} noValidate>

                {/* Customer info */}
                <div className="co-field-group">
                  <div className={`co-field${validationErrors.name ? ' error' : ''}`}>
                    <label htmlFor="co-name">Full Name *</label>
                    <input
                      id="co-name" name="name" type="text"
                      placeholder="Alex Chen"
                      value={form.name} onChange={handleChange}
                      autoComplete="name"
                    />
                    {validationErrors.name && <span className="co-err">{validationErrors.name}</span>}
                  </div>
                  <div className={`co-field${validationErrors.phone ? ' error' : ''}`}>
                    <label htmlFor="co-phone">Phone Number *</label>
                    <input
                      id="co-phone" name="phone" type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={form.phone} onChange={handleChange}
                      autoComplete="tel"
                    />
                    {validationErrors.phone && <span className="co-err">{validationErrors.phone}</span>}
                  </div>
                  <div className={`co-field${validationErrors.email ? ' error' : ''}`}>
                    <label htmlFor="co-email">Email <span className="co-optional">(optional)</span></label>
                    <input
                      id="co-email" name="email" type="email"
                      placeholder="alex@example.com"
                      value={form.email} onChange={handleChange}
                      autoComplete="email"
                    />
                    {validationErrors.email && <span className="co-err">{validationErrors.email}</span>}
                  </div>
                </div>

                {/* Order type */}
                <div className="co-section">
                  <p className="co-section-title">Order Type</p>
                  <div className="co-type-group">
                    {ORDER_TYPES.map(({ value, label }) => (
                      <label key={value} className={`co-type-pill${form.orderType === value ? ' active' : ''}`}>
                        <input
                          type="radio" name="orderType" value={value}
                          checked={form.orderType === value}
                          onChange={handleChange}
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Special notes */}
                <div className="co-field">
                  <label htmlFor="co-notes">Special Instructions <span className="co-optional">(optional)</span></label>
                  <textarea
                    id="co-notes" name="notes" rows={3}
                    placeholder="Allergy info, no ice, extra protein…"
                    value={form.notes} onChange={handleChange}
                  />
                </div>

                {/* Loyalty wallet */}
                {walletBalance > 0 && !loyaltyLoading && (
                  <div className="co-wallet">
                    <div className="co-wallet-top">
                      <div>
                        <p className="co-wallet-label">
                          {tier && <span className="co-tier">{tier}</span>} Wallet Balance
                        </p>
                        <p className="co-wallet-bal">{formatPrice(walletBalance)}</p>
                        <p className="co-wallet-pts">{rewardPoints} reward points</p>
                      </div>
                      <button
                        type="button"
                        className={`co-wallet-toggle${appliedCredits > 0 ? ' applied' : ''}`}
                        onClick={toggleCredits}
                        disabled={maxRedeemable === 0}
                      >
                        {appliedCredits > 0 ? `− ${formatPrice(appliedCredits)}` : 'Apply Credits'}
                      </button>
                    </div>
                    {appliedCredits > 0 && (
                      <p className="co-wallet-note">
                        {formatPrice(appliedCredits)} will be deducted from your wallet.
                      </p>
                    )}
                  </div>
                )}

                {orderError && <p className="co-error-banner">{orderError}</p>}

                <button
                  type="submit"
                  className="btn btn-pink co-submit"
                  disabled={isPlacingOrder || isRedirecting}
                >
                  {isRedirecting ? (
                    <><span className="co-spinner" /> Redirecting to payment…</>
                  ) : isPlacingOrder ? (
                    <><span className="co-spinner" /> Placing Order…</>
                  ) : (
                    `Place Order & Pay · ${formatPrice(total)}`
                  )}
                </button>
              </form>
            </section>

            {/* ── RIGHT: Order summary ── */}
            <aside className="co-summary-col">
              <p className="section-label">Order Summary</p>
              <h2 className="co-h2">Your Items</h2>
              <div className="divider-bar" />

              <ul className="co-summary-list">
                {items.map((cartItem) => {
                  const modExtra = Object.values(cartItem.selectedModifiers).flat()
                    .reduce((s, o) => s + (o.price ?? 0), 0)
                  const linePrice = (cartItem.item.price + modExtra) * cartItem.quantity
                  const modLabels = Object.values(cartItem.selectedModifiers).flat().map((o) => o.name)
                  return (
                    <li key={cartItem.cartItemId} className="co-summary-item">
                      <div className="co-si-left">
                        <span className="co-si-qty">{cartItem.quantity}×</span>
                        <div>
                          <p className="co-si-name">{cartItem.item.name}</p>
                          {modLabels.length > 0 && (
                            <p className="co-si-mods">{modLabels.join(', ')}</p>
                          )}
                        </div>
                      </div>
                      <span className="co-si-price">{formatPrice(linePrice)}</span>
                    </li>
                  )
                })}
              </ul>

              <div className="co-totals">
                <div className="co-total-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="co-total-row co-discount">
                    <span>Wallet Credits</span>
                    <span>− {formatPrice(discount)}</span>
                  </div>
                )}
                <div className="co-total-row co-grand">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </main>
    </>
  )
}
