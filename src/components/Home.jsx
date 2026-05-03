import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import ScrollProgress from './ScrollProgress'
import './styles/Home.css'
import shake1 from '../Assets/Shake1HeroImage.png'
import shake2 from '../Assets/Shake2HeroImage.png'
import shake3 from '../Assets/Shake3HeroImage.png'

const FLAVORS = ['Cookie Monsters Snickerdoodle', 'Death by Chocolate', 'Peanut Butter Cup', 'Oreo Cheesecake', 'Birthday Cake', 'Thin Mint']

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

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
}

const containerVariants = { // For staggered children
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const parallaxVariants = { // For parallax effect
  hidden: { y: 0 },
  visible: { y: 0 }
}

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"]
  });

  const palmY = useTransform(scrollYProgress, [0, 1], ["-50%", "50%"]);
  const leafTrY = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);
  const leafBlY = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);

  return (
    <main id="home">
      <ScrollProgress />
      {/* ── HERO ── */}
      <section className="hero-section" ref={heroRef}>
        <motion.svg className="palm-deco hero-palm" viewBox="0 0 200 320" style={{ y: palmY }}>
          <path d="M100,300C80,210 20,160 5,55 5,55 62,92 100,125 100,125 76,72 100,5 100,5 124,72 100,125 138,92 195,55 195,55 180,160 120,210 100,300Z" fill="#4CAF50" />
        </motion.svg>

        <div className="container hero-wrap">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.p 
              className="hero-label"
              initial={{ letterSpacing: '0.5em', opacity: 0 }}
              animate={{ letterSpacing: '0.18em', opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Blended Nutrition Rochester
            </motion.p>
            <h1 className="hero-h1">
              <motion.span 
                className="c-teal"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >Delicious.</motion.span>{' '}
              <motion.span 
                className="c-pink"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >Nutritious.</motion.span><br />
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >Convenient.</motion.span>
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
                <motion.div 
                  className="feat-item" 
                  key={label}
                  whileHover={{ y: -5 }}
                >
                  <div className="ic"><i className={`fa ${icon}`} /></div>
                  <span>{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="hero-glow" style={{ left: '6%',  background: 'radial-gradient(circle, rgba(26,188,188,.55) 0%, transparent 68%)' }} />
            <div className="hero-glow" style={{ left: '50%', transform: 'translateX(-50%)', width: 270, height: 270, background: 'radial-gradient(circle, rgba(255,77,126,.5) 0%, transparent 68%)' }} />
            <div className="hero-glow" style={{ right: '6%', background: 'radial-gradient(circle, rgba(245,200,66,.5) 0%, transparent 68%)' }} />
            <motion.svg className="deco-leaf leaf-tr" viewBox="0 0 200 320" style={{ y: leafTrY }}>
              <path d="M100,300C80,210 20,160 5,55 5,55 62,92 100,125 100,125 76,72 100,5 100,5 124,72 100,125 138,92 195,55 195,55 180,160 120,210 100,300Z" fill="#388E3C" />
            </motion.svg>
            <motion.svg className="deco-leaf leaf-bl" viewBox="0 0 200 320" style={{ y: leafBlY }}>
              <path d="M100,300C80,210 20,160 5,55 5,55 62,92 100,125 100,125 76,72 100,5 100,5 124,72 100,125 138,92 195,55 195,55 180,160 120,210 100,300Z" fill="#43A047" />
            </motion.svg>
            <img src={shake3} alt="Teal tropical shake"  className="cup-l anim-float-l" />
            <img src={shake1} alt="Tropical fruit shake" className="cup-c anim-float"   />
            <img src={shake2} alt="Mocha blended shake"  className="cup-r anim-float-r" />
          </motion.div>
        </div>

        <motion.div 
          className="hero-stats"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div 
            className="container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { icon: 'fa-leaf',         text: ['Plant-Based', 'Options'] },
              { icon: 'fa-mug-hot',      text: ['24+ Loaded', 'Teas'] },
              { icon: 'fa-blender',      text: ['Healthy', 'Shakes'] },
              { icon: 'fa-shield-heart', text: ['Immune', 'Support'] },
            ].map(({ icon, text }) => (
              <motion.div className="stat-item" key={text[0]} variants={itemVariants}>
                <div className="stat-ic"><i className={`fa ${icon}`} /></div>
                <div className="stat-txt">{text[0]}<br />{text[1]}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── ON THE GO ── */}
      <motion.section 
        className="otg-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
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
          <motion.div 
            className="otg-cards"
            variants={containerVariants}
          >
            {PILLARS.map(({ icon, title, desc }) => (
              <motion.div className="pillar-card" key={title} variants={itemVariants}>
                <div className="pillar-ic"><i className={`fa ${icon}`} /></div>
                <div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── CATEGORIES ── */}
      <motion.section 
        className="cat-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className="container">
          <div className="cat-header">
            <p className="section-label">Our Menu</p>
            <h2 className="page-h2">Find Your<br /><em>Perfect Blend</em></h2>
          </div>
          <div className="cat-grid">
            {CATEGORIES.map(({ icon, title, desc }) => (
              <motion.div 
                className="cat-card" 
                key={title}
                whileHover={{ y: -8, boxShadow: "0 12px 36px rgba(26, 188, 188, 0.15)" }}
              >
                <div className="cat-ic"><i className={`fa ${icon}`} /></div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="cat-cta">
            <Link to="/menu" className="btn btn-pink">
              Explore Full Menu <i className="fa fa-arrow-right" />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* ── BUILT FOR RESULTS ── */}
      <motion.section 
        className="results-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
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
      </motion.section>

      {/* ── FLAVORS ── */}
      <motion.section 
        className="flavor-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
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
      </motion.section>

      {/* ── FINAL CTA ── */}
      <motion.section 
        className="final-cta-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="container final-cta-inner">
          <h2 className="final-cta-h2">Ready to Fuel<br /><em>Your Day?</em></h2>
          <p className="final-cta-sub">Stop by or order ahead and experience the difference.</p>
          <div className="final-cta-btns">
            <Link to="/contact" className="btn btn-pink">Order Now</Link>
            <Link to="/contact" className="btn btn-outline-light">Visit Us</Link>
          </div>
        </div>
      </motion.section>

    </main>
  )
}
