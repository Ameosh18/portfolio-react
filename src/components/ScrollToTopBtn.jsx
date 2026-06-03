import { useEffect, useState } from 'react'

export default function ScrollToTopBtn() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      setVisible(scrolled > 0.35)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <button
      className={`scroll-top-btn${visible ? ' scroll-top-btn--visible' : ''}`}
      onClick={scrollTop}
      aria-label="Scroll to top"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 13V3M3 8l5-5 5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}
