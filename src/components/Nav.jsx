import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import confetti from 'canvas-confetti'
import AKLogo from '../../AKlogo.png'

const RESUME_URL = `${import.meta.env.BASE_URL}resume.pdf`
const CASE_STUDY_PATHS = ['/digisense', '/pfsone']

const CONFETTI_COLORS = [
  '#FF4D6D', '#FF9F1C', '#FFBF69', '#06D6A0', '#118AB2',
  '#FFD166', '#EF476F', '#8338EC', '#FB5607', '#3A86FF',
  '#FF006E', '#CBFF8C', '#F72585', '#4CC9F0', '#FEC89A',
]

// Fires canvas-confetti from the center of the given button rect.
// Returns the Promise from canvas-confetti (resolves when animation ends).
function fireConfetti(rect) {
  const x = (rect.left + rect.width / 2) / window.innerWidth
  const y = (rect.top + rect.height / 2) / window.innerHeight
  return confetti({
    particleCount: 160,
    spread: 90,
    startVelocity: 52,
    gravity: 1.6,       // slightly above default (1) for faster fall
    decay: 0.87,
    ticks: 280,
    origin: { x, y },
    colors: CONFETTI_COLORS,
    shapes: ['square', 'circle'],
    scalar: 1.1,
    zIndex: 99996,
    disableForReducedMotion: true,
  })
}

function triggerDownload() {
  const a = document.createElement('a')
  a.href = RESUME_URL
  a.download = 'Ameya_Kulkarni_Resume.pdf'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [shouldScroll, setShouldScroll] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Desktop: fire confetti + download after 1200ms (mid-fall)
  const handleDownload = useCallback((e) => {
    fireConfetti(e.currentTarget.getBoundingClientRect())
    setTimeout(triggerDownload, 1200)
  }, [])

  // Mobile: keep menu open while confetti plays, close + download when done
  const handleMobileDownload = useCallback((e) => {
    const promise = fireConfetti(e.currentTarget.getBoundingClientRect())
    // Download at 1200ms (confetti mid-fall), close menu when animation finishes
    setTimeout(triggerDownload, 1200)
    promise.then(() => setIsMenuOpen(false))
  }, [])

  const isHome = location.pathname === '/'
  const isWork = location.pathname === '/work' || CASE_STUDY_PATHS.includes(location.pathname)
  const isProcess = location.pathname === '/my-process'
  const isAbout = location.pathname === '/about'

  const close = () => setIsMenuOpen(false)
  const scrollToTop = () => setShouldScroll(true)

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
            <button className="menu-cta" onClick={handleMobileDownload}>
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
    </>
  )
}
