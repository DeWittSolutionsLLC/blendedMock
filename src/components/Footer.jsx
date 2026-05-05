import './styles/Footer.css'
import logo from '../assets/BlendedLogo.png'
export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="foot-logo"><img className="foot-logo-img" src={logo} alt="Blended Logo" /></div>
        <div className="foot-tag">Nutrition Rochester &mdash; Tropical Nutrition. Real Results.</div>
        <div className="foot-copy">&copy; 2025 Blended Nutrition Rochester. All rights reserved.</div>
      </div>
    </footer>
  )
}
