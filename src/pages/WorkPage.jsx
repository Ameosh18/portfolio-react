import { useEffect } from 'react'
import StackedGallery from '../components/StackedGallery'

export default function WorkPage() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal')
    if (reveals.length === 0) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })

    reveals.forEach(el => observer.observe(el))
    return () => reveals.forEach(el => observer.unobserve(el))
  }, [])

  return (
    <>
      <main className="work-page">
      <div className="work-page-header">
        <div className="work-page-header-inner">
          <span className="work-eyebrow">Portfolio</span>
          <h1 className="work-page-title">Selected Work</h1>
          <div className="work-header-rule"></div>
          <p className="work-header-meta">Featured case studies from 9.5+ years of UX strategy and systems design</p>
        </div>
      </div>

      {/* Featured work - 3D Stacked Gallery */}
      <StackedGallery />

      {/* Also Notable */}
      <section className="also-notable">
        <div className="notable-header reveal">
          <h2 className="notable-section-title">Also Notable</h2>
          <p className="notable-section-sub">More work worth knowing — detailed case studies coming soon.</p>
        </div>
        <div className="notable-grid">
          <div className="notable-card reveal">
            <div className="notable-card-header">
              <span className="notable-card-num">03</span>
              <div className="notable-card-tags">
                <span className="notable-card-tag">Life Sciences</span>
                <span className="notable-card-tag">AI</span>
              </div>
            </div>
            <h3 className="notable-card-name">Innoplexus Research Intelligence</h3>
            <p className="notable-card-company">Innoplexus · 2022</p>
            <p className="notable-card-role">Lead UX Designer</p>
            <div className="notable-card-metrics">
              <span className="notable-metric-line">AI-assisted drug discovery workflows</span>
              <span className="notable-metric-line">Complex data visualisation for researchers</span>
            </div>
          </div>

          <div className="notable-card reveal reveal-1">
            <div className="notable-card-header">
              <span className="notable-card-num">04</span>
              <div className="notable-card-tags">
                <span className="notable-card-tag">Fintech</span>
                <span className="notable-card-tag">B2B SaaS</span>
              </div>
            </div>
            <h3 className="notable-card-name">Extentia Fintech Platform</h3>
            <p className="notable-card-company">Extentia · 2020</p>
            <p className="notable-card-role">UX Designer</p>
            <div className="notable-card-metrics">
              <span className="notable-metric-line">End-to-end product design for financial services</span>
              <span className="notable-metric-line">Multi-role dashboard with real-time analytics</span>
            </div>
          </div>

          <div className="notable-card reveal reveal-2">
            <div className="notable-card-header">
              <span className="notable-card-num">05</span>
              <div className="notable-card-tags">
                <span className="notable-card-tag">Design Systems</span>
                <span className="notable-card-tag">Brand</span>
              </div>
            </div>
            <h3 className="notable-card-name">Ogee Studio Design System</h3>
            <p className="notable-card-company">Ogee Studio · 2021</p>
            <p className="notable-card-role">UX & Product Designer</p>
            <div className="notable-card-metrics">
              <span className="notable-metric-line">Token-based design system from scratch</span>
              <span className="notable-metric-line">Component library across 3 digital products</span>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  )
}
