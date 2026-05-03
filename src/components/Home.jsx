import { Link } from 'react-router-dom'
import './styles/Home.css'
import shake1 from '../Assets/Shake1HeroImage.png'
import shake2 from '../Assets/Shake2HeroImage.png'
import shake3 from '../Assets/Shake3HeroImage.png'

const FLAVORS = ['Oreo', 'Birthday Cake', 'Snickerdoodle', 'Strawberry Banana', 'Chocolate Salted Caramel', 'Banana Cream Pie']

const CATEGORIES = [
  { icon: 'fa-bolt',   title: 'Energy Bombs',             desc: 'Clean energy without the crash' },
  { icon: 'fa-blender', title: 'Protein Shakes',           desc: 'Balanced nutrition with great taste' },
  { icon: 'fa-mug-hot', title: 'Coffee & Specialty Drinks', desc: 'Fuel meets flavor' },
]

const STATS = [
  { icon: 'fa-fire',        value: '190–250',   unit: 'calories' },
  { icon: 'fa-dumbbell',    value: '~17g',      unit: 'protein' },
  { icon: 'fa-capsules',    value: '21',        unit: 'vitamins & minerals' },
]

const PILLARS = [
  { icon: 'fa-bolt',   title: 'Convenience First',    desc: 'Fast, easy options built for busy lifestyles' },
  { icon: 'fa-heart',  title: 'Flavor-Driven Menu',   desc: 'Drinks inspired by desserts, snacks, and classics' },
  { icon: 'fa-seedling', title: 'Balanced Nutrition',  desc: 'Designed to support energy, wellness, and performance' },
  { icon: 'fa-star',   title: 'Wide Variety',          desc: 'Dozens of flavor combinations and categories' },
]

