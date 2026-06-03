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

// ── Theme hook ─────────────────────────────────────────────────────────────
function useIsDark() {
  const [isDark, setIsDark] = useState(
    () => typeof document !== "undefined"
      ? document.documentElement.getAttribute("data-theme") !== "light"
      : true
  )
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setIsDark(document.documentElement.getAttribute("data-theme") !== "light")
    )
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] })
    return () => obs.disconnect()
  }, [])
  return isDark
}

// ── Reactive breakpoint (handles orientation change) ───────────────────────
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

// ── Static 3D constants (computed once - fine since 3D only runs on desktop/tablet) ──
const VW = typeof window !== "undefined" ? window.innerWidth : 1440
const IS_MOBILE = VW < 640
const IS_TABLET = VW >= 640 && VW < 1024

const CARD_W  = IS_MOBILE ? 230  : IS_TABLET ? 300  : 380
const CARD_H  = IS_MOBILE ? 310  : IS_TABLET ? 400  : 520
const IMG_H   = IS_MOBILE ? 110  : IS_TABLET ? 145  : 200
const STEP_X  = IS_MOBILE ? 185  : IS_TABLET ? 235  : 320
const STEP_Y  = IS_MOBILE ? -90  : IS_TABLET ? -115 : -162
const STEP_Z  = IS_MOBILE ? -220 : IS_TABLET ? -270 : -380
const PERSP   = IS_TABLET ? "1400px" : "2000px"
// Tablet: softer left-anchor; Desktop: dramatic left-anchor
const PX_ORG  = IS_TABLET ? "28% 50%" : "5% 50%"
const CONT_TY = IS_TABLET ? 40 : 24

// Tablet: gentler tilt so the scene reads on a narrower screen
const ROTATE_Y     = IS_TABLET ? -38 : -50
const HOVER_LIFT_Y = IS_TABLET ? -55 : -112
const HOVER_Z      = IS_TABLET ? 110 : 230
const HOVER_RY     = IS_TABLET ? -16 : -10
const SPRING_CFG   = { stiffness: 320, damping: 20, mass: 0.55 }

const WHEEL_SPEED = IS_TABLET ? 0.4 : 0.5
const TOUCH_SPEED = 0.8
const COPIES      = 2
const N           = 5
const TOTAL       = N * COPIES
const WRAP_DIST   = TOTAL * STEP_X
const CENTER_IDX  = N
const INIT_OFFSET = -CENTER_IDX * STEP_X

// ── Projects ───────────────────────────────────────────────────────────────
export const projects = [
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
  return Math.max(0.65, Math.min(1.0, 1.0 - steps * 0.09))
}

