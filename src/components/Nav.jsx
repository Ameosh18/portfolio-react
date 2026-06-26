import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import confetti from '@hiseb/confetti'
import AKLogo from '../../AKlogo.png'

const RESUME_URL = `${import.meta.env.BASE_URL}resume.pdf`
const CASE_STUDY_PATHS = ['/digisense', '/pfsone', '/siemens']

// position is pixel-based, from the center of the clicked button
function fireConfetti(rect) {
  confetti({
    position: {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    },
    count: 120,
    size: 1.2,
    velocity: 260,  // slightly above default (200) for faster fall
    fade: false,
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

// Fetch starts immediately (within user gesture) to satisfy iOS/Android download
// requirements. Promise.all enforces a minimum 1200ms delay so confetti plays
// before the download dialog appears. Falls back to direct link if fetch fails.
function triggerMobileDownload() {
  const blobReady = fetch(RESUME_URL).then(r => r.blob())
  const minDelay  = new Promise(r => setTimeout(r, 1200))

  Promise.all([blobReady, minDelay])
    .then(([blob]) => {
      const url = URL.createObjectURL(blob)
      const a   = document.createElement('a')
      a.href     = url
      a.download = 'Ameya_Kulkarni_Resume.pdf'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      setTimeout(() => URL.revokeObjectURL(url), 10000)
    })
    .catch(() => setTimeout(triggerDownload, 1200))
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

  // Mobile: trigger download immediately (preserves user gesture for iOS/Android),
  // confetti plays in parallel, menu closes after particles clear
  const handleMobileDownload = useCallback((e) => {
    fireConfetti(e.currentTarget.getBoundingClientRect())
    triggerMobileDownload()
    setTimeout(() => setIsMenuOpen(false), 2400)
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
            <li><Link to="/work" className={isWork ? 'active' : undefined} onClick={() => { close(); scrollToTop(); }}>Work</Link></li>
            <li><Link to="/my-process" className={isProcess ? 'active' : undefined} onClick={() => { close(); scrollToTop(); }}>My Process</Link></li>
            <li><Link to="/about" className={isAbout ? 'active' : undefined} onClick={() => { close(); scrollToTop(); }}>About Me</Link></li>
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
            <Link to="/work" className={isWork ? 'active' : undefined} onClick={() => { close(); scrollToTop(); }}>
              <span className="menu-item-label"><span className="menu-num">01</span>Work</span>
              <span className="menu-arrow" aria-hidden="true">↗︎</span>
            </Link>
          </li>
          <li>
            <Link to="/my-process" className={isProcess ? 'active' : undefined} onClick={() => { close(); scrollToTop(); }}>
              <span className="menu-item-label"><span className="menu-num">02</span>My Process</span>
              <span className="menu-arrow" aria-hidden="true">↗︎</span>
            </Link>
          </li>
          <li>
            <Link to="/about" className={isAbout ? 'active' : undefined} onClick={() => { close(); scrollToTop(); }}>
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
          <a href="mailto:ameosh18@gmail.com" className="mobile-menu-footer-cta" onClick={close}>
            Get in touch ↗︎
          </a>
        </div>
      </div>
    </>
  )
}
