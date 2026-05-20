import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DigiSenseHero from '../../digisense_hero_image.png'
import LoadingScreen from '../components/LoadingScreen'
import NamePopup from '../components/NamePopup'
import { useName } from '../context/NameContext'

export default function HomePage() {
  const [showLoading, setShowLoading] = useState(true)
  const [showPopup, setShowPopup] = useState(false)
  const [contentReady, setContentReady] = useState(false)
  const { name } = useName()

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
      <LoadingScreen onComplete={() => {
        setShowLoading(false)
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
        {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-grid-highlight"></div>

        {/* FLOATING CARDS */}
        <div className="floating-card card-left" data-rotation="-4">
          <div className="card-coord">
            <span className="coord-x">X: 0</span>
            <div className="coord-dot"></div>
            <span className="coord-y">Y: 0</span>
          </div>
          <div className="card-inner">
            <div className="card-header">UX Strategy</div>
            <div className="card-diagram">
              <svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
                <path d="M20,40 Q50,10 80,40 Q50,70 20,40" stroke="var(--border)" strokeWidth="1.5" fill="none" strokeDasharray="4,4" />
                <circle cx="20" cy="40" r="4" fill="var(--accent)" />
                <circle cx="50" cy="25" r="4" fill="var(--text)" />
                <circle cx="80" cy="40" r="4" fill="var(--accent)" />
                <circle cx="50" cy="55" r="4" fill="var(--muted)" />
              </svg>
            </div>
            <div className="card-divider"></div>
            <div className="card-details">
              <div className="detail-row"><span>Research</span> <span className="badge">Generative</span></div>
              <div className="detail-row"><span>Prototyping</span> <span className="badge">Hi-Fi</span></div>
              <div className="detail-row"><span>Validation</span> <span className="badge">Usability</span></div>
            </div>
          </div>
        </div>

        <div className="floating-card card-right" data-rotation="6">
          <div className="card-coord">
            <span className="coord-x">X: 0</span>
            <div className="coord-dot"></div>
            <span className="coord-y">Y: 0</span>
          </div>
          <div className="card-inner">
            <div className="card-header">Performance Impact</div>
            <div className="card-metric-group">
              <div className="card-metric">+35<span style={{ fontSize: '0.6em' }}>%</span></div>
              <div className="card-metric-label">User Engagement</div>
            </div>
            <div className="card-chart">
              <svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <path d="M0,45 L0,50 L100,50 L100,5 Z" fill="url(#chartGrad)" opacity="0.1" />
                <path d="M0,45 Q20,40 30,30 T60,20 T100,5" stroke="var(--accent)" strokeWidth="2" fill="none" strokeLinecap="round" />
                <circle cx="100" cy="5" r="3" fill="var(--text)" />
              </svg>
            </div>
            <div className="card-divider"></div>
            <div className="card-details">
              <div className="detail-row"><span>Task Time</span> <span className="highlight">-2.5s</span></div>
              <div className="detail-row"><span>Conversion</span> <span className="highlight">+12.4%</span></div>
              <div className="detail-row"><span>Drop-off</span> <span className="highlight">-8.1%</span></div>
            </div>
          </div>
        </div>

        <div className="hero-content">
          <p className="hero-eyebrow reveal reveal-0">Lead UX Designer · 9.5 Years</p>
          <p className="hero-name reveal reveal-1">Ameya Kulkarni</p>
          <h1 className="hero-headline reveal reveal-2">
            I design complex systems that create measurable business outcomes.
          </h1>
          <p className="hero-subheadline reveal reveal-4">UX Strategy · Systems Design · AI/ML Product Design</p>
          <p className="hero-body reveal reveal-5">
            From connected tractors in rural India to enterprise SaaS platforms,
            I work at the intersection of strategic thinking, systems design,
            and measurable human behaviour. Every engagement starts with
            a hard problem and ends with a number that moved.
          </p>
          <div className="hero-ctas reveal reveal-6">
            <Link to="/digisense" className="btn-primary">
              Explore DiGiSense Case Study →
            </Link>
            <a href="#contact" className="btn-secondary">Schedule a Conversation</a>
          </div>
        </div>

        <div className="scroll-indicator reveal reveal-8">
          <span>Scroll to Explore</span>
        </div>
      </section>

      {/* CREDIBILITY STRIP */}
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

      {/* FEATURED WORK */}
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
                <span className="work-meta-value">Mahindra & Mahindra</span>
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

      {/* AI WORKFLOW PREVIEW */}
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

      {/* METRICS / IMPACT */}
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

      {/* ABOUT PREVIEW */}
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
              <strong>8+</strong>, and consistently delivered <strong>35%+ engagement lifts</strong>
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

      {/* CTA / CONTACT */}
      <section className="cta-section" id="contact">
        <div className="cta-inner">
          <p className="cta-eyebrow">Get in Touch</p>
          <h2 className="cta-headline">Let's build something great.</h2>
          <p className="cta-sub">I'm open to lead, principal, and AI-focused UX roles.</p>
          <a href="mailto:ameya@example.com" className="cta-btn">Schedule a Conversation →</a>
          <div className="cta-links">
            <a href="mailto:ameya@example.com" className="cta-link" aria-label="Send email">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2-8 5-8-5h16zm0 12H4V8.236l8 5 8-5V18z" />
              </svg>
              Email
            </a>
            <a href="https://linkedin.com/in/ameyakulkarni" className="cta-link" target="_blank" rel="noopener" aria-label="LinkedIn profile">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M19.959 3H4.041C3.468 3 3 3.468 3 4.041v15.918C3 20.532 3.468 21 4.041 21h15.918C20.532 21 21 20.532 21 19.959V4.041C21 3.468 20.532 3 19.959 3zM8.877 17.5H6.386V9.82h2.491V17.5zM7.631 8.773a1.444 1.444 0 110-2.888 1.444 1.444 0 010 2.888zM17.5 17.5h-2.49v-3.778c0-.9-.016-2.059-1.254-2.059-1.255 0-1.448.981-1.448 1.994V17.5h-2.49V9.82h2.39v1.061h.034c.332-.63 1.144-1.294 2.354-1.294 2.518 0 2.982 1.657 2.982 3.812V17.5z" />
              </svg>
              LinkedIn
            </a>
            <a href="https://twitter.com/ameyakulkarni" className="cta-link" target="_blank" rel="noopener" aria-label="Twitter / X profile">
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
