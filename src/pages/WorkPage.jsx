import StackedGallery from '../components/StackedGallery'

const IS_MOBILE = typeof window !== "undefined" && window.innerWidth < 640

export default function WorkPage() {
  if (IS_MOBILE) {
    return (
      <div style={{ height: "100dvh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Nav spacer */}
        <div style={{ height: 72, flexShrink: 0 }} />

        {/* Title block */}
        <div style={{ padding: "12px 24px 8px", flexShrink: 0, pointerEvents: "none", userSelect: "none" }}>
          <div className="section-eyebrow"><span>Selected Work</span></div>
          <h1 className="section-title" style={{ fontSize: "clamp(30px, 8vw, 40px)", marginTop: 8 }}>
            Case Studies.
          </h1>
          <p style={{
            marginTop: 8,
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--muted)",
            fontFamily: "var(--font-body)",
          }}>
            Swipe to explore
          </p>
        </div>

        {/* Gallery fills remaining space */}
        <div style={{ flex: 1, minHeight: 0 }}>
          <StackedGallery />
        </div>
      </div>
    )
  }

  return (
    <div style={{ height: "400vh", position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        <StackedGallery />
      </div>
    </div>
  )
}
