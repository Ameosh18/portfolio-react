import { useState } from "react"
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
  useVelocity,
  useScroll,
  useAnimationFrame,
} from "motion/react"
import DigiSenseHero from "../../digisense_hero_image.png"

// 3D step between adjacent planes (from motion.dev source geometry)
const STEP_X = 240
const STEP_Y = -84
const STEP_Z = -288
const ROTATE_Y = -50
const SPEED_FACTOR = 0.4

const COPIES = 4
const PROJECTS_COUNT = 5
const TOTAL = PROJECTS_COUNT * COPIES        // 20 cards
const WRAP_DIST = TOTAL * STEP_X             // 4800
const CENTER_INDEX = PROJECTS_COUNT * 1 + 3 // index 8 → 2nd copy of digisense
const INITIAL_OFFSET = -CENTER_INDEX * STEP_X

const projects = [
  {
    id: "digisense",
    cardIndex: "01",
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
    cardIndex: "02",
    title: "NETSCOUT PFS ONE",
    category: "Enterprise Network",
    summary: "Unified network visibility platform for global data centres",
    year: "2024",
    image: null,
    gradient: "linear-gradient(135deg, #0a0f1e 0%, #0d1b3e 50%, #0a1628 100%)",
    href: "/pfsone",
  },
  {
    id: "innoplexus",
    cardIndex: "03",
    title: "Innoplexus",
    category: "Life Sciences · AI",
    summary: "AI-assisted drug discovery workflows for research teams",
    year: "2022",
    image: null,
    gradient: "linear-gradient(135deg, #0d1a0d 0%, #0a2010 50%, #061a0a 100%)",
    href: null,
  },
  {
    id: "extentia",
    cardIndex: "04",
    title: "Extentia",
    category: "Fintech · B2B SaaS",
    summary: "End-to-end product design for financial services",
    year: "2020",
    image: null,
    gradient: "linear-gradient(135deg, #1a0a0a 0%, #2a1010 50%, #1a0808 100%)",
    href: null,
  },
  {
    id: "ogee",
    cardIndex: "05",
    title: "Ogee Studio",
    category: "Design Systems",
    summary: "Token-based design system across 3 digital products",
    year: "2021",
    image: null,
    gradient: "linear-gradient(135deg, #0f0a1a 0%, #1a0f2e 50%, #0d0a1e 100%)",
    href: null,
  },
]

// Duplicate projects for infinite wrap
const CARDS = Array.from({ length: COPIES }, () => projects).flat()

function wrapValue(raw) {
  const half = WRAP_DIST / 2
  return ((((raw + half) % WRAP_DIST) + WRAP_DIST) % WRAP_DIST) - half
}

function getBrightness(wrappedX) {
  const steps = Math.abs(wrappedX) / STEP_X
  return Math.max(0.7, Math.min(1.15, 1.15 - steps * 0.08))
}

