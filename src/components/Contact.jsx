import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react';
import ScrollProgress from './ScrollProgress'
import './styles/Contact.css'

const DETAILS = [
  { icon: 'fa-location-dot', content: <>2000 Empire Blvd<br />Rochester, NY 14609</> },
  { icon: 'fa-phone', content: '(585) 123-4567' },
  { icon: 'fa-envelope', content: 'hello@blendednutritionrochester.com' },
  { icon: 'fa-clock', content: <>Monday – Friday: 7AM – 7PM<br />Saturday: 8AM – 5PM<br />Sunday: 10AM – 4PM</> },
]

const SOCIALS = [
  { cls: 'fb', icon: 'fab fa-facebook-f', href: '#' },
  { cls: 'ig', icon: 'fab fa-instagram', href: '#' },
  { cls: 'tt', icon: 'fab fa-tiktok', href: '#' },
]

const EMPTY = { name: '', email: '', phone: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(EMPTY)
  const [sent, setSent] = useState(false)

  const contactRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: contactRef,
    offset: ["start end", "end start"]
  });

  const palmY = useTransform(scrollYProgress, [0, 1], ["-50%", "50%"]);

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = e => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => { setSent(false); setForm(EMPTY) }, 3000)
  }

  return (
    <section id="contact" ref={contactRef}> {/* Attach ref to the section */}
      <ScrollProgress />
      {/* bg palm */}
      <motion.svg className="palm-deco" viewBox="0 0 200 320" style={{ y: palmY }}> {/* Apply parallax here */}
        <path d="M100,300C80,210 20,160 5,55 5,55 62,92 100,125 100,125 76,72 100,5 100,5 124,72 100,125 138,92 195,55 195,55 180,160 120,210 100,300Z" fill="#4CAF50" />
      </motion.svg>

      <div className="container">
        <div className="contact-grid">
          {/* Info */}
          <motion.div 
            className='contact-info'
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-label">Get In Touch</p>
            <h2 className="contact-h2">
              We'd Love To
              <span className="script">hear from you!</span>
            </h2>
            <div className="divider-bar" />

            <ul className="c-list">
              {DETAILS.map(({ icon, content }, i) => (
                <li key={i}>
                  <div className="c-icon"><i className={`fa ${icon}`} /></div>
                  <div>{content}</div>
                </li>
              ))}
            </ul>

            <p className="follow-lbl">Follow Us</p>
            <div className="soc-links">
              {SOCIALS.map(({ cls, icon, href }) => (
                <a 
                  key={cls} 
                  href={href} 
                  className={`soc-link ${cls}`}
                  aria-label={`Follow us on ${cls}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={icon} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div 
            className="form-card"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h3>Send Us a Message</h3>
            <form onSubmit={onSubmit}>
              <div className="fg">
                <label>Name</label>
                <input 
                  name="name" 
                  type="text" 
                  placeholder="Your name" 
                  value={form.name} 
                  onChange={onChange} 
                  autoComplete="name"
                  required 
                />
              </div>
              <div className="fg">
                <label>Email</label>
                <input 
                  name="email" 
                  type="email" 
                  placeholder="Your email" 
                  value={form.email} 
                  onChange={onChange} 
                  autoComplete="email"
                  required 
                />
              </div>
              <div className="fg">
                <label>Phone (optional)</label>
                <input name="phone" type="tel" placeholder="Your phone number" value={form.phone} onChange={onChange} autoComplete="tel" />
              </div>
              <div className="fg">
                <label>Message</label>
                <textarea name="message" placeholder="Your message" value={form.message} onChange={onChange} />
              </div>
              <button type="submit" className={`btn-send${sent ? ' sent' : ''}`} disabled={sent}>
                {sent
                  ? <><i className="fa fa-check" /> Message Sent!</>
                  : <><i className="fa fa-paper-plane" /> Send Message</>
                }
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
