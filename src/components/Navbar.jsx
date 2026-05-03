import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import './styles/Navbar.css'

const LINKS = [
  { to: '/', label: 'HOME' },
  { to: '/about', label: 'ABOUT' },
  { to: '/menu', label: 'MENU' },
  { to: '/contact', label: 'CONTACT' },
]

const navClass = ({ isActive }) => isActive ? 'active' : undefined

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

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
            <div className="logo-script">Blended 🌴</div>
            <div className="logo-sub">Nutrition · Rochester</div>
          </Link>

          <ul className="nav-links">
            {LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} end={to === '/'} className={navClass}>{label}</NavLink>
              </li>
            ))}
          </ul>

          <Link to="/menu" className="nav-btn">ORDER NOW</Link>
          <button 
            className="hamburger" 
            onClick={() => setMobileOpen(o => !o)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <span>&times;</span> : <span>&#9776;</span>}
          </button>
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
