import { useState, useEffect } from "react"
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
  useVelocity,
  useScroll,
  useAnimationFrame,
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

// ── Responsive dimensions (set once at load time) ──────────────────────────
const VW = typeof window !== "undefined" ? window.innerWidth : 1440
const IS_MOBILE = VW < 640
const IS_TABLET = VW >= 640 && VW < 1024

const CARD_W  = IS_MOBILE ? 200  : IS_TABLET ? 260  : 320
const CARD_H  = IS_MOBILE ? 268  : IS_TABLET ? 348  : 428
const IMG_H   = IS_MOBILE ? 96   : IS_TABLET ? 124  : 160  // top image section
const STEP_X  = IS_MOBILE ? 160  : IS_TABLET ? 200  : 240
const STEP_Y  = IS_MOBILE ? -56  : IS_TABLET ? -70  : -84
const STEP_Z  = IS_MOBILE ? -192 : IS_TABLET ? -240 : -288
const PX_ORG  = IS_MOBILE ? "50% 40%" : IS_TABLET ? "40% 35%" : "50% 35%"
const PERSP   = IS_MOBILE ? "1000px"  : IS_TABLET ? "1400px"  : "2000px"
const CONT_TY = IS_MOBILE ? 40        : IS_TABLET ? 70        : 100

// ── Carousel constants ─────────────────────────────────────────────────────
const ROTATE_Y      = -50
const SPEED_FACTOR  = IS_MOBILE ? 0.25 : 0.4
const COPIES        = 4
const N             = 5          // number of projects
const TOTAL         = N * COPIES // 20 cards
const WRAP_DIST     = TOTAL * STEP_X
const CENTER_IDX    = N + 3      // index 8 → digisense (2nd copy)
const INIT_OFFSET   = -CENTER_IDX * STEP_X

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
function CardFace({ card, isDark }) {
  const panelH = CARD_H - IMG_H + 24 // overlap 24px

  const panel = isDark
    ? { bg: "linear-gradient(180deg, #1c1c1e 0%, #141414 100%)", cat: "#666", title: "white", summary: "#888", sep: "rgba(255,255,255,0.07)", num: "white", muted: "#555", year: "#aaa", border: "rgba(255,255,255,0.06)" }
    : { bg: "linear-gradient(180deg, #F0EDE8 0%, #E8E4DE 100%)", cat: "#999", title: "#1A1A1A", summary: "#666", sep: "rgba(0,0,0,0.1)", num: "#1A1A1A", muted: "#999", year: "#555", border: "rgba(0,0,0,0.07)" }

  return (
    <div style={{ width: CARD_W, height: CARD_H, position: "relative", borderRadius: 24, overflow: "hidden", background: isDark ? "#111" : "#E8E4DE" }}>

      {/* ── Top image section ── */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: IMG_H, overflow: "hidden" }}>
        {card.image ? (
          <img
            src={card.image}
            alt={card.title}
            draggable={false}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", background: card.gradient }} />
        )}

        {/* Title overlay top-right */}
        <div style={{
          position: "absolute",
          top: 14,
          right: 16,
          color: "white",
          textAlign: "right",
          fontFamily: '"DM Sans", sans-serif',
          fontSize: IS_MOBILE ? 10 : 12,
          fontWeight: 600,
          lineHeight: 1.35,
          textShadow: "0 1px 6px rgba(0,0,0,0.7)",
          userSelect: "none",
        }}>
          {card.title}<br />
          <span style={{ fontWeight: 400, opacity: 0.8 }}>{card.category}</span>
        </div>
      </div>

      {/* ── Bottom panel ── */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: panelH,
        background: panel.bg,
        borderRadius: "24px 24px 0 0",
        padding: IS_MOBILE ? "16px 14px 14px" : "20px 20px 18px",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}>

        {/* Category */}
        <div style={{
          fontSize: IS_MOBILE ? 9 : 10,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: panel.cat,
          fontFamily: '"DM Sans", sans-serif',
          marginBottom: 6,
        }}>
          {card.category}
        </div>

        {/* Title */}
        <div style={{
          fontSize: IS_MOBILE ? 16 : 20,
          fontWeight: 700,
          color: panel.title,
          lineHeight: 1.2,
          fontFamily: '"DM Sans", sans-serif',
          letterSpacing: "-0.01em",
          marginBottom: 6,
        }}>
          {card.title}
        </div>

        {/* Summary */}
        <div style={{
          fontSize: IS_MOBILE ? 10 : 12,
          color: panel.summary,
          lineHeight: 1.55,
          fontFamily: '"DM Sans", sans-serif',
        }}>
          {card.summary}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* ── Bottom stats row ── */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          borderTop: `1px solid ${panel.sep}`,
          paddingTop: IS_MOBILE ? 10 : 14,
          marginTop: IS_MOBILE ? 8 : 12,
        }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span style={{ fontSize: IS_MOBILE ? 22 : 28, fontWeight: 700, color: panel.num, lineHeight: 1, fontFamily: '"DM Sans", sans-serif' }}>
              {card.num}
            </span>
            <span style={{ fontSize: IS_MOBILE ? 10 : 12, color: panel.muted, fontFamily: '"DM Sans", sans-serif' }}>
              Project
            </span>
          </div>
          <div style={{ fontSize: IS_MOBILE ? 11 : 13, fontWeight: 600, color: panel.year, fontFamily: '"DM Sans", sans-serif' }}>
            {card.year}
          </div>
        </div>
      </div>

      {/* Subtle inner border */}
      <div style={{
        position: "absolute",
        inset: 0,
        borderRadius: 24,
        border: `1px solid ${panel.border}`,
        pointerEvents: "none",
      }} />
    </div>
  )
}

