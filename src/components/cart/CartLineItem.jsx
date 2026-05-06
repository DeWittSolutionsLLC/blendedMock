import { useCart } from '../../hooks/useCart'
import { formatPrice } from '../../utils/format'

/** Computes the total price for one cart entry including modifiers. */
function lineTotal(cartItem) {
  const modExtra = Object.values(cartItem.selectedModifiers)
    .flat()
    .reduce((s, opt) => s + (opt.price ?? 0), 0)
  return (cartItem.item.price + modExtra) * cartItem.quantity
}

/** One-line summary of selected modifier options for display in the drawer. */
function modifierSummary(selectedModifiers) {
  const labels = Object.values(selectedModifiers).flat().map((o) => o.name)
  return labels.length ? labels.join(', ') : null
}

export default function CartLineItem({ cartItem }) {
  const { updateQuantity, removeItem } = useCart()
  const summary = modifierSummary(cartItem.selectedModifiers)

  return (
    <div className="cli">
      <div className="cli-info">
        <p className="cli-name">{cartItem.item.name}</p>
        {summary && <p className="cli-mods">{summary}</p>}
        <p className="cli-price">{formatPrice(lineTotal(cartItem))}</p>
      </div>

      <div className="cli-controls">
        <button
          className="cli-qty-btn"
          onClick={() => updateQuantity(cartItem.cartItemId, cartItem.quantity - 1)}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="cli-qty">{cartItem.quantity}</span>
        <button
          className="cli-qty-btn"
          onClick={() => updateQuantity(cartItem.cartItemId, cartItem.quantity + 1)}
          aria-label="Increase quantity"
        >
          +
        </button>
        <button
          className="cli-remove"
          onClick={() => removeItem(cartItem.cartItemId)}
          aria-label="Remove item"
        >
          {/* trash icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
          </svg>
        </button>
      </div>
    </div>
  )
}
