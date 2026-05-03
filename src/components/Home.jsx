import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section id="home">
      {/* corner palm */}
      <svg className="palm-deco" style={{ top: 55, left: -55, width: 230, opacity: .7, transform: 'rotate(-15deg)' }} viewBox="0 0 200 320">
        <path d="M100,300C80,210 20,160 5,55 5,55 62,92 100,125 100,125 76,72 100,5 100,5 124,72 100,125 138,92 195,55 195,55 180,160 120,210 100,300Z" fill="#4CAF50" />
      </svg>

      <div className="container hero-wrap">
        {/* Text */}
        <div className="hero-text">
          <p className="hero-label">Tropical Nutrition. Real Results.</p>
          <h1 className="hero-h1">
            <span className="c-teal">Refresh.</span><br />
            <span className="c-pink">Recharge.</span><br />
            Be Well.
          </h1>
          <p className="hero-desc">
            Nutrient-packed shakes, energizing teas, and wellness boosts inspired by the tropics and made for you.
          </p>
          <div className="hero-btns">
            <Link to="/menu" className="btn btn-dark"><i className="fa fa-bag-shopping" /> Order Now</Link>
            <Link to="/about" className="btn btn-outline">Learn More</Link>
          </div>
          <div className="feat-icons">
            {[
              { icon: 'fa-bolt', label: 'Energy' },
              { icon: 'fa-brain', label: 'Focus' },
              { icon: 'fa-leaf', label: 'Nutrition' },
              { icon: 'fa-heart', label: 'Wellness' },
            ].map(({ icon, label }) => (
              <div className="feat-item" key={label}>
                <div className="ic"><i className={`fa ${icon}`} /></div>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cups visual */}
        <div className="hero-visual">
          <svg className="deco-leaf leaf-tr" viewBox="0 0 200 320">
            <path d="M100,300C80,210 20,160 5,55 5,55 62,92 100,125 100,125 76,72 100,5 100,5 124,72 100,125 138,92 195,55 195,55 180,160 120,210 100,300Z" fill="#388E3C" />
          </svg>
          <svg className="deco-leaf leaf-bl" viewBox="0 0 200 320">
            <path d="M100,300C80,210 20,160 5,55 5,55 62,92 100,125 100,125 76,72 100,5 100,5 124,72 100,125 138,92 195,55 195,55 180,160 120,210 100,300Z" fill="#43A047" />
          </svg>

          {/* Left – teal */}
          <svg className="cup-l anim-float-l" viewBox="0 0 140 245">
            <defs>
              <linearGradient id="cT" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#90E8E8" /><stop offset="100%" stopColor="#1ABCBC" />
              </linearGradient>
            </defs>
            <rect x="68" y="0" width="7" height="58" rx="3.5" fill="#2BBFBF" />
            <ellipse cx="71" cy="66" rx="28" ry="9" fill="white" opacity=".92" />
            <ellipse cx="71" cy="62" rx="19" ry="6.5" fill="white" />
            <ellipse cx="71" cy="59" rx="11" ry="4" fill="white" />
            <ellipse cx="71" cy="76" rx="38" ry="11" fill="#5DDADA" />
            <path d="M33,76 L54,232 L88,232 L109,76Z" fill="url(#cT)" />
            <path d="M43,82 L48,224 L54,224 L49,82Z" fill="rgba(255,255,255,.28)" />
            <text x="71" y="155" textAnchor="middle" fill="rgba(255,255,255,.9)" fontSize="6.5" fontFamily="sans-serif" fontWeight="bold">Blended</text>
            <text x="71" y="165" textAnchor="middle" fill="rgba(255,255,255,.75)" fontSize="4.5" fontFamily="sans-serif">NUTRITION</text>
            <text x="71" y="173" textAnchor="middle" fill="rgba(255,255,255,.75)" fontSize="4.5" fontFamily="sans-serif">ROCHESTER</text>
          </svg>

          {/* Center – pink */}
          <svg className="cup-c anim-float" viewBox="0 0 160 265">
            <defs>
              <linearGradient id="cP" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFAABB" /><stop offset="100%" stopColor="#FF6B8A" />
              </linearGradient>
            </defs>
            <rect x="77" y="0" width="8" height="68" rx="4" fill="#FF8FA0" />
            <ellipse cx="81" cy="78" rx="34" ry="11" fill="white" opacity=".93" />
            <ellipse cx="81" cy="73" rx="23" ry="8" fill="white" />
            <ellipse cx="81" cy="69" rx="14" ry="5" fill="white" />
            <ellipse cx="81" cy="89" rx="44" ry="12.5" fill="#FF9AB3" />
            <path d="M37,89 L60,252 L102,252 L125,89Z" fill="url(#cP)" />
            <path d="M48,96 L54,244 L60,244 L54,96Z" fill="rgba(255,255,255,.28)" />
            <text x="81" y="170" textAnchor="middle" fill="rgba(255,255,255,.9)" fontSize="7.5" fontFamily="sans-serif" fontWeight="bold">Blended</text>
            <text x="81" y="181" textAnchor="middle" fill="rgba(255,255,255,.75)" fontSize="5" fontFamily="sans-serif">NUTRITION</text>
            <text x="81" y="190" textAnchor="middle" fill="rgba(255,255,255,.75)" fontSize="5" fontFamily="sans-serif">ROCHESTER</text>
          </svg>

          {/* Right – yellow */}
          <svg className="cup-r anim-float-r" viewBox="0 0 140 245">
            <defs>
              <linearGradient id="cY" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFE88A" /><stop offset="100%" stopColor="#F5C230" />
              </linearGradient>
            </defs>
            <rect x="68" y="0" width="7" height="58" rx="3.5" fill="#FFD040" />
            <ellipse cx="71" cy="66" rx="28" ry="9" fill="white" opacity=".92" />
            <ellipse cx="71" cy="62" rx="19" ry="6.5" fill="white" />
            <ellipse cx="71" cy="59" rx="11" ry="4" fill="white" />
            <ellipse cx="71" cy="76" rx="38" ry="11" fill="#FFE060" />
            <path d="M33,76 L54,232 L88,232 L109,76Z" fill="url(#cY)" />
            <path d="M43,82 L48,224 L54,224 L49,82Z" fill="rgba(255,255,255,.28)" />
            <text x="71" y="155" textAnchor="middle" fill="rgba(255,255,255,.9)" fontSize="6.5" fontFamily="sans-serif" fontWeight="bold">Blended</text>
            <text x="71" y="165" textAnchor="middle" fill="rgba(255,255,255,.75)" fontSize="4.5" fontFamily="sans-serif">NUTRITION</text>
            <text x="71" y="173" textAnchor="middle" fill="rgba(255,255,255,.75)" fontSize="4.5" fontFamily="sans-serif">ROCHESTER</text>
          </svg>
        </div>
      </div>

      {/* Stats bar */}
      <div className="hero-stats">
        <div className="container">
          {[
            { icon: 'fa-leaf', text: ['Plant-Based', 'Options'] },
            { icon: 'fa-mug-hot', text: ['24+ Loaded', 'Teas'] },
            { icon: 'fa-blender', text: ['Healthy', 'Shakes'] },
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
  )
}
