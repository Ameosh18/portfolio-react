import { useState, useEffect, useRef, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "motion/react"
import DigiSenseHero from "../../digisense_hero_image.png"

function useIsDark() {
  const [isDark, setIsDark] = useState(
    () => typeof document !== "undefined"
      ? document.documentElement.getAttribute("data-theme") !== "light"
      : true
  )
  useEffect(() => {
    const obs = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute("data-theme") !== "light")
    })
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] })
    return () => obs.disconnect()
  }, [])
  return isDark
}

// ── Responsive dimensions ──────────────────────────────────────────────────
const VW = typeof window !== "undefined" ? window.innerWidth : 1440
const IS_MOBILE = VW < 640
const IS_TABLET = VW >= 640 && VW < 1024

const CARD_W  = IS_MOBILE ? 230  : IS_TABLET ? 310  : 380
const CARD_H  = IS_MOBILE ? 310  : IS_TABLET ? 415  : 520
const IMG_H   = IS_MOBILE ? 110  : IS_TABLET ? 150  : 200
const STEP_X  = IS_MOBILE ? 185  : IS_TABLET ? 240  : 320
const STEP_Y  = IS_MOBILE ? -90  : IS_TABLET ? -120 : -162  // more vertical spread
const STEP_Z  = IS_MOBILE ? -220 : IS_TABLET ? -290 : -380
const PERSP   = IS_MOBILE ? "1000px"  : IS_TABLET ? "1400px"  : "2000px"
const PX_ORG  = IS_MOBILE ? "50% 50%" : "5% 50%"
const CONT_TY = IS_MOBILE ? 30        : IS_TABLET ? 50        : 24  // less downward shift = fills top

// ── Hover lift — "pulling a file from the stack" ───────────────────────────
const HOVER_LIFT_Y   = IS_MOBILE ? -44 : -112   // visible rise above stack
const HOVER_Z        = IS_MOBILE ? 70  : 230    // comes well forward toward viewer
const HOVER_ROTATE_Y = IS_MOBILE ? -50 : -10    // almost face-on as if pulled out
const SPRING_CFG     = { stiffness: 260, damping: 24, mass: 0.65 }

// ── Carousel constants ─────────────────────────────────────────────────────
const ROTATE_Y    = -50
const WHEEL_SPEED = IS_MOBILE ? 0.18 : 0.28
const TOUCH_SPEED = IS_MOBILE ? 0.55 : 0.7
const COPIES      = 2
const N           = 5
const TOTAL       = N * COPIES
const WRAP_DIST   = TOTAL * STEP_X
const CENTER_IDX  = N
const INIT_OFFSET = -CENTER_IDX * STEP_X

// ── Projects ───────────────────────────────────────────────────────────────
const projects = [
  {
    id: "digisense",
    num: "01",
    title: "DiGiSense",
    category: "Enterprise SaaS · IoT",
    summary: "Redesigned AI-powered vehicle telematics for 100K+ fleet operators",
    year: "2023",
    image: DigiSenseHero,
    gradient: null,
    href: "/digisense",
  },
  {
    id: "pfsone",
    num: "02",
    title: "NETSCOUT PFS ONE",
    category: "Enterprise Network",
    summary: "Unified network visibility platform for global data centres",
    year: "2024",
    image: null,
    gradient: "linear-gradient(140deg, #0a0f1e 0%, #1a2a5e 60%, #0a1628 100%)",
    href: "/pfsone",
  },
  {
    id: "innoplexus",
    num: "03",
    title: "Innoplexus",
    category: "Life Sciences · AI",
    summary: "AI-assisted drug discovery workflows for global research teams",
    year: "2022",
    image: null,
    gradient: "linear-gradient(140deg, #0d1a0d 0%, #1a4020 60%, #061a0a 100%)",
    href: null,
  },
  {
    id: "extentia",
    num: "04",
    title: "Extentia",
    category: "Fintech · B2B SaaS",
    summary: "End-to-end product design for multi-role financial services",
    year: "2020",
    image: null,
    gradient: "linear-gradient(140deg, #1a0a0a 0%, #4a1010 60%, #1a0808 100%)",
    href: null,
  },
  {
    id: "ogee",
    num: "05",
    title: "Ogee Studio",
    category: "Design Systems",
    summary: "Token-based design system spanning 3 digital products",
    year: "2021",
    image: null,
    gradient: "linear-gradient(140deg, #0f0a1a 0%, #2a1a5e 60%, #0d0a1e 100%)",
    href: null,
  },
]

