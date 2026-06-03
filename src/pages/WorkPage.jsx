import { useState, useEffect, useRef } from 'react'
import StackedGallery from '../components/StackedGallery'
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

// ── Beyond the brief section ───────────────────────────────────────────────
function BeyondSection({ sectionRef }) {
  return (
    <section ref={sectionRef} className="wk-beyond container" aria-labelledby="beyond-heading">

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

        <article className="bp-card wk-beyond-card" aria-label="Roles at Symbiosis Institute of Design">
          <div className="card-head">
            <span>SID · Symbiosis Institute of Design</span>
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

// ── Page ───────────────────────────────────────────────────────────────────
export default function WorkPage() {
  const bp = useBreakpoint()
  const isMobile = bp === "mobile"
  const beyondRef = useRef(null)

  const scrollToBeyond = () =>
    beyondRef.current?.scrollIntoView({ behavior: 'smooth' })

  // Mobile: swipe carousel + Beyond section below on scroll
  if (isMobile) {
    return (
      <div style={{ background: "var(--bg)" }}>
        <div style={{ height: "100dvh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ height: 72, flexShrink: 0 }} />
          <div style={{ padding: "12px 24px 20px", flexShrink: 0, pointerEvents: "none", userSelect: "none" }}>
            <span className="eyebrow">Work</span>
            <h1 className="section-title" style={{ fontSize: "clamp(30px, 8vw, 40px)", fontWeight: 800, lineHeight: 1.0, marginTop: 8 }}>
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
        <BeyondSection sectionRef={beyondRef} />
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "16px 24px", borderTop: "1px solid var(--border)", background: "var(--bg)",
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

  // Desktop + tablet: full-width gallery, scroll-down button, Beyond section below
  return (
    <div style={{ background: "var(--bg)" }}>

      {/* Gallery - full viewport, locked */}
      <div className="wk-gallery-section">
        <div className="wk-title-overlay container">
          <span className="eyebrow">Work</span>
          <h1 className="section-title" style={{ fontSize: "clamp(40px, 5vw, 68px)", fontWeight: 800, lineHeight: 1.0, marginTop: 12 }}>
            Case Studies.
          </h1>
          <p style={{ marginTop: 20, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>
            Scroll to explore
          </p>
        </div>

        <div style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
          <StackedGallery />
        </div>

        {/* Scroll-down affordance - bottom-center of gallery viewport */}
        <button
          onClick={scrollToBeyond}
          className="wk-scroll-down"
          aria-label="Scroll to more content"
        >
          <span className="wk-scroll-down-label">More below</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M7 2v10M2 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Beyond section - natural document flow below gallery */}
      <BeyondSection sectionRef={beyondRef} />

    </div>
  )
}
