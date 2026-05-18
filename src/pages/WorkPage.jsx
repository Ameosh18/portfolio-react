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

  const hint = isMobile ? "Swipe to explore" : "Scroll to explore"

  return (
    <div style={{ height: "100vh", overflow: "hidden", position: "relative" }}>

      {/* Title overlay — clears 72px fixed nav */}
      <div style={{
        position: "absolute",
        top: isMobile ? "calc(72px + 12px)" : "calc(72px + 5vh)",
        left: isMobile ? 24 : "clamp(32px, 5vw, 80px)",
        zIndex: 10,
        pointerEvents: "none",
        userSelect: "none",
      }}>
        <div className="section-eyebrow">
          <span>Selected Work</span>
        </div>

        <h1
          className="section-title"
          style={{ fontSize: isMobile ? "clamp(30px, 8vw, 40px)" : "clamp(40px, 5vw, 68px)", marginTop: 12 }}
        >
          Case Studies.
        </h1>

        <p style={{
          marginTop: isMobile ? 12 : 20,
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--muted)",
          fontFamily: "var(--font-body)",
        }}>
          {hint}
        </p>
      </div>

      <StackedGallery />
    </div>
  )
}
