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
        <div style={{ padding: "12px 24px 8px", flexShrink: 0, pointerEvents: "none", userSelect: "none" }}>
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
      </div>
    )
  }

  return (
    <div style={{ height: "100vh", overflow: "hidden", position: "relative" }}>
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
      <StackedGallery />
    </div>
  )
}
