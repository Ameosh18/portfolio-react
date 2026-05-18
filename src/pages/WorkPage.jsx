import StackedGallery from '../components/StackedGallery'

export default function WorkPage() {
  return (
    <div style={{ height: "100vh", overflow: "hidden", position: "relative" }}>

      {/* Title overlay — top-left, clears 72px nav */}
      <div style={{
        position: "absolute",
        top: "calc(72px + 5vh)",
        left: "clamp(32px, 5vw, 80px)",
        zIndex: 10,
        pointerEvents: "none",
        userSelect: "none",
      }}>
        <div className="section-eyebrow">
          <span>Selected Work</span>
        </div>

        <h1 className="section-title" style={{ fontSize: "clamp(40px, 5vw, 68px)", marginTop: 12 }}>
          Case Studies.
        </h1>

        <p style={{
          marginTop: 20,
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--muted)",
          fontFamily: "var(--font-body)",
        }}>
          Scroll to explore
        </p>
      </div>

      <StackedGallery />
    </div>
  )
}