// ── Hover detail panel ─────────────────────────────────────────────────────
function HoverLabel({ card }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        position: "absolute",
        left: CARD_W + 16,
        top: "50%",
        transform: "translateY(-50%)",
        pointerEvents: "none",
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      {/* Animated horizontal line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{
          width: IS_MOBILE ? 40 : 80,
          height: 1,
          background: "rgba(255,255,255,0.6)",
          transformOrigin: "left",
          flexShrink: 0,
          marginTop: 8,
        }}
      />

      {/* Details below the line */}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -8 }}
        transition={{ duration: 0.2, delay: 0.15 }}
        style={{
          marginLeft: 12,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <div style={{
          fontSize: 9,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.4)",
          fontFamily: '"DM Sans", sans-serif',
        }}>
          {card.num} — {card.category}
        </div>
        <div style={{
          fontSize: IS_MOBILE ? 13 : 16,
          fontWeight: 600,
          color: "white",
          fontFamily: '"DM Sans", sans-serif',
          letterSpacing: "-0.01em",
          lineHeight: 1.2,
          whiteSpace: "nowrap",
        }}>
          {card.title}
        </div>
        {/* Horizontal divider */}
        <div style={{
          width: IS_MOBILE ? 100 : 160,
          height: 1,
          background: "rgba(255,255,255,0.15)",
          marginBlock: 2,
        }} />
        <div style={{
          fontSize: IS_MOBILE ? 10 : 12,
          color: "rgba(255,255,255,0.5)",
          fontFamily: '"DM Sans", sans-serif',
          lineHeight: 1.5,
          maxWidth: IS_MOBILE ? 160 : 220,
        }}>
          {card.summary}
        </div>
        {card.href && (
          <div style={{
            fontSize: 10,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(200,169,126,0.8)",
            fontFamily: '"DM Sans", sans-serif',
            marginTop: 4,
          }}>
            View case study →
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

// ── Plane (3D card in space) ───────────────────────────────────────────────
function Plane({ card, index, offset, isDark }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isActive,  setIsActive]  = useState(false)

  // Scroll-driven base position
  const x     = useTransform(offset, (off) => wrapValue(index * STEP_X + off))
  const baseY = useTransform(x, (v) => (v / STEP_X) * STEP_Y)
  const baseZ = useTransform(x, (v) => (v / STEP_X) * STEP_Z)
  const filter = useTransform(x, (v) => `brightness(${getBrightness(v).toFixed(3)})`)

  // Hover-driven additive lift
  const hoverZTarget  = useMotionValue(0)
  const hoverZSpring  = useSpring(hoverZTarget,  { stiffness: 350, damping: 32 })
  const hoverRYTarget = useMotionValue(ROTATE_Y)
  const hoverRYSpring = useSpring(hoverRYTarget, { stiffness: 350, damping: 32 })

  // Combined z = scroll z + hover lift
  const effectiveZ = useTransform([baseZ, hoverZSpring], ([bz, hz]) => bz + hz)

  useMotionValueEvent(x, "change", (v) => {
    setIsActive(Math.abs(v) < STEP_X * 0.5)
  })

  const onHoverStart = () => {
    setIsHovered(true)
    hoverZTarget.set(IS_MOBILE ? 60 : 120)
    hoverRYTarget.set(-22)
  }

  const onHoverEnd = () => {
    setIsHovered(false)
    hoverZTarget.set(0)
    hoverRYTarget.set(ROTATE_Y)
  }

  return (
    <motion.div
      style={{
        position: "absolute",
        x,
        y: baseY,
        z: effectiveZ,
        rotateY: hoverRYSpring,
        filter,
        willChange: "transform",
        cursor: card.href ? "pointer" : "default",
      }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
    >
      {/* Card face */}
      <CardFace card={card} isDark={isDark} />

      {/* Index above card */}
      <div style={{
        position: "absolute",
        top: -22,
        left: 0,
        fontSize: 10,
        color: "rgba(255,255,255,0.35)",
        letterSpacing: "0.06em",
        fontFamily: '"DM Sans", sans-serif',
        userSelect: "none",
      }}>
        {card.num}
      </div>

      {/* Hover detail label (replaces active label) */}
      <AnimatePresence>
        {isHovered && !IS_MOBILE && (
          <HoverLabel card={card} />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Main export ────────────────────────────────────────────────────────────
export default function StackedGallery() {
  const isDark = useIsDark()
  const offset = useMotionValue(INIT_OFFSET)
  const { scrollY }     = useScroll()
  const scrollVelocity  = useVelocity(scrollY)
  const smoothVelocity  = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  useAnimationFrame((_, delta) => {
    if (prefersReduced) return
    const v = smoothVelocity.get()
    offset.set(offset.get() - v * (delta / 1000) * SPEED_FACTOR)
  })

  return (
    <div style={{ width: "100%", height: "100%", background: isDark ? "#0A0A0A" : "#F7F4F0", position: "relative", overflow: "hidden" }}>

      {/* Scroll hint — bottom right */}
      <div style={{
        position: "absolute",
        zIndex: 50,
        bottom: IS_MOBILE ? 16 : "3vw",
        right: IS_MOBILE ? 16 : "3vw",
        fontSize: 9,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
        fontFamily: '"DM Sans", sans-serif',
        userSelect: "none",
      }}>
        scroll to explore
      </div>

      {/* 3D viewport */}
      <div style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingRight: IS_MOBILE ? "20px" : IS_TABLET ? "60px" : "80px",
        perspective: PERSP,
        perspectiveOrigin: IS_MOBILE ? "50% 40%" : IS_TABLET ? "65% 35%" : "75% 35%",
      }}>
        {/* Planes container */}
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
            />
          ))}
        </div>
      </div>
    </div>
  )
}
