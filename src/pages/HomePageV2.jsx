import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import DigiSenseHero from '../../digisense_hero_image.png'
import LoadingScreen from '../components/LoadingScreen'
import NamePopup from '../components/NamePopup'
import { useName } from '../context/NameContext'
import './HomePageV2.css'

const EASE = [0.16, 1, 0.3, 1]

function slideIn(delay) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: EASE, delay },
  }
}

export default function HomePageV2() {
  const [showPopup, setShowPopup] = useState(false)
  const [contentReady, setContentReady] = useState(false)
  const { name } = useName()

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal')
    if (reveals.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    reveals.forEach(el => observer.observe(el))
    return () => reveals.forEach(el => observer.unobserve(el))
  }, [])

  return (
    <>
      <LoadingScreen onComplete={() => {
        if (!name) {
          setTimeout(() => setShowPopup(true), 400)
        } else {
          setContentReady(true)
        }
      }} />
      <NamePopup show={showPopup} onClose={() => {
        setShowPopup(false)
        setContentReady(true)
      }} />

      <main id="home-view" className={contentReady ? '' : 'content-blurred'}>

        {/* ── BENTO HERO ── */}
        <section className="v2-hero" id="hero" aria-label="Introduction">
          <div className="v2-bento-grid">

            {/* A: Intro card */}
            <motion.div className="v2-cell v2-cell-intro" {...slideIn(0)}>
              <p className="v2-eyebrow">Lead UX Designer · 9.5 years</p>
              <h1 className="v2-heading">Hi, I'm Ameya.</h1>
              <p className="v2-bio">
                I design digital products that feel obvious in hindsight.
                Fintech, mobility, enterprise, and everything in between.
              </p>
              <div className="v2-ctas">
                <Link to="/work" className="btn-primary">View Work →</Link>
                <a href="#contact" className="btn-secondary">Let's Talk</a>
              </div>
              <div className="v2-social-row">
                <a
                  href="https://linkedin.com/in/ameyakulkarni"
                  className="v2-social-chip"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                    <path d="M19.959 3H4.041C3.468 3 3 3.468 3 4.041v15.918C3 20.532 3.468 21 4.041 21h15.918C20.532 21 21 20.532 21 19.959V4.041C21 3.468 20.532 3 19.959 3zM8.877 17.5H6.386V9.82h2.491V17.5zM7.631 8.773a1.444 1.444 0 110-2.888 1.444 1.444 0 010 2.888zM17.5 17.5h-2.49v-3.778c0-.9-.016-2.059-1.254-2.059-1.255 0-1.448.981-1.448 1.994V17.5h-2.49V9.82h2.39v1.061h.034c.332-.63 1.144-1.294 2.354-1.294 2.518 0 2.982 1.657 2.982 3.812V17.5z" />
                  </svg>
                  LinkedIn
                </a>
                <a
                  href="mailto:ameosh18@gmail.com"
                  className="v2-social-chip"
                  aria-label="Send email"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                    <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2-8 5-8-5h16zm0 12H4V8.236l8 5 8-5V18z" />
                  </svg>
                  Email
                </a>
                <a
                  href="https://twitter.com/ameyakulkarni"
                  className="v2-social-chip"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter profile"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                    <path d="M18.244 2h3.308l-7.227 8.26L23 22h-6.655l-4.818-6.301L6.01 22H2.7l7.73-8.835L1 2h6.833l4.337 5.684L18.244 2zm-1.161 18h1.833L6.989 4H5.022L17.083 20z" />
                  </svg>
                  Twitter
                </a>
              </div>
            </motion.div>

            {/* B: Photo card — spans both rows */}
            <motion.div
              className="v2-cell v2-cell-photo"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
            >
              <div className="v2-photo-inner">
                <div className="v2-photo-bg" aria-hidden="true" />
                <img
                  src="/portfolio-react/ameya-photo.jpg"
                  alt="Ameya Kulkarni"
                  className="v2-photo"
                  onError={(e) => { e.target.style.opacity = '0' }}
                />
                <div className="v2-photo-gradient" aria-hidden="true" />
                <div className="v2-photo-text" aria-hidden="true">
                  <span className="v2-photo-name">Ameya Kulkarni</span>
                  <span className="v2-photo-role">Lead UX Designer</span>
                </div>
              </div>
            </motion.div>

            {/* Bottom row: Stat + Focus */}
            <div className="v2-bottom-row">

              {/* C: Stat card */}
              <motion.div className="v2-cell v2-cell-stat" {...slideIn(0.16)}>
                <span className="v2-label">Years of craft</span>
                <span className="v2-big-number" aria-label="9.5 years">
                  9<span className="v2-sup">.5</span>
                </span>
                <div className="v2-badge-row">
                  <span className="company-badge">Globant</span>
                  <span className="company-badge">Mahindra</span>
                  <span className="company-badge">NETSCOUT</span>
                </div>
              </motion.div>

              {/* D: Focus card */}
              <motion.div className="v2-cell v2-cell-focus" {...slideIn(0.24)}>
                <span className="v2-label">Currently into</span>
                <p className="v2-focus-copy">
                  AI-assisted design systems and zero-friction onboarding flows.
                </p>
                <span className="v2-avail">
                  <span className="pulse-dot" aria-hidden="true" />
                  Available to join your team
                </span>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── CREDIBILITY STRIP ── */}
        <div className="credibility-strip">
          <div className="cred-item">
            <span className="cred-label">Years of Experience</span>
            <div className="cred-number">9<span className="cred-suffix">.5 yrs</span></div>
            <p className="cred-detail">UX strategy and systems design across enterprise and consumer products</p>
          </div>
          <div className="cred-item">
            <span className="cred-label">Companies</span>
            <div className="cred-number">5<span className="cred-suffix">co.</span></div>
            <div className="cred-companies">
              <span className="company-badge">Globant</span>
              <span className="company-badge">Mahindra</span>
              <span className="company-badge">Innoplexus</span>
              <span className="company-badge">Ogee Studio</span>
              <span className="company-badge">Extentia</span>
            </div>
          </div>
          <div className="cred-item">
            <span className="cred-label">Design Disciplines</span>
            <ul className="cred-list">
              <li className="cred-list-item">UX Strategy</li>
              <li className="cred-list-item">Systems Design</li>
              <li className="cred-list-item">AI/ML Product Design</li>
            </ul>
          </div>
          <div className="cred-item">
            <span className="cred-label">Key Focus Areas</span>
            <ul className="cred-list">
              <li className="cred-list-item">B2B SaaS</li>
              <li className="cred-list-item">Fintech</li>
              <li className="cred-list-item">Cybersecurity</li>
              <li className="cred-list-item">Life Sciences</li>
              <li className="cred-list-item">IoT</li>
            </ul>
          </div>
        </div>

        {/* ── FEATURED WORK ── */}
        <section className="featured-work" id="work">
          <div className="section-header">
            <div className="section-eyebrow">
              <span>Selected Work</span>
              <h2 className="section-title">Featured Case Studies</h2>
            </div>
            <Link to="/work" className="view-all">View All Work</Link>
          </div>

          <Link to="/digisense" className="work-card reveal reveal-0">
            <div className="work-card-image">
              <img src={DigiSenseHero} alt="DiGiSense: Connected Vehicle Telematics Platform" />
            </div>
            <div className="work-card-content">
              <span className="work-card-badge">Case Study</span>
              <h3 className="work-card-title">DiGiSense</h3>
              <p className="work-card-subtitle">Connected Vehicle Telematics Platform</p>
              <div className="work-card-divider"></div>
              <p className="work-card-description">
                Redesigned Mahindra's IoT telematics platform serving 100,000+ connected
                vehicles across rural and commercial fleets, turning fragmented real-time
                data into actionable insights and reducing operator decision time and driving
                measurable gains in fleet uptime and fuel efficiency.
              </p>
              <div className="work-card-meta">
                <div className="work-meta-item">
                  <span className="work-meta-label">Client</span>
                  <span className="work-meta-value">Mahindra &amp; Mahindra</span>
                </div>
                <div className="work-meta-item">
                  <span className="work-meta-label">Domain</span>
                  <span className="work-meta-value">IoT · Telematics</span>
                </div>
                <div className="work-meta-item">
                  <span className="work-meta-label">Role</span>
                  <span className="work-meta-value">Lead UX Designer</span>
                </div>
              </div>
              <span className="work-card-link">Read Case Study →</span>
            </div>
          </Link>

          <Link to="/pfsone" className="work-card">
            <div className="work-card-image" style={{ background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '48px', fontWeight: '400', color: 'var(--border)', letterSpacing: '0.08em', opacity: '0.6' }}>PFS ONE</span>
            </div>
            <div className="work-card-content">
              <span className="work-card-badge">Case Study</span>
              <h3 className="work-card-title">NETSCOUT PFS ONE</h3>
              <p className="work-card-subtitle">Enterprise Network Visibility Platform</p>
              <div className="work-card-divider"></div>
              <p className="work-card-description">
                Redesigned NETSCOUT's nGenius Packet Flow Switch management interface, replacing a legacy system with a
                lifecycle-based navigation architecture that gave network administrators staged topology publishing,
                perspective-based navigation, and role-differentiated access across enterprise data centres worldwide.
              </p>
              <div className="work-card-meta">
                <div className="work-meta-item">
                  <span className="work-meta-label">Client</span>
                  <span className="work-meta-value">NETSCOUT</span>
                </div>
                <div className="work-meta-item">
                  <span className="work-meta-label">Domain</span>
                  <span className="work-meta-value">Enterprise · Network</span>
                </div>
                <div className="work-meta-item">
                  <span className="work-meta-label">Role</span>
                  <span className="work-meta-value">UX Designer</span>
                </div>
              </div>
              <span className="work-card-link">Read Case Study →</span>
            </div>
          </Link>
        </section>

        {/* ── AI WORKFLOW PREVIEW ── */}
        <section className="ai-workflow" id="ai-workflow">
          <div className="section-header">
            <div className="section-eyebrow">
              <span>Design Process</span>
              <h2 className="section-title">AI-Augmented Design Process</h2>
            </div>
          </div>
          <div className="workflow-steps">
            <div className="workflow-step is-active">
              <div className="step-number">1</div>
              <h3 className="step-title">Research &amp; Synthesis</h3>
              <p className="step-desc">AI-powered data mining and pattern discovery across user feedback</p>
            </div>
            <div className="workflow-step">
              <div className="step-number">2</div>
              <h3 className="step-title">Strategic Thinking</h3>
              <p className="step-desc">AI insight generation to uncover hidden user needs and market gaps</p>
            </div>
            <div className="workflow-step">
              <div className="step-number">3</div>
              <h3 className="step-title">Design &amp; Iteration</h3>
              <p className="step-desc">AI-assisted prototyping and rapid testing of design variations</p>
            </div>
            <div className="workflow-step">
              <div className="step-number">4</div>
              <h3 className="step-title">Validation &amp; Launch</h3>
              <p className="step-desc">AI-driven testing automation and performance monitoring</p>
            </div>
          </div>
          <div className="workflow-cta">
            <p className="workflow-cta-label">A process built for complexity, speed, and precision</p>
            <a href="#ai-workflow" className="workflow-cta-link">Explore Full Process →</a>
          </div>
        </section>

        {/* ── METRICS / IMPACT ── */}
        <section className="metrics" id="impact">
          <div className="section-header">
            <div className="section-eyebrow">
              <span>Outcomes</span>
              <h2 className="section-title">Measured Impact</h2>
            </div>
          </div>
          <div className="metrics-grid">
            <div className="metric-card is-hero">
              <div className="metric-number">25<span className="suffix">+</span></div>
              <p className="metric-label">Projects Led</p>
              <p className="metric-context">Across B2B SaaS, Fintech, Cybersecurity, Life Sciences, IoT</p>
            </div>
            <div className="metric-card">
              <div className="metric-number">15<span className="suffix">+</span></div>
              <p className="metric-label">Cross-Functional Teams Managed</p>
              <p className="metric-context">Average team size: 8+ members</p>
            </div>
            <div className="metric-card">
              <div className="metric-number">4</div>
              <p className="metric-label">Design Systems Built</p>
              <p className="metric-context">Tokens, components, documentation, accessibility audits</p>
            </div>
            <div className="metric-card">
              <div className="metric-number">35<span className="suffix">%</span></div>
              <p className="metric-label">Avg User Engagement Lift</p>
              <p className="metric-context">Measured across product launches and redesigns</p>
            </div>
          </div>
        </section>

        {/* ── ABOUT PREVIEW ── */}
        <section className="about-preview" id="about">
          <div className="about-inner">
            <div className="section-eyebrow">
              <span>About Me</span>
            </div>
            <h2 className="about-headline">A systems thinker who designs for impact</h2>
            <div className="about-bio">
              <p>
                With 9.5 years across enterprise B2B SaaS, fintech, and emerging AI workflows,
                I specialize in UX strategy and design systems that drive measurable outcomes.
                I've shipped <strong>4+ design systems</strong>, led cross-functional teams of
                <strong> 8+</strong>, and consistently delivered <strong>35%+ engagement lifts</strong>
                through strategic design decisions.
              </p>
            </div>
            <div className="about-cta-row">
              <a href="#about" className="about-cta-link">Read Full Story →</a>
              <div className="about-cta-divider"></div>
              <div className="availability-status">
                <span className="pulse-dot"></span>
                <span className="about-availability">Available to join your company</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA / CONTACT ── */}
        <section className="cta-section" id="contact">
          <div className="cta-inner">
            <p className="cta-eyebrow">Get in Touch</p>
            <h2 className="cta-headline">Let's build something great.</h2>
            <p className="cta-sub">I'm open to lead, principal, and AI-focused UX roles.</p>
            <a href="mailto:ameosh18@gmail.com" className="cta-btn">Schedule a Conversation →</a>
            <div className="cta-links">
              <a href="mailto:ameosh18@gmail.com" className="cta-link" aria-label="Send email">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2-8 5-8-5h16zm0 12H4V8.236l8 5 8-5V18z" />
                </svg>
                Email
              </a>
              <a href="https://linkedin.com/in/ameyakulkarni" className="cta-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M19.959 3H4.041C3.468 3 3 3.468 3 4.041v15.918C3 20.532 3.468 21 4.041 21h15.918C20.532 21 21 20.532 21 19.959V4.041C21 3.468 20.532 3 19.959 3zM8.877 17.5H6.386V9.82h2.491V17.5zM7.631 8.773a1.444 1.444 0 110-2.888 1.444 1.444 0 010 2.888zM17.5 17.5h-2.49v-3.778c0-.9-.016-2.059-1.254-2.059-1.255 0-1.448.981-1.448 1.994V17.5h-2.49V9.82h2.39v1.061h.034c.332-.63 1.144-1.294 2.354-1.294 2.518 0 2.982 1.657 2.982 3.812V17.5z" />
                </svg>
                LinkedIn
              </a>
              <a href="https://twitter.com/ameyakulkarni" className="cta-link" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X profile">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M18.244 2h3.308l-7.227 8.26L23 22h-6.655l-4.818-6.301L6.01 22H2.7l7.73-8.835L1 2h6.833l4.337 5.684L18.244 2zm-1.161 18h1.833L6.989 4H5.022L17.083 20z" />
                </svg>
                Twitter
              </a>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