const CARDS = Array.from({ length: COPIES }, () => projects).flat()

// ── Math helpers ───────────────────────────────────────────────────────────
function wrapValue(raw) {
  const half = WRAP_DIST / 2
  return ((((raw + half) % WRAP_DIST) + WRAP_DIST) % WRAP_DIST) - half
}

function getBrightness(wx) {
  const steps = Math.abs(wx) / STEP_X
  return Math.max(0.65, Math.min(1.15, 1.15 - steps * 0.09))
}

// ── Card visual ────────────────────────────────────────────────────────────
function CardFace({ card, isDark, isHovered }) {
  const panelH = CARD_H - IMG_H + 24

  const panel = isDark
    ? { bg: "linear-gradient(180deg, #1c1c1e 0%, #141414 100%)", cat: "#666", title: "white", summary: "#888", sep: "rgba(255,255,255,0.07)", num: "white", muted: "#555", year: "#aaa", border: "rgba(255,255,255,0.06)" }
    : { bg: "linear-gradient(180deg, #F0EDE8 0%, #E8E4DE 100%)", cat: "#999", title: "#1A1A1A", summary: "#666", sep: "rgba(0,0,0,0.1)", num: "#1A1A1A", muted: "#999", year: "#555", border: "rgba(0,0,0,0.07)" }

  return (
    <div style={{
      width: CARD_W,
      height: CARD_H,
      position: "relative",
      borderRadius: 24,
      overflow: "hidden",
      isolation: "isolate",
      background: isDark ? "#111" : "#E8E4DE",
      boxShadow: isHovered
        ? "0 56px 100px rgba(0,0,0,0.75), 0 20px 40px rgba(0,0,0,0.5)"
        : "0 8px 24px rgba(0,0,0,0.25)",
      transition: "box-shadow 0.45s ease",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: IMG_H, overflow: "hidden" }}>
        {card.image ? (
          <img src={card.image} alt={card.title} draggable={false}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", background: card.gradient }} />
        )}
        <div style={{
          position: "absolute", top: 14, right: 16, color: "white", textAlign: "right",
          fontFamily: '"DM Sans", sans-serif', fontSize: IS_MOBILE ? 10 : 12, fontWeight: 600,
          lineHeight: 1.35, textShadow: "0 1px 6px rgba(0,0,0,0.7)", userSelect: "none",
        }}>
          {card.title}<br />
          <span style={{ fontWeight: 400, opacity: 0.8 }}>{card.category}</span>
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: panelH,
        background: panel.bg, borderRadius: "24px 24px 0 0",
        padding: IS_MOBILE ? "16px 14px 14px" : "20px 20px 18px",
        display: "flex", flexDirection: "column", boxSizing: "border-box",
      }}>
        <div style={{ fontSize: IS_MOBILE ? 9 : 10, letterSpacing: "0.12em", textTransform: "uppercase", color: panel.cat, fontFamily: '"DM Sans", sans-serif', marginBottom: 6 }}>
          {card.category}
        </div>
        <div style={{ fontSize: IS_MOBILE ? 16 : 20, fontWeight: 700, color: panel.title, lineHeight: 1.2, fontFamily: '"DM Sans", sans-serif', letterSpacing: "-0.01em", marginBottom: 6 }}>
          {card.title}
        </div>
        <div style={{ fontSize: IS_MOBILE ? 10 : 12, color: panel.summary, lineHeight: 1.55, fontFamily: '"DM Sans", sans-serif' }}>
          {card.summary}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderTop: `1px solid ${panel.sep}`, paddingTop: IS_MOBILE ? 10 : 14, marginTop: IS_MOBILE ? 8 : 12 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span style={{ fontSize: IS_MOBILE ? 22 : 28, fontWeight: 700, color: panel.num, lineHeight: 1, fontFamily: '"DM Sans", sans-serif' }}>{card.num}</span>
            <span style={{ fontSize: IS_MOBILE ? 10 : 12, color: panel.muted, fontFamily: '"DM Sans", sans-serif' }}>Project</span>
          </div>
          <div style={{ fontSize: IS_MOBILE ? 11 : 13, fontWeight: 600, color: panel.year, fontFamily: '"DM Sans", sans-serif' }}>{card.year}</div>
        </div>
      </div>

      <div style={{ position: "absolute", inset: 0, borderRadius: 24, border: `1px solid ${panel.border}`, pointerEvents: "none" }} />
    </div>
  )
}