function Plane({ card, index, offset, globalIndex }) {
  const [isActive, setIsActive] = useState(false)

  const x = useTransform(offset, (off) => wrapValue(index * STEP_X + off))
  const y = useTransform(x, (v) => (v / STEP_X) * STEP_Y)
  const z = useTransform(x, (v) => (v / STEP_X) * STEP_Z)
  const filter = useTransform(x, (v) => `brightness(${getBrightness(v).toFixed(3)})`)

  useMotionValueEvent(x, "change", (v) => {
    setIsActive(Math.abs(v) < STEP_X * 0.5)
  })

  return (
    <motion.div
      style={{
        position: "absolute",
        width: 320,
        height: 420,
        borderRadius: 24,
        overflow: "hidden",
        cursor: card.href ? "pointer" : "default",
        x,
        y,
        z,
        rotateY: ROTATE_Y,
        filter,
        willChange: "transform",
      }}
      whileHover={{ rotateY: -30 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Background */}
      {card.image ? (
        <img
          src={card.image}
          alt={card.title}
          draggable={false}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", userSelect: "none" }}
        />
      ) : (
        <div style={{ width: "100%", height: "100%", background: card.gradient }} />
      )}

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)",
        }}
      />

      {/* Index label (above card top-left) */}
      <div
        style={{
          position: "absolute",
          top: -24,
          left: 0,
          fontFamily: '"DM Sans", monospace',
          fontSize: 10,
          color: "rgba(255,255,255,0.45)",
          letterSpacing: "0.05em",
          userSelect: "none",
        }}
      >
        {String(globalIndex).padStart(2, "0")}
      </div>

      {/* Card content */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: 24,
          right: 24,
          color: "white",
          userSelect: "none",
        }}
      >
        <div
          style={{
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            marginBottom: 8,
            fontFamily: '"DM Sans", sans-serif',
          }}
        >
          {card.category}
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            marginBottom: 6,
            fontFamily: '"Playfair Display", serif',
          }}
        >
          {card.title}
        </div>
        <div
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.55,
            fontFamily: '"DM Sans", sans-serif',
          }}
        >
          {card.summary}
        </div>
      </div>

      {/* Active label — horizontal line + text to the right */}
      {isActive && (
        <div
          style={{
            position: "absolute",
            left: "100%",
            top: "50%",
            transform: "translateY(-50%)",
            marginLeft: 12,
            display: "flex",
            alignItems: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: 100,
              height: 1,
              background: "rgba(255,255,255,0.7)",
              flexShrink: 0,
            }}
          />
          <div
            style={{
              padding: "4px 8px",
              fontFamily: '"DM Sans", monospace',
              fontSize: 10,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
              whiteSpace: "nowrap",
            }}
          >
            {card.cardIndex} — {card.title}
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default function StackedGallery() {
  const offset = useMotionValue(INITIAL_OFFSET)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion) return
    const velocity = smoothVelocity.get()
    offset.set(offset.get() - velocity * (delta / 1000) * SPEED_FACTOR)
  })

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0A0A0A",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top-left header */}
      <div
        style={{
          position: "absolute",
          zIndex: 50,
          top: "max(90px, 3vw)",
          left: "3vw",
          color: "white",
          lineHeight: 0.9,
          letterSpacing: "-0.02em",
          fontFamily: '"Playfair Display", serif',
          fontWeight: "normal",
        }}
      >
        <div
          style={{
            fontSize: "clamp(32px, 5vw, 64px)",
            marginLeft: "4vw",
          }}
        >
          SELECTED WORK
        </div>
        <div style={{ fontSize: "clamp(32px, 5vw, 64px)" }}>
          {PROJECTS_COUNT} PROJECTS
          <sup
            style={{
              fontSize: "0.4em",
              fontWeight: 600,
              letterSpacing: "normal",
              verticalAlign: "top",
              lineHeight: 0,
              position: "relative",
              top: "0.65em",
              marginLeft: 4,
            }}
          >
            {String(PROJECTS_COUNT).padStart(2, "0")}
          </sup>
        </div>
      </div>

      {/* Bottom-right scroll hint */}
      <div
        style={{
          position: "absolute",
          zIndex: 50,
          bottom: "3vw",
          right: "3vw",
          fontFamily: '"DM Sans", monospace',
          fontSize: 10,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.4)",
          userSelect: "none",
        }}
      >
        scroll to explore
      </div>

      {/* 3D viewport */}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          perspective: "2000px",
          perspectiveOrigin: "10% 10%",
        }}
      >
        {/* Planes container */}
        <div
          style={{
            position: "relative",
            transformStyle: "preserve-3d",
            transform: "translateY(100px)",
          }}
        >
          {CARDS.map((card, i) => (
            <Plane
              key={`${card.id}-${i}`}
              card={card}
              index={i}
              offset={offset}
              globalIndex={i % PROJECTS_COUNT}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