// ── Shared card face (used by both mobile + 3D) ────────────────────────────
function CardFace({ card, isDark, isHovered, w = CARD_W, h = CARD_H, imgH = IMG_H }) {
  const panelH = h - imgH + 24
  const small = w < 260

  const panel = isDark
    ? { bg: "linear-gradient(180deg, #1c1c1e 0%, #141414 100%)", cat: "#666", title: "white", summary: "#888", sep: "rgba(255,255,255,0.07)", num: "white", muted: "#555", year: "#aaa", border: "rgba(255,255,255,0.06)" }
    : { bg: "linear-gradient(180deg, #F0EDE8 0%, #E8E4DE 100%)", cat: "#999", title: "#1A1A1A", summary: "#666", sep: "rgba(0,0,0,0.1)", num: "#1A1A1A", muted: "#999", year: "#555", border: "rgba(0,0,0,0.07)" }

  return (
    <div style={{
      width: w, height: h, position: "relative", borderRadius: 24,
      overflow: "hidden", isolation: "isolate",
      background: isDark ? "#111" : "#E8E4DE",
      boxShadow: isHovered
        ? "0 56px 100px rgba(0,0,0,0.75), 0 20px 40px rgba(0,0,0,0.5)"
        : "0 8px 24px rgba(0,0,0,0.25)",
      transition: "box-shadow 0.45s ease",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: imgH, overflow: "hidden" }}>
        {card.image
          ? <img src={card.image} alt={card.title} draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          : <div style={{ width: "100%", height: "100%", background: card.gradient }} />
        }
        <div style={{
          position: "absolute", top: 14, right: 16, color: "white", textAlign: "right",
          fontFamily: '"DM Sans", sans-serif', fontSize: small ? 10 : 12, fontWeight: 600,
          lineHeight: 1.35, textShadow: "0 1px 6px rgba(0,0,0,0.7)", userSelect: "none",
        }}>
          {card.title}<br />
          <span style={{ fontWeight: 400, opacity: 0.8 }}>{card.category}</span>
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: panelH,
        background: panel.bg, borderRadius: "24px 24px 0 0",
        padding: small ? "14px 14px 14px" : "20px 20px 18px",
        display: "flex", flexDirection: "column", boxSizing: "border-box",
      }}>
        <div style={{ fontSize: small ? 9 : 10, letterSpacing: "0.12em", textTransform: "uppercase", color: panel.cat, fontFamily: '"DM Sans", sans-serif', marginBottom: 6 }}>
          {card.category}
        </div>
        <div style={{ fontSize: small ? 15 : 20, fontWeight: 700, color: panel.title, lineHeight: 1.2, fontFamily: '"DM Sans", sans-serif', letterSpacing: "-0.01em", marginBottom: 6 }}>
          {card.title}
        </div>
        <div style={{ fontSize: small ? 11 : 12, color: panel.summary, lineHeight: 1.55, fontFamily: '"DM Sans", sans-serif' }}>
          {card.summary}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderTop: `1px solid ${panel.sep}`, paddingTop: small ? 10 : 14, marginTop: small ? 8 : 12 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span style={{ fontSize: small ? 20 : 28, fontWeight: 700, color: panel.num, lineHeight: 1, fontFamily: '"DM Sans", sans-serif' }}>{card.num}</span>
            <span style={{ fontSize: small ? 10 : 12, color: panel.muted, fontFamily: '"DM Sans", sans-serif' }}>Project</span>
          </div>
          <div style={{ fontSize: small ? 11 : 13, fontWeight: 600, color: panel.year, fontFamily: '"DM Sans", sans-serif' }}>{card.year}</div>
        </div>
      </div>

      <div style={{ position: "absolute", inset: 0, borderRadius: 24, border: `1px solid ${panel.border}`, pointerEvents: "none" }} />
    </div>
  )
}

