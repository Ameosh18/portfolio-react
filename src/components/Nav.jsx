import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import AKLogo from '../../AKlogo.png'

const RESUME_URL = `${import.meta.env.BASE_URL}resume.pdf`
const CASE_STUDY_PATHS = ['/digisense', '/pfsone']

const CONFETTI_COLORS = [
  '#FF4D6D', '#FF9F1C', '#FFBF69', '#06D6A0', '#118AB2',
  '#FFD166', '#EF476F', '#8338EC', '#FB5607', '#3A86FF',
  '#FF006E', '#CBFF8C', '#F72585', '#4CC9F0', '#FEC89A',
]

function random(min, max) {
  return Math.random() * (max - min) + min
}

const ANIM_DURATION = 2.2   // seconds each particle flies
const OPEN_DELAY    = 1800  // ms — let the burst peak before PDF opens

function useConfetti() {
  const [particles, setParticles] = useState([])

  const fire = useCallback((originRect) => {
    const cx = originRect.left + originRect.width / 2
    const cy = originRect.top + originRect.height / 2
    const newParticles = Array.from({ length: 60 }).map((_, i) => ({
      id: i + Date.now(),
      cx,
      cy,
      x: random(-220, 220),
      y: random(-380, -60),
      rotate: random(-540, 540),
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      delay: random(0, 0.3),
      w: random(8, 14),
      h: random(5, 10),
    }))
    setParticles(newParticles)
    setTimeout(() => setParticles([]), (ANIM_DURATION + 0.4) * 1000)
  }, [])

  return { particles, fire }
}

function ConfettiLayer({ particles }) {
  return (
    <AnimatePresence>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ opacity: 1, x: p.cx, y: p.cy, rotate: 0, scaleX: 1, scaleY: 1 }}
          animate={{ opacity: 0, x: p.cx + p.x, y: p.cy + p.y, rotate: p.rotate, scaleX: 0.3, scaleY: 0.3 }}
          exit={{ opacity: 0 }}
          transition={{ duration: ANIM_DURATION, delay: p.delay, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: p.w,
            height: p.h,
            borderRadius: 2,
            backgroundColor: p.color,
            pointerEvents: 'none',
            zIndex: 99996,
          }}
          aria-hidden="true"
        />
      ))}
    </AnimatePresence>
  )
}

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [shouldScroll, setShouldScroll] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { particles, fire } = useConfetti()

  const handleDownload = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    fire(rect)
    setTimeout(() => {
      window.open(RESUME_URL, '_blank', 'noopener,noreferrer')
    }, OPEN_DELAY)
  }, [fire])

  const isHome = location.pathname === '/'
  const isWork = location.pathname === '/work' || CASE_STUDY_PATHS.includes(location.pathname)
  const isProcess = location.pathname === '/my-process'
  const isAbout = location.pathname === '/about'

  const close = () => setIsMenuOpen(false)

  const scrollToTop = () => {
    setShouldScroll(true)
  }

  useEffect(() => {
    document.body.classList.toggle('menu-open', isMenuOpen)
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.classList.remove('menu-open')
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setIsMenuOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (location.pathname === '/' || shouldScroll) {
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setShouldScroll(false)
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [location.pathname, shouldScroll])

  const goToSection = (id) => (e) => {
    e.preventDefault()
    close()
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  const sectionLinks = []

  return (
    <>
      <nav className="nav" id="nav">
        <div className="nav-inner">
          <Link to="/" className="nav-logo" onClick={() => { close(); scrollToTop(); }} aria-label="Ameya Kulkarni, home">
            <img src={AKLogo} alt="" />
            <span className="wordmark">Ameya Kulkarni</span>
          </Link>

          <ul className="nav-links">
            <li><Link to="/" className={isHome ? 'active' : undefined} onClick={() => { close(); scrollToTop(); }}>Home</Link></li>
            <li><Link to="/work" className={isWork ? 'active' : undefined} onClick={close}>Work</Link></li>
            <li><Link to="/my-process" className={isProcess ? 'active' : undefined} onClick={close}>My Process</Link></li>
            <li><Link to="/about" className={isAbout ? 'active' : undefined} onClick={close}>About Me</Link></li>
            <li><button onClick={handleDownload} className="cta">Download Resume ↓</button></li>
          </ul>

          <button
            className={`nav-hamburger${isMenuOpen ? ' is-open' : ''}`}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen(o => !o)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`mobile-menu${isMenuOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <ul className="mobile-menu-links">
          <li>
            <Link to="/" className={isHome ? 'active' : undefined} onClick={() => { close(); scrollToTop(); }}>
              <span className="menu-item-label"><span className="menu-num">00</span>Home</span>
              <span className="menu-arrow" aria-hidden="true">↗︎</span>
            </Link>
          </li>
          <li>
            <Link to="/work" className={isWork ? 'active' : undefined} onClick={close}>
              <span className="menu-item-label"><span className="menu-num">01</span>Work</span>
              <span className="menu-arrow" aria-hidden="true">↗︎</span>
            </Link>
          </li>
          <li>
            <Link to="/my-process" className={isProcess ? 'active' : undefined} onClick={close}>
              <span className="menu-item-label"><span className="menu-num">02</span>My Process</span>
              <span className="menu-arrow" aria-hidden="true">↗︎</span>
            </Link>
          </li>
          <li>
            <Link to="/about" className={isAbout ? 'active' : undefined} onClick={close}>
              <span className="menu-item-label"><span className="menu-num">03</span>About Me</span>
              <span className="menu-arrow" aria-hidden="true">↗︎</span>
            </Link>
          </li>
          <li className="menu-cta-item">
            <button className="menu-cta" onClick={(e) => { close(); handleDownload(e) }}>
              Download Resume <span className="menu-cta-arrow" aria-hidden="true">↓</span>
            </button>
          </li>
        </ul>

        <div className="mobile-menu-footer">
          <div className="availability-status">
            <span className="pulse-dot" aria-hidden="true"></span>
            <span className="mobile-menu-footer-label">Available for projects</span>
          </div>
          <a href="mailto:ameya.kulkarni@outlook.com" className="mobile-menu-footer-cta" onClick={close}>
            Get in touch ↗︎
          </a>
        </div>
      </div>

      <ConfettiLayer particles={particles} />
    </>
  )
}
