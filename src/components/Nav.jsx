import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AKLogo from '../../AKlogo.png'

const RESUME_URL = `${import.meta.env.BASE_URL}resume.pdf`
const CASE_STUDY_PATHS = ['/digisense', '/pfsone']

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [shouldScroll, setShouldScroll] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const isHome = location.pathname === '/'
  const isWork = location.pathname === '/work' || CASE_STUDY_PATHS.includes(location.pathname)

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

  const sectionLinks = [
    { num: '02', label: 'My Process', id: 'process' },
    { num: '03', label: 'About Me', id: 'about' },
  ]

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
            {sectionLinks.map(({ label, id }) => (
              <li key={id}><a href={`#${id}`} onClick={goToSection(id)}>{label}</a></li>
            ))}
            <li><a href={RESUME_URL} download className="cta">Download Resume ↓</a></li>
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
              <span className="menu-arrow" aria-hidden="true">↗</span>
            </Link>
          </li>
          <li>
            <Link to="/work" className={isWork ? 'active' : undefined} onClick={close}>
              <span className="menu-item-label"><span className="menu-num">01</span>Work</span>
              <span className="menu-arrow" aria-hidden="true">↗</span>
            </Link>
          </li>
          {sectionLinks.map(({ num, label, id }) => (
            <li key={id}>
              <a href={`#${id}`} onClick={goToSection(id)}>
                <span className="menu-item-label"><span className="menu-num">{num}</span>{label}</span>
                <span className="menu-arrow" aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
          <li className="menu-cta-item">
            <a href={RESUME_URL} download className="menu-cta" onClick={close}>
              Download Resume <span className="menu-cta-arrow" aria-hidden="true">↓</span>
            </a>
          </li>
        </ul>

        <div className="mobile-menu-footer">
          <div className="availability-status">
            <span className="pulse-dot" aria-hidden="true"></span>
            <span className="mobile-menu-footer-label">Available for projects</span>
          </div>
          <a href="mailto:ameya.kulkarni@outlook.com" className="mobile-menu-footer-cta" onClick={close}>
            Get in touch ↗
          </a>
        </div>
      </div>
    </>
  )
}