// ── Desktop / Tablet: hover panel ──────────────────────────────────────────
function HoverPanel({ card, isDark, isTablet, onEnter, onLeave }) {
  const navigate = useNavigate()

  const c = isDark
    ? { line: "rgba(255,255,255,0.65)", eyebrow: "rgba(255,255,255,0.45)", title: "rgba(255,255,255,0.96)", divider: "rgba(255,255,255,0.12)", summary: "rgba(255,255,255,0.62)", comingSoon: "rgba(255,255,255,0.28)" }
    : { line: "rgba(0,0,0,0.45)", eyebrow: "#777777", title: "#1A1A1A", divider: "rgba(0,0,0,0.1)", summary: "#5A5A5A", comingSoon: "#AAAAAA" }

  // On tablet position the panel above the card so it doesn't overflow the right edge
  const panelLeft = isTablet ? 0 : CARD_W + 28
  const panelTop  = isTablet ? "auto" : "50%"
  const panelBottom = isTablet ? CARD_H + 16 : "auto"
  const panelTransform = isTablet ? "none" : "translateY(-50%)"
  const panelWidth = isTablet ? Math.min(CARD_W, 280) : 300

  return (
    <motion.div
      initial={{ opacity: 0, y: isTablet ? 8 : 0, x: isTablet ? 0 : -16 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: isTablet ? 8 : 0, x: isTablet ? 0 : -16 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: "absolute",
        left: panelLeft, top: panelTop, bottom: panelBottom,
        transform: panelTransform,
        display: "flex",
        alignItems: isTablet ? "flex-start" : "flex-start",
        flexDirection: isTablet ? "column" : "row",
        pointerEvents: "auto",
        width: panelWidth,
      }}
    >
      {!isTablet && (
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ width: 64, height: 1.5, background: c.line, transformOrigin: "left", flexShrink: 0, marginTop: 13 }}
        />
      )}

      <motion.div
        initial={{ opacity: 0, x: isTablet ? 0 : -10, y: isTablet ? -6 : 0 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, delay: 0.08 }}
        style={{ marginLeft: isTablet ? 0 : 18, display: "flex", flexDirection: "column", gap: 5 }}
      >
        <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: c.eyebrow, fontFamily: '"DM Sans", sans-serif', lineHeight: 1 }}>
          {card.num} · {card.category}
        </div>
        <div style={{ fontSize: isTablet ? 17 : 22, fontWeight: 700, color: c.title, fontFamily: '"DM Sans", sans-serif', letterSpacing: "-0.02em", lineHeight: 1.15, whiteSpace: isTablet ? "normal" : "nowrap" }}>
          {card.title}
        </div>
        <div style={{ width: "100%", height: 1, background: c.divider, marginTop: 2, marginBottom: 2 }} />
        <div style={{ fontSize: 12, color: c.summary, fontFamily: '"DM Sans", sans-serif', lineHeight: 1.6, maxWidth: panelWidth }}>
          {card.summary}
        </div>
        {card.href ? (
          <button onClick={() => navigate(card.href)} style={{
            marginTop: 8, display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase",
            fontWeight: 600, fontFamily: '"DM Sans", sans-serif',
            color: "#0A0A0A", background: "var(--accent, #C8A97E)",
            border: "none", borderRadius: 100, padding: "10px 20px",
            width: "fit-content", whiteSpace: "nowrap",
          }}>
            View Case Study →
          </button>
        ) : (
          <div style={{ marginTop: 8, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: c.comingSoon, fontFamily: '"DM Sans", sans-serif' }}>
            Coming soon
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

// ── Desktop / Tablet: single 3D card ──────────────────────────────────────
function Plane({ card, index, offset, isDark, isTablet, isBlurred, onEnter, onClear }) {
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

  useMotionValueEvent(x, "change", () => {})

  const handleEnter = () => {
    if (leaveTimer.current) { clearTimeout(leaveTimer.current); leaveTimer.current = null }
    if (!isHovered) {
      setIsHovered(true)
      liftTarget.set(HOVER_LIFT_Y)
      fwdTarget.set(HOVER_Z)
      rotTarget.set(HOVER_RY)
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
      style={{ position: "absolute", x, y: effectiveY, z: effectiveZ, rotateY: rotSpring, filter, willChange: "transform" }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div style={{ opacity: isBlurred ? 0.82 : 1, transition: "opacity 0.4s ease", pointerEvents: isBlurred ? "none" : "auto" }}>
        <div onClick={() => card.href && navigate(card.href)} style={{ cursor: card.href ? "pointer" : "default" }}>
          <CardFace card={card} isDark={isDark} isHovered={isHovered} />
        </div>
        <div style={{ position: "absolute", top: -22, left: 0, fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em", fontFamily: '"DM Sans", sans-serif', userSelect: "none", pointerEvents: "none" }}>
          {card.num}
        </div>
      </div>

      <AnimatePresence>
        {isHovered && (
          <HoverPanel card={card} isDark={isDark} isTablet={isTablet} onEnter={handleEnter} onLeave={handleLeave} />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Mobile: flat horizontal swipe carousel ────────────────────────────────
function MobileCarousel({ isDark }) {
  const navigate     = useNavigate()
  const [current, setCurrent] = useState(0)
  const stripRef     = useRef(null)
  const [stripH, setStripH] = useState(
    typeof window !== "undefined" ? window.innerHeight * 0.55 : 380
  )
  const touchStartX  = useRef(0)
  const touchStartY  = useRef(0)
  const N_CARDS = projects.length

  useEffect(() => {
    const el = stripRef.current
    if (!el) return
    const obs = new ResizeObserver(([e]) => setStripH(e.contentRect.height))
    obs.observe(el)
    setStripH(el.offsetHeight)
    return () => obs.disconnect()
  }, [])

  const vw    = typeof window !== "undefined" ? window.innerWidth : 375
  const ASPECT = 520 / 380
  const cardH  = stripH
  const cardW  = Math.min(vw - 48, Math.round(stripH / ASPECT))
  const imgH   = Math.round(cardH * (200 / 520))

  const gap     = 16
  const slide   = cardW + gap
  const targetX = -(current * slide) + (vw / 2 - cardW / 2)

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    if (Math.abs(dx) < Math.abs(dy) * 1.2) return
    if (dx < -44 && current < N_CARDS - 1) setCurrent(c => c + 1)
    else if (dx > 44 && current > 0) setCurrent(c => c - 1)
  }

  return (
    <div
      style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, paddingTop: 8, paddingBottom: 16, boxSizing: "border-box" }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Cards strip - flex:1 so it absorbs all remaining height */}
      <div ref={stripRef} style={{ width: "100%", overflow: "hidden", flex: 1, minHeight: 0 }}>
        <motion.div
          animate={{ x: targetX }}
          transition={{ type: "spring", stiffness: 320, damping: 32, mass: 0.7 }}
          style={{ display: "flex", gap }}
        >
          {projects.map((card, i) => (
            <motion.div
              key={card.id}
              animate={{ opacity: i === current ? 1 : 0.42, scale: i === current ? 1 : 0.9 }}
              transition={{ duration: 0.3 }}
              style={{ flexShrink: 0, width: cardW }}
            >
              <CardFace card={card} isDark={isDark} isHovered={i === current} w={cardW} h={cardH} imgH={imgH} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA row - switches with active card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: cardW, flexShrink: 0 }}
        >
          {projects[current].href ? (
            <button
              onClick={() => navigate(projects[current].href)}
              style={{
                fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase",
                fontWeight: 600, fontFamily: '"DM Sans", sans-serif',
                color: "#0A0A0A", background: "var(--accent, #C8A97E)",
                border: "none", borderRadius: 100, padding: "10px 20px",
                whiteSpace: "nowrap",
              }}
            >
              View Case Study →
            </button>
          ) : (
            <span style={{ fontSize: 11, color: "var(--muted)", fontFamily: '"DM Sans", sans-serif', letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Coming soon
            </span>
          )}
          <span style={{ fontSize: 12, color: "var(--muted-strong)", fontFamily: '"DM Sans", sans-serif', letterSpacing: "0.04em", fontVariantNumeric: "tabular-nums" }}>
            {String(current + 1).padStart(2, "0")} / {String(N_CARDS).padStart(2, "0")}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Pill progress dots */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
        {projects.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setCurrent(i)}
            animate={{
              width: i === current ? 22 : 5,
              background: i === current ? "var(--accent, #C8A97E)" : isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)",
            }}
            transition={{ duration: 0.25 }}
            style={{ height: 4, borderRadius: 2, border: "none", padding: 0, flexShrink: 0, minWidth: 5 }}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

// ── Desktop / Tablet: 3D carousel ─────────────────────────────────────────
function ThreeDCarousel({ isDark, isTablet }) {
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
  const offset = useSpring(targetOffset, { damping: 28, stiffness: 220, mass: 0.6 })

  const prefersReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

  useEffect(() => {
    const el = containerRef.current
    if (!el || prefersReduced) return

    const onWheel = (e) => {
      e.preventDefault()
      // Normalize deltaY across input devices:
      // deltaMode=0 (pixels, trackpad) → use as-is
      // deltaMode=1 (lines, mouse wheel) → multiply by 40 to match pixel magnitude
      // deltaMode=2 (pages) → multiply by viewport height
      const LINE_HEIGHT = 40
      let delta = e.deltaY
      if (e.deltaMode === 1) delta *= LINE_HEIGHT
      else if (e.deltaMode === 2) delta *= window.innerHeight
      targetOffset.set(targetOffset.get() - delta * WHEEL_SPEED)
    }
    let touchStartY = 0
    const onTouchStart = (e) => { touchStartY = e.touches[0].clientY }
    const onTouchMove  = (e) => {
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
    <div ref={containerRef} style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
      <div style={{
        width: "100%", height: "100%",
        display: "flex", alignItems: "center", justifyContent: "center",
        perspective: PERSP, perspectiveOrigin: PX_ORG,
      }}>
        <div style={{ position: "relative", transformStyle: "preserve-3d", transform: `translateX(${-CARD_W / 2}px) translateY(${CONT_TY}px)` }}>
          {CARDS.map((card, i) => (
            <Plane
              key={`${card.id}-${i}`}
              card={card}
              index={i}
              offset={offset}
              isDark={isDark}
              isTablet={isTablet}
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

// ── Main export ────────────────────────────────────────────────────────────
export default function StackedGallery() {
  const isDark = useIsDark()
  const bp     = useBreakpoint()

  return (
    <div style={{ width: "100%", height: "100%", background: "var(--bg)" }}>
      {bp === "mobile"
        ? <MobileCarousel isDark={isDark} />
        : <ThreeDCarousel  isDark={isDark} isTablet={bp === "tablet"} />
      }
    </div>
  )
}
