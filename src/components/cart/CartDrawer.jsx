import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUiStore } from '../../store/uiStore'
import { useCart } from '../../hooks/useCart'
import { formatPrice } from '../../utils/format'
import CartLineItem from './CartLineItem'
import './CartDrawer.css'

export default function CartDrawer() {
  const { isCartOpen, closeCart } = useUiStore()
  const { items, subtotal } = useCart()
  const navigate = useNavigate()

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isCartOpen])

  // Close on Escape key
  useEffect(() => {
    if (!isCartOpen) return
    const onKey = (e) => { if (e.key === 'Escape') closeCart() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isCartOpen, closeCart])

  function handleCheckout() {
    closeCart()
    navigate('/checkout')
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay${isCartOpen ? ' open' : ''}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside className={`cart-drawer${isCartOpen ? ' open' : ''}`} aria-label="Shopping cart">
        {/* Header */}
        <div className="cd-header">
          <div className="cd-title">
            <svg className="cd-bag-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <span>Your Order</span>
            {items.length > 0 && (
              <span className="cd-count">{items.reduce((s, i) => s + i.quantity, 0)}</span>
            )}
          </div>
          <button className="cd-close" onClick={closeCart} aria-label="Close cart">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="cd-body">
          {items.length === 0 ? (
            <div className="cd-empty">
              <div className="cd-empty-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
              </div>
              <p className="cd-empty-title">Your cart is empty</p>
              <p className="cd-empty-sub">Add items from the menu to get started.</p>
              <button className="btn btn-dark" style={{ marginTop: '1.5rem' }} onClick={closeCart}>
                Browse Menu
              </button>
            </div>
          ) : (
            <ul className="cd-list">
              {items.map((item) => (
                <li key={item.cartItemId}>
                  <CartLineItem cartItem={item} />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer — only when cart has items */}
        {items.length > 0 && (
          <div className="cd-footer">
            <div className="cd-subtotal">
              <span>Subtotal</span>
              <span className="cd-subtotal-amt">{formatPrice(subtotal)}</span>
            </div>
            <p className="cd-tax-note">Tax &amp; fees calculated at checkout</p>
            <button className="btn btn-pink cd-checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
