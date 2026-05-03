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
          <button className="hamburger" onClick={() => setMobileOpen(o => !o)}>&#9776;</button>
        </div>
      </nav>

      <div className={`mob-nav${mobileOpen ? ' open' : ''}`}>
        {LINKS.map(({ to, label }) => (
          <NavLink key={to} to={to} end={to === '/'} className={navClass} onClick={close}>
            {label}
          </NavLink>
        ))}
        <Link to="/menu" className="btn btn-pink" style={{ textAlign: 'center' }} onClick={close}>
          ORDER NOW
        </Link>
      </div>
    </>
  )
}
