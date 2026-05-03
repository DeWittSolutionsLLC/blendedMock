import { Link } from 'react-router-dom'

const ICONS = [
  { icon: 'fa-seedling', label: ['Quality', 'Ingredients'] },
  { icon: 'fa-bullseye', label: ['Supports', 'Your Goals'] },
  { icon: 'fa-heart', label: ['Made With', 'Love'] },
  { icon: 'fa-users', label: ['Community', 'Focused'] },
]

export default function About() {
  return (
    <section id="about">
      <svg className="palm-deco" style={{ top: 40, right: -50, width: 260, opacity: .06, transform: 'rotate(10deg)' }} viewBox="0 0 200 320">
        <path d="M100,300C80,210 20,160 5,55 5,55 62,92 100,125 100,125 76,72 100,5 100,5 124,72 100,125 138,92 195,55 195,55 180,160 120,210 100,300Z" fill="#4CAF50" />
      </svg>

      <div className="container">
        <div className="about-grid">
          <div>
            <p className="section-label">Our Story</p>
            <h2 className="about-h2">
              More Than Nutrition.
              <span className="script">It's a lifestyle.</span>
            </h2>
            <div className="divider-bar" />
            <p className="about-body">
              Blended Nutrition Rochester was created with one goal in mind: to help you feel your best from the inside out. We believe that healthy choices should be delicious, convenient, and inspiring.
            </p>
            <p className="about-body">
              That's why we craft every drink with high-quality ingredients, tropical flavors, and a whole lot of love.
            </p>
            <div className="about-icons">
              {ICONS.map(({ icon, label }) => (
                <div className="a-icon" key={label[0]}>
                  <div className="ic"><i className={`fa ${icon}`} /></div>
                  <span className="lbl">{label[0]}<br />{label[1]}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '2rem' }}>
              <Link to="/menu" className="btn btn-dark">
                <i className="fa fa-bag-shopping" /> View Our Menu
              </Link>
            </div>
          </div>

          <div className="about-visual">
            <div className="about-circle">
              <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: .12 }} viewBox="0 0 370 370">
                <circle cx="185" cy="185" r="155" fill="none" stroke="white" strokeWidth="1.5" />
                <circle cx="185" cy="185" r="125" fill="none" stroke="white" strokeWidth=".8" />
              </svg>
              <div className="gv-text anim-float">
                <span className="l1">Good Vibes</span>
                <span className="l2">Good Nutrition</span>
              </div>
            </div>
            <svg style={{ position: 'absolute', bottom: -25, right: -25, width: 140, opacity: .45 }} viewBox="0 0 200 320">
              <path d="M100,300C80,210 20,160 5,55 5,55 62,92 100,125 100,125 76,72 100,5 100,5 124,72 100,125 138,92 195,55 195,55 180,160 120,210 100,300Z" fill="#388E3C" />
            </svg>
          </div>
        </div>
      </div>

      <div className="tagline-bar">
        <div className="container">
          <p>
            You Dream It. &nbsp;We Blend It. &nbsp;
            <span className="sc">You live it.</span>
            &nbsp;<span className="hrt">♡</span>
          </p>
        </div>
      </div>
    </section>
  )
}
