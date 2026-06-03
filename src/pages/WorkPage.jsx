import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import StackedGallery, { projects } from '../components/StackedGallery'
import DigiSenseHero from '../../digisense_hero_image.png'
import '../work.css'

// ── Parallel activities data ───────────────────────────────────────────────
const SID_ROLES = [
  { key: 'Visiting Faculty',            since: '2023' },
  { key: 'External Jury',               since: '2023' },
  { key: 'Programme Review Committee',  since: '2023' },
]

// ── Breakpoint hook ────────────────────────────────────────────────────────
function useBreakpoint() {
  const get = () => {
    if (typeof window === "undefined") return "desktop"
    const w = window.innerWidth
    return w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop"
  }
  const [bp, setBp] = useState(get)
  useEffect(() => {
    const handler = () => setBp(get())
    window.addEventListener("resize", handler)
    return () => window.removeEventListener("resize", handler)
  }, [])
  return bp
}

// ── Beyond the brief section (shared across breakpoints) ───────────────────
function BeyondSection() {
  return (
    <section className="wk-beyond" aria-labelledby="beyond-heading">

      <div className="wk-beyond-head">
        <span className="eyebrow">Beyond the brief</span>
        <h2
          id="beyond-heading"
          className="section-title"
          style={{ marginTop: 14, fontSize: "clamp(28px, 3.6vw, 48px)" }}
        >
          Other things I do.
        </h2>
      </div>

      <div className="wk-beyond-grid">

        {/* Card 1 — Symbiosis Institute of Design */}
        <article className="bp-card wk-beyond-card" aria-label="Roles at Symbiosis Institute of Design">
          <div className="card-head">
            <span>SID — Symbiosis Institute of Design</span>
            <span className="dot" aria-hidden="true" />
          </div>

          {SID_ROLES.map(({ key, since }) => (
            <div key={key} className="disc-row">
              <span className="k">{key}</span>
              <span className="v">Since {since}</span>
            </div>
          ))}

          <div className="wk-beyond-tag">Education · Design Critique</div>
        </article>

        {/* Card 2 — Analyzethis.ai */}
        <article className="bp-card wk-beyond-card" aria-label="Role at Analyzethis.ai">
          <div className="card-head">
            <span>Analyzethis.ai</span>
            <span className="dot" aria-hidden="true" />
          </div>

          <div className="disc-row">
            <span className="k">Role</span>
            <span className="v">Ideator</span>
          </div>
          <div className="disc-row">
            <span className="k">Since</span>
            <span className="v">2025</span>
          </div>

          <p className="wk-beyond-desc">
            Early-stage AI product ideation and UX strategy.
          </p>

          <div className="wk-beyond-tag">Product · AI</div>
        </article>

      </div>
    </section>
  )
}

// ── Desktop/tablet: flat scrollable work card grid ─────────────────────────
function WorkCard({ card }) {
  const inner = (
    <>
      <div className="work-card-media">
        {card.image
          ? <img src={card.image} alt={card.title} />
          : <div className="ph"><span>{card.title}</span></div>
        }
        <span className="work-card-index">{card.num}</span>
        <span className="work-card-domain">{card.category}</span>
      </div>
      <div className="work-card-body">
        <span className="work-card-sub">{card.category}</span>
        <h3 className="work-card-title">{card.title}</h3>
        <p className="work-card-desc">{card.summary}</p>
        <div className="work-card-meta">
          <div><span className="m-k">Role</span><span className="m-v">Lead UX Designer</span></div>
          <div><span className="m-k">Year</span><span className="m-v">{card.year}</span></div>
          <div><span className="m-k">Status</span><span className="m-v">{card.href ? 'Case study' : 'Coming soon'}</span></div>
        </div>
        {card.href
          ? <span className="work-card-cta">Read Case Study <span className="arrow">→</span></span>
          : <span className="work-card-cta wk-coming-soon">Coming Soon</span>
        }
      </div>
    </>
  )

  return card.href
    ? <Link to={card.href} className="work-card">{inner}</Link>
    : <div className="work-card wk-card-locked" aria-label={`${card.title} — coming soon`}>{inner}</div>
}

function DesktopWorkGrid() {
  return (
    <div className="wk-grid-wrap">
      <div className="wk-grid-head">
        <div className="section-eyebrow"><span>Selected Work</span></div>
        <h1 className="section-title" style={{ fontSize: "clamp(40px, 5vw, 68px)", marginTop: 12 }}>
          Case Studies.
        </h1>
      </div>
      <div className="work-grid wk-work-grid">
        {projects.map(card => <WorkCard key={card.id} card={card} />)}
      </div>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function WorkPage() {
  const bp = useBreakpoint()
  const isMobile = bp === "mobile"

  if (isMobile) {
    return (
      <div style={{ background: "var(--bg)" }}>

        {/* Gallery screen — full viewport height, locked */}
        <div style={{ height: "100dvh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ height: 72, flexShrink: 0 }} />
          <div style={{ padding: "12px 24px 20px", flexShrink: 0, pointerEvents: "none", userSelect: "none" }}>
            <div className="section-eyebrow"><span>Selected Work</span></div>
            <h1 className="section-title" style={{ fontSize: "clamp(30px, 8vw, 40px)", marginTop: 8 }}>
              Case Studies.
            </h1>
            <p style={{ marginTop: 8, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>
              Swipe to explore
            </p>
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
            <StackedGallery />
          </div>
        </div>

        {/* Beyond section */}
        <BeyondSection />

        {/* Footer bar */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 24px",
          borderTop: "1px solid var(--border)",
          background: "var(--bg)",
        }}>
          <div className="availability-status">
            <span className="pulse-dot" aria-hidden="true" />
            <span style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--text-muted)", textTransform: "uppercase", fontFamily: "var(--font-body)" }}>
              Open for new opportunities
            </span>
          </div>
          <a
            href="mailto:ameya.kulkarni@outlook.com"
            style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.1em", color: "var(--accent)", textDecoration: "none", textTransform: "uppercase", fontFamily: "var(--font-body)" }}
          >
            Get in touch ↗︎
          </a>
        </div>

      </div>
    )
  }

  // Desktop + tablet: flat scrollable grid
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div style={{ height: 72 }} />
      <DesktopWorkGrid />
      <BeyondSection />
    </div>
  )
}
