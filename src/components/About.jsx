import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import ScrollProgress from './ScrollProgress'
import './styles/About.css'

const DIFFERENTIATORS = [
  { icon: 'fa-bolt',    title: 'Convenience First',  desc: 'Fast, easy options built for busy lifestyles' },
  { icon: 'fa-star',    title: 'Flavor-Driven Menu', desc: 'Drinks inspired by desserts, snacks, and classics' },
  { icon: 'fa-seedling', title: 'Balanced Nutrition', desc: 'Designed to support energy, wellness, and performance' },
  { icon: 'fa-list',    title: 'Wide Variety',        desc: 'Dozens of flavor combinations and categories' },
]

const OFFERINGS = [
  { icon: 'fa-blender',  text: 'Protein-packed shakes' },
  { icon: 'fa-bolt',     text: 'Energy-focused drinks' },
  { icon: 'fa-mug-hot',  text: 'Specialty coffee blends' },
  { icon: 'fa-heart',    text: 'Nutritional options for a variety of lifestyles' },
]

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
}

export default function About() {
  const missionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: missionRef,
    offset: ["start end", "end start"]
  });

  const circleRotate = useTransform(scrollYProgress, [0, 1], ["-30deg", "30deg"]);

  return (
    <main id="about">
      <ScrollProgress />

      {/* ── HERO ── */}
      <motion.section 
        className="about-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <svg className="palm-deco" style={{ top: 40, right: -50, width: 260, opacity: .06, transform: 'rotate(10deg)' }} viewBox="0 0 200 320">
          <path d="M100,300C80,210 20,160 5,55 5,55 62,92 100,125 100,125 76,72 100,5 100,5 124,72 100,125 138,92 195,55 195,55 180,160 120,210 100,300Z" fill="#4CAF50" />
        </svg>
        <div className="container">
          <p className="section-label">Our Story</p>
          <h1 className="about-hero-h1">More Than Just<br /><em>a Shake Shop</em></h1>
          <p className="about-hero-sub">We make nutrition simple, enjoyable, and accessible for everyday life.</p>
        </div>
      </motion.section>

      {/* ── MISSION ── */}
      <motion.section 
        className="mission-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        ref={missionRef} // Attach ref to the section
      >
        <div className="container mission-grid">
          <div className="mission-text">
            <p className="section-label">Why We Exist</p>
            <h2 className="about-h2">Our<br /><span className="script">Mission</span></h2>
            <div className="divider-bar" />
            <p className="about-body">
              At Blended Nutrition, our mission is simple: to provide delicious, nutritious, and convenient options that help people feel their best every day.
            </p>
            <p className="about-body">
              We believe healthy choices shouldn't feel like a chore—they should be something you actually look forward to.
            </p>
          </div>
          <motion.div className="about-visual" style={{ rotate: circleRotate }}> {/* Apply rotation here */}
            <div className="about-circle">
              <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: .12 }} viewBox="0 0 370 370">
                <circle cx="185" cy="185" r="155" fill="none" stroke="white" strokeWidth="1.5" />
                <circle cx="185" cy="185" r="125" fill="none" stroke="white" strokeWidth=".8" />
              </svg>
              <div className="gv-text">
                <span className="l1">Good Vibes</span>
                <span className="l2">Good Nutrition</span>
              </div>
            </div>
            <svg style={{ position: 'absolute', bottom: -25, right: -25, width: 140, opacity: .45 }} viewBox="0 0 200 320">
              <path d="M100,300C80,210 20,160 5,55 5,55 62,92 100,125 100,125 76,72 100,5 100,5 124,72 100,125 138,92 195,55 195,55 180,160 120,210 100,300Z" fill="#388E3C" />
            </svg>
          </motion.div>
        </div>
      </motion.section>

      {/* ── WHAT WE OFFER ── */}
      <motion.section 
        className="offerings-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className="container">
          <p className="section-label">What We're Known For</p>
          <h2 className="about-h2">What We<br /><span className="script">Specialize In</span></h2>
          <div className="divider-bar" />
          <motion.div 
            className="offerings-grid"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {OFFERINGS.map(({ icon, text }) => (
              <motion.div className="offering-item" key={text} whileHover={{ scale: 1.02 }}>
                <div className="offering-ic"><i className={`fa ${icon}`} /></div>
                <span>{text}</span>
              </motion.div>
            ))}
          </motion.div>
          <p className="about-body" style={{ marginTop: '1.5rem', maxWidth: 620 }}>
            Everything is designed to be quick, customizable, and effective—whether you're on the go or building better habits.
          </p>
        </div>
      </motion.section>

      {/* ── APPROACH ── */}
      <motion.section 
        className="approach-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className="container approach-inner">
          <p className="section-label">Our Philosophy</p>
          <h2 className="about-h2">Nutrition<br /><span className="script">Made Simple</span></h2>
          <div className="divider-bar" />
          <p className="about-body">
            We focus on making nutrition easy to understand and even easier to stick to. No extremes. No confusion. Just straightforward, effective options that help you stay consistent.
          </p>
          <p className="about-body">
            Our blends are crafted to support real-life routines—not unrealistic expectations.
          </p>
        </div>
      </motion.section>

      {/* ── DIFFERENTIATORS ── */}
      <motion.section 
        className="diff-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className="container">
          <p className="section-label">What Makes Us Different</p>
          <h2 className="about-h2">The Blended<br /><span className="script">Difference</span></h2>
          <motion.div 
            className="about-icons diff-icons"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {DIFFERENTIATORS.map(({ icon, title, desc }) => (
              <motion.div 
                className="a-icon" 
                key={title}
                whileHover={{ y: -5, boxShadow: "0 8px 30px rgba(26, 188, 188, 0.1)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="ic"><i className={`fa ${icon}`} /></div>
                <span className="lbl">{title}</span>
                <p className="diff-desc">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── COMMUNITY ── */}
      <motion.section 
        className="community-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className="container community-inner">
          <p className="section-label">Our Community</p>
          <h2 className="about-h2">Built for<br /><span className="script">Our Community</span></h2>
          <div className="divider-bar" />
          <p className="about-body">
            We're more than just a place to grab a drink—we're a daily stop for people working toward better habits, more energy, and a healthier lifestyle. Whether it's your first visit or part of your routine, we're here to support you.
          </p>
        </div>
      </motion.section>

      {/* ── CLOSING CTA ── */}
      <div className="tagline-bar">
        <div className="container tagline-cta">
          <p>Simple. &nbsp;Effective. &nbsp;<span className="sc">Enjoyable.</span></p>
          <p className="tagline-sub">That's what nutrition should be—and that's what we deliver every day.</p>
          <div className="tagline-btns">
            <Link to="/menu" className="btn btn-pink">View Menu</Link>
            <Link to="/contact" className="btn btn-outline-light">Stop In Today</Link>
          </div>
        </div>
      </div>

    </main>
  )
}