export default function Home() {
  return (
    <main id="home">

      {/* ── HERO ── */}
      <section className="hero-section">
        <svg className="palm-deco" style={{ top: 55, left: -55, width: 230, opacity: .7, transform: 'rotate(-15deg)' }} viewBox="0 0 200 320">
          <path d="M100,300C80,210 20,160 5,55 5,55 62,92 100,125 100,125 76,72 100,5 100,5 124,72 100,125 138,92 195,55 195,55 180,160 120,210 100,300Z" fill="#4CAF50" />
        </svg>

        <div className="container hero-wrap">
          <div className="hero-text">
            <p className="hero-label">Blended Nutrition Rochester</p>
            <h1 className="hero-h1">
              <span className="c-teal">Delicious.</span>{' '}
              <span className="c-pink">Nutritious.</span><br />
              Convenient.
            </h1>
            <p className="hero-desc">
              Healthy shakes, energizing drinks, and feel-good nutrition made simple—so you can stay fueled on the go.
            </p>
            <div className="hero-btns">
              <Link to="/menu" className="btn btn-dark"><i className="fa fa-list" /> View Menu</Link>
              <Link to="/contact" className="btn btn-outline">Order Now</Link>
            </div>
            <div className="feat-icons">
              {[
                { icon: 'fa-bolt',    label: 'Energy' },
                { icon: 'fa-brain',   label: 'Focus' },
                { icon: 'fa-leaf',    label: 'Nutrition' },
                { icon: 'fa-heart',   label: 'Wellness' },
              ].map(({ icon, label }) => (
                <div className="feat-item" key={label}>
                  <div className="ic"><i className={`fa ${icon}`} /></div>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-glow" style={{ left: '6%',  background: 'radial-gradient(circle, rgba(26,188,188,.55) 0%, transparent 68%)' }} />
            <div className="hero-glow" style={{ left: '50%', transform: 'translateX(-50%)', width: 270, height: 270, background: 'radial-gradient(circle, rgba(255,77,126,.5) 0%, transparent 68%)' }} />
            <div className="hero-glow" style={{ right: '6%', background: 'radial-gradient(circle, rgba(245,200,66,.5) 0%, transparent 68%)' }} />
            <svg className="deco-leaf leaf-tr" viewBox="0 0 200 320">
              <path d="M100,300C80,210 20,160 5,55 5,55 62,92 100,125 100,125 76,72 100,5 100,5 124,72 100,125 138,92 195,55 195,55 180,160 120,210 100,300Z" fill="#388E3C" />
            </svg>
            <svg className="deco-leaf leaf-bl" viewBox="0 0 200 320">
              <path d="M100,300C80,210 20,160 5,55 5,55 62,92 100,125 100,125 76,72 100,5 100,5 124,72 100,125 138,92 195,55 195,55 180,160 120,210 100,300Z" fill="#43A047" />
            </svg>
            <img src={shake3} alt="Teal tropical shake"  className="cup-l anim-float-l" />
            <img src={shake1} alt="Tropical fruit shake" className="cup-c anim-float"   />
            <img src={shake2} alt="Mocha blended shake"  className="cup-r anim-float-r" />
          </div>
        </div>

        <div className="hero-stats">
          <div className="container">
            {[
              { icon: 'fa-leaf',         text: ['Plant-Based', 'Options'] },
              { icon: 'fa-mug-hot',      text: ['24+ Loaded', 'Teas'] },
              { icon: 'fa-blender',      text: ['Healthy', 'Shakes'] },
              { icon: 'fa-shield-heart', text: ['Immune', 'Support'] },
            ].map(({ icon, text }) => (
              <div className="stat-item" key={text[0]}>
                <div className="stat-ic"><i className={`fa ${icon}`} /></div>
                <div className="stat-txt">{text[0]}<br />{text[1]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ON THE GO ── */}
      <section className="otg-section">
        <div className="container otg-grid">
          <div className="otg-text">
            <p className="section-label">On the Go</p>
            <h2 className="page-h2">Nutrition That Fits<br /><em>Your Life</em></h2>
            <p className="page-body">
              Life moves fast—and your nutrition should keep up. Whether you're heading to work, the gym, or just need a quick pick-me-up, our blends are designed for convenience without compromising quality.
            </p>
            <p className="page-body">
              Order ahead, grab and go, and stay on track with your goals.
            </p>
            <Link to="/menu" className="btn btn-dark" style={{ marginTop: '1.5rem' }}>
              <i className="fa fa-arrow-right" /> Explore the Menu
            </Link>
          </div>
          <div className="otg-cards">
            {PILLARS.map(({ icon, title, desc }) => (
              <div className="pillar-card" key={title}>
                <div className="pillar-ic"><i className={`fa ${icon}`} /></div>
                <div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="cat-section">
        <div className="container">
          <div className="cat-header">
            <p className="section-label">Our Menu</p>
            <h2 className="page-h2">Find Your<br /><em>Perfect Blend</em></h2>
          </div>
          <div className="cat-grid">
            {CATEGORIES.map(({ icon, title, desc }) => (
              <div className="cat-card" key={title}>
                <div className="cat-ic"><i className={`fa ${icon}`} /></div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
          <div className="cat-cta">
            <Link to="/menu" className="btn btn-pink">
              Explore Full Menu <i className="fa fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── BUILT FOR RESULTS ── */}
      <section className="results-section">
        <div className="container results-grid">
          <div className="results-text">
            <p className="section-label">Product Quality</p>
            <h2 className="page-h2">Built for<br /><em>Results</em></h2>
            <p className="page-body">
              Our shakes are designed to give your body exactly what it needs—packed with protein, essential vitamins, and balanced macros to support your lifestyle.
            </p>
          </div>
          <div className="results-stats">
            {STATS.map(({ icon, value, unit }) => (
              <div className="result-stat" key={unit}>
                <div className="result-ic"><i className={`fa ${icon}`} /></div>
                <div className="result-value">{value}</div>
                <div className="result-unit">{unit}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLAVORS ── */}
      <section className="flavor-section">
        <div className="container">
          <div className="flavor-header">
            <p className="section-label">Flavor Variety</p>
            <h2 className="page-h2">Flavors You'll<br /><em>Actually Crave</em></h2>
            <p className="flavor-sub">
              Forget boring "healthy" drinks. Our menu is packed with flavors inspired by your favorite desserts, snacks, and treats—without the guilt.
            </p>
          </div>
          <div className="flavor-pills">
            {FLAVORS.map(f => <span className="flavor-pill" key={f}>{f}</span>)}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="final-cta-section">
        <div className="container final-cta-inner">
          <h2 className="final-cta-h2">Ready to Fuel<br /><em>Your Day?</em></h2>
          <p className="final-cta-sub">Stop by or order ahead and experience the difference.</p>
          <div className="final-cta-btns">
            <Link to="/contact" className="btn btn-pink">Order Now</Link>
            <Link to="/contact" className="btn btn-outline-light">Visit Us</Link>
          </div>
        </div>
      </section>

    </main>
  )
}