// ── Hover detail panel ─────────────────────────────────────────────────────
function HoverPanel({ card, isDark, onEnter, onLeave }) {
  const navigate = useNavigate()

  const c = isDark
    ? {
        line:       "rgba(255,255,255,0.65)",
        eyebrow:    "rgba(255,255,255,0.45)",
        title:      "rgba(255,255,255,0.96)",
        divider:    "rgba(255,255,255,0.12)",
        summary:    "rgba(255,255,255,0.62)",
        comingSoon: "rgba(255,255,255,0.28)",
      }
    : {
        line:       "rgba(0,0,0,0.45)",
        eyebrow:    "#777777",
        title:      "#1A1A1A",
        divider:    "rgba(0,0,0,0.1)",
        summary:    "#5A5A5A",
        comingSoon: "#AAAAAA",
      }

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: "absolute",
        left: CARD_W + 28,
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        alignItems: "flex-start",
        pointerEvents: "auto",
        width: 300,
      }}
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ width: 64, height: 1.5, background: c.line, transformOrigin: "left", flexShrink: 0, marginTop: 13 }}
      />

      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, delay: 0.1 }}
        style={{ marginLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}
      >
        <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: c.eyebrow, fontFamily: '"DM Sans", sans-serif', lineHeight: 1 }}>
          {card.num} · {card.category}
        </div>
        <div style={{ fontSize: IS_TABLET ? 18 : 22, fontWeight: 700, color: c.title, fontFamily: '"DM Sans", sans-serif', letterSpacing: "-0.02em", lineHeight: 1.15, whiteSpace: "nowrap" }}>
          {card.title}
        </div>
        <div style={{ width: 200, height: 1, background: c.divider, marginTop: 2, marginBottom: 2 }} />
        <div style={{ fontSize: IS_TABLET ? 12 : 13, color: c.summary, fontFamily: '"DM Sans", sans-serif', lineHeight: 1.6, maxWidth: 260 }}>
          {card.summary}
        </div>
        {card.href ? (
          <button
            onClick={() => navigate(card.href)}
            style={{
              marginTop: 10, display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase",
              fontWeight: 600, fontFamily: '"DM Sans", sans-serif',
              color: "#0A0A0A", background: "var(--accent, #C8A97E)",
              border: "none", borderRadius: 100, padding: "10px 20px",
              width: "fit-content", whiteSpace: "nowrap",
            }}
          >
            View Case Study →
          </button>
        ) : (
          <div style={{ marginTop: 10, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: c.comingSoon, fontFamily: '"DM Sans", sans-serif' }}>
            Coming soon
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

// ── Plane (3D card in space) ───────────────────────────────────────────────
function Plane({ card, index, offset, isDark, isBlurred, onEnter, onClear }) {  // isDark forwarded to HoverPanel
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)
  const leaveTimer = useRef(null)

  const x      = useTransform(offset, (off) => wrapValue(index * STEP_X + off))
  const baseY  = useTransform(x, (v) => (v / STEP_X) * STEP_Y)
  const baseZ  = useTransform(x, (v) => (v / STEP_X) * STEP_Z)
  const filter = useTransform(x, (v) => `brightness(${getBrightness(v).toFixed(3)})`)

  const liftTarget = useMotionValue(0)
  const liftSpring = useSpring(liftTarget, SPRING_CFG)
  const fwdTarget  = useMotionValue(0)
  const fwdSpring  = useSpring(fwdTarget, SPRING_CFG)
  const rotTarget  = useMotionValue(ROTATE_Y)
  const rotSpring  = useSpring(rotTarget, SPRING_CFG)

  const effectiveY = useTransform([baseY, liftSpring], ([by, lift]) => by + lift)
  const effectiveZ = useTransform([baseZ, fwdSpring],  ([bz, fwd])  => bz + fwd)

  // keep wrapValue reactive
  useMotionValueEvent(x, "change", () => {})

  const handleEnter = () => {
    if (leaveTimer.current) { clearTimeout(leaveTimer.current); leaveTimer.current = null }
    if (!isHovered) {
      setIsHovered(true)
      liftTarget.set(HOVER_LIFT_Y)
      fwdTarget.set(HOVER_Z)
      rotTarget.set(HOVER_ROTATE_Y)
    }
    onEnter()
  }

  const handleLeave = () => {
    leaveTimer.current = setTimeout(() => {
      setIsHovered(false)
      liftTarget.set(0)
      fwdTarget.set(0)
      rotTarget.set(ROTATE_Y)
      onClear()
    }, 120)
  }

  return (
    <motion.div
      style={{
        position: "absolute",
        x,
        y: effectiveY,
        z: effectiveZ,
        rotateY: rotSpring,
        filter,
        willChange: "transform",
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* De-emphasise non-hovered cards — opacity only, no filter inside preserve-3d */}
      <div style={{
        opacity: isBlurred ? 0.82 : 1,
        transition: "opacity 0.4s ease",
        pointerEvents: isBlurred ? "none" : "auto",
      }}>
        <div onClick={() => card.href && navigate(card.href)} style={{ cursor: card.href ? "pointer" : "default" }}>
          <CardFace card={card} isDark={isDark} isHovered={isHovered} />
        </div>
        <div style={{
          position: "absolute", top: -22, left: 0,
          fontSize: 10, color: "rgba(255,255,255,0.35)",
          letterSpacing: "0.06em", fontFamily: '"DM Sans", sans-serif',
          userSelect: "none", pointerEvents: "none",
        }}>
          {card.num}
        </div>
      </div>

      {/* Hover panel — always full opacity, not inside blur wrapper */}
      <AnimatePresence>
        {isHovered && !IS_MOBILE && (
          <HoverPanel card={card} isDark={isDark} onEnter={handleEnter} onLeave={handleLeave} />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Main export ────────────────────────────────────────────────────────────
export default function StackedGallery() {
  const isDark = useIsDark()
  const containerRef = useRef(null)
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const hoveredIdxRef = useRef(null)

  const handleEnter = useCallback((idx) => {
    hoveredIdxRef.current = idx
    setHoveredIdx(idx)
  }, [])

  const handleClearIfSame = useCallback((idx) => {
    if (hoveredIdxRef.current === idx) {
      hoveredIdxRef.current = null
      setHoveredIdx(null)
    }
  }, [])

  const targetOffset = useMotionValue(INIT_OFFSET)
  const offset = useSpring(targetOffset, { damping: 36, stiffness: 160, mass: 0.7 })

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  useEffect(() => {
    const el = containerRef.current
    if (!el || prefersReduced) return

    const onWheel = (e) => {
      e.preventDefault()
      targetOffset.set(targetOffset.get() - e.deltaY * WHEEL_SPEED)
    }

    let touchStartY = 0
    const onTouchStart = (e) => { touchStartY = e.touches[0].clientY }
    const onTouchMove = (e) => {
      e.preventDefault()
      const dy = touchStartY - e.touches[0].clientY
      touchStartY = e.touches[0].clientY
      targetOffset.set(targetOffset.get() - dy * TOUCH_SPEED)
    }

    el.addEventListener("wheel", onWheel, { passive: false })
    el.addEventListener("touchstart", onTouchStart, { passive: true })
    el.addEventListener("touchmove", onTouchMove, { passive: false })

    return () => {
      el.removeEventListener("wheel", onWheel)
      el.removeEventListener("touchstart", onTouchStart)
      el.removeEventListener("touchmove", onTouchMove)
    }
  }, [targetOffset, prefersReduced])

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        background: isDark ? "#0A0A0A" : "#F7F4F0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", zIndex: 50,
        bottom: IS_MOBILE ? 16 : "3vw",
        right: IS_MOBILE ? 16 : "3vw",
        fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase",
        color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
        fontFamily: '"DM Sans", sans-serif',
        userSelect: "none", pointerEvents: "none",
      }}>
        scroll to explore
      </div>

      <div style={{
        width: "100%", height: "100%",
        display: "flex", alignItems: "center", justifyContent: "center",
        perspective: PERSP, perspectiveOrigin: PX_ORG,
      }}>
        <div style={{
          position: "relative",
          transformStyle: "preserve-3d",
          transform: `translateX(${-CARD_W / 2}px) translateY(${CONT_TY}px)`,
        }}>
          {CARDS.map((card, i) => (
            <Plane
              key={`${card.id}-${i}`}
              card={card}
              index={i}
              offset={offset}
              isDark={isDark}
              isBlurred={hoveredIdx !== null && hoveredIdx !== i}
              onEnter={() => handleEnter(i)}
              onClear={() => handleClearIfSame(i)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
