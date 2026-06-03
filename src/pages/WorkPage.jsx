import { useState, useEffect } from 'react'
import StackedGallery from '../components/StackedGallery'

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

export default function WorkPage() {
  const bp = useBreakpoint()
  const isMobile = bp === "mobile"

  if (isMobile) {
    return (
      <div style={{ height: "100dvh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ height: 72, flexShrink: 0 }} />
        <div style={{ padding: "12px 24px 20px", flexShrink: 0, pointerEvents: "none", userSelect: "none" }}>
          <div className="section-eyebrow"><span>Selected Work</span></div>
          <h1 className="section-title" style={{ fontSize: "clamp(30px, 8vw, 40px)", marginTop: 8 }}>
            Case Studies.
          </h1>
          <p style={{ marginTop: 8, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", fontFamily: "var(--font-body)" }}>
            Swipe to explore
          </p>
        </div>
        <div style={{ flex: 1, minHeight: 0 }}>
          <StackedGallery />
        </div>

        <div style={{
          flexShrink: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 24px",
          borderTop: "1px solid var(--border)",
        }}>
          <div className="availability-status">
            <span className="pulse-dot" aria-hidden="true" />
            <span style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--muted)", textTransform: "uppercase", fontFamily: "var(--font-body)" }}>
              Available for projects
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

  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden", position: "relative" }}>
      <div style={{
        position: "absolute",
        top: "calc(72px + 5vh)",
        left: "clamp(32px, 5vw, 80px)",
        zIndex: 10,
        pointerEvents: "none",
        userSelect: "none",
      }}>
        <div className="section-eyebrow"><span>Selected Work</span></div>
        <h1 className="section-title" style={{ fontSize: "clamp(40px, 5vw, 68px)", marginTop: 12 }}>
          Case Studies.
        </h1>
        <p style={{ marginTop: 20, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", fontFamily: "var(--font-body)" }}>
          Scroll to explore
        </p>
      </div>
      <div style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
        <StackedGallery />
      </div>
    </div>
  )
}
