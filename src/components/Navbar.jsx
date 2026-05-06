import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useUiStore } from '../store/uiStore'
import { useCartStore } from '../store/cartStore'
import './styles/Navbar.css'
import logo from '../Assets/BlendedLogo.webp'

const LINKS = [
  { to: '/', label: 'HOME' },
  { to: '/about', label: 'ABOUT' },
  { to: '/menu', label: 'MENU' },
  { to: '/contact', label: 'CONTACT' },
]

const navClass = ({ isActive }) => isActive ? 'active' : undefined

function CartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const { openCart } = useUiStore()
  // Read item count directly from the store (not via useCart hook) to avoid re-mounting
  const itemCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setMobileOpen(false)

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container">
          <Link to="/" className="logo">
            <img src={logo} alt="Blended Logo" className="navbar-logo" />
          </Link>

          <ul className="nav-links">
            {LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} end={to === '/'} className={navClass}>{label}</NavLink>
              </li>
            ))}
          </ul>

          <div className="nav-right">
            <button
              className="nav-cart-btn"
              onClick={openCart}
              aria-label={`Open cart${itemCount > 0 ? `, ${itemCount} item${itemCount !== 1 ? 's' : ''}` : ''}`}
            >
              <CartIcon />
              {itemCount > 0 && <span className="nav-cart-badge">{itemCount}</span>}
            </button>
            <Link to="/menu" className="nav-btn">ORDER NOW</Link>
          </div>

          <div className="nav-right-mobile">
            <button
              className="nav-cart-btn"
              onClick={openCart}
              aria-label="Open cart"
            >
              <CartIcon />
              {itemCount > 0 && <span className="nav-cart-badge">{itemCount}</span>}
            </button>
            <button
              className="hamburger"
              onClick={() => setMobileOpen(o => !o)}
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <span>&times;</span> : <span>&#9776;</span>}
            </button>
          </div>
        </div>
      </nav>

      <div className={`mob-nav${mobileOpen ? ' open' : ''}`}>
        {LINKS.map(({ to, label }) => (
          <NavLink key={to} to={to} end={to === '/'} className={navClass} onClick={close}>
            {label}
          </NavLink>
        ))}
        <Link
          to="/menu"
          className="nav-btn"
          style={{ textAlign: 'center', marginTop: '1rem', padding: '1rem' }}
          onClick={close}
        >
          ORDER NOW
        </Link>
      </div>
    </>
  )
}
