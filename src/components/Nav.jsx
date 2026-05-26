import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AKLogo from '../../AKlogo.png'

const links = [
  { num: "00", label: "Home",        to: "/",             href: null },
  { num: "01", label: "Work",        to: "/work",         href: null },
  { num: "02", label: "AI Workflow", to: null,            href: "/#ai-workflow" },
  { num: "03", label: "About",       to: null,            href: "/#about" },
  { num: "04", label: "Let's Talk",  to: null,            href: "/#contact" },
]

export default function Nav() {
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const [isMenuOpen, setIsMenuOpen]   = useState(false)

  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'dark'
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light')
      setIsDarkTheme(false)
    }
  }, [])

  // Body class for z-index stacking (nav stays above overlay)
  useEffect(() => {
    document.body.classList.toggle('menu-open', isMenuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [isMenuOpen])

  const toggleTheme = () => {
    const newTheme = isDarkTheme ? 'light' : 'dark'
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    setIsDarkTheme(!isDarkTheme)
  }

  const close = () => setIsMenuOpen(false)

  return (
    <>
      <nav id="site-nav">
        <Link to="/" className="nav-logo" onClick={close}>
          <img src={AKLogo} alt="Ameya Kulkarni" className="nav-logo-img" />
        </Link>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/work">Work</Link></li>
          <li><a href="/#ai-workflow">AI Workflow</a></li>
          <li><a href="/#about">About</a></li>
          <li><a href="/#contact" className="cta">Let's Talk →</a></li>
        </ul>

        <div className="nav-actions">
          <button className="theme-toggle" aria-label="Toggle colour theme" onClick={toggleTheme}>
            <svg className="icon-moon" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
            <svg className="icon-sun"  viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1"  x2="12" y2="3"  />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22"  y1="4.22"  x2="5.64"  y2="5.64"  />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1"  y1="12" x2="3"  y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36" />
              <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"  />
            </svg>
          </button>

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

      {/* Always in DOM so CSS opacity transition works */}
      <div
        id="mobile-menu"
        className={`mobile-menu${isMenuOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <ul className="mobile-menu-links">
          {links.map(({ num, label, to, href }) => (
            <li key={num}>
              {to ? (
                <Link to={to} onClick={close}>
                  <span className="menu-item-label">
                    <span className="menu-num">{num}</span>
                    {label}
                  </span>
                  <span className="menu-arrow" aria-hidden="true">↗</span>
                </Link>
              ) : (
                <a href={href} onClick={close}>
                  <span className="menu-item-label">
                    <span className="menu-num">{num}</span>
                    {label}
                  </span>
                  <span className="menu-arrow" aria-hidden="true">↗</span>
                </a>
              )}
            </li>
          ))}
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
