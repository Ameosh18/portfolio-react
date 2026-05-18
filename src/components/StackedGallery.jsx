import { useRef } from "react"
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  wrap,
} from "motion/react"
import DigiSenseHero from "../../digisense_hero_image.png"

const projects = [
  {
    id: "digisense",
    title: "DiGiSense",
    subtitle: "Connected Vehicle Telematics",
    tags: ["IoT", "Telematics", "Mahindra"],
    year: "2023",
    image: DigiSenseHero,
    gradient: null,
  },
  {
    id: "pfsone",
    title: "NETSCOUT PFS ONE",
    subtitle: "Enterprise Network Platform",
    tags: ["Cybersecurity", "Enterprise SaaS"],
    year: "2024",
    image: null,
    gradient: "linear-gradient(135deg, #0a0f1e 0%, #0d1b3e 50%, #0a1628 100%)",
  },
  {
    id: "innoplexus",
    title: "Innoplexus",
    subtitle: "Research Intelligence",
    tags: ["Life Sciences", "AI"],
    year: "2022",
    image: null,
    gradient: "linear-gradient(135deg, #0d1a0d 0%, #0a2010 50%, #061a0a 100%)",
  },
  {
    id: "extentia",
    title: "Extentia",
    subtitle: "Fintech Platform",
    tags: ["Fintech", "B2B SaaS"],
    year: "2020",
    image: null,
    gradient: "linear-gradient(135deg, #1a0a0a 0%, #2a1010 50%, #1a0808 100%)",
  },
  {
    id: "ogee",
    title: "Ogee Studio",
    subtitle: "Design System",
    tags: ["Design Systems", "Brand"],
    year: "2021",
    image: null,
    gradient: "linear-gradient(135deg, #0f0a1a 0%, #1a0f2e 50%, #0d0a1e 100%)",
  },
]

function ProjectCard({ project }) {
  return (
    <div
      style={{
        flexShrink: 0,
        width: "400px",
        height: "260px",
        borderRadius: "12px",
        overflow: "hidden",
        position: "relative",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      ) : (
        <div style={{ width: "100%", height: "100%", background: project.gradient }} />
      )}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 55%, transparent 100%)",
        }}
      />

      <div style={{ position: "absolute", top: "20px", left: "20px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: "10px",
              fontWeight: "500",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "3px",
              padding: "3px 8px",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div style={{ position: "absolute", bottom: "20px", left: "20px", right: "20px", color: "white" }}>
        <div style={{ fontSize: "11px", letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: "6px" }}>
          {project.year}
        </div>
        <div style={{ fontSize: "20px", fontWeight: "600", lineHeight: 1.2, marginBottom: "4px", letterSpacing: "-0.01em" }}>
          {project.title}
        </div>
        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)" }}>
          {project.subtitle}
        </div>
      </div>
    </div>
  )
}

function VelocityRow({ baseVelocity }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  })

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`)

  const directionFactor = useRef(1)

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()
    baseX.set(baseX.get() + moveBy)
  })

  const looped = [...projects, ...projects, ...projects, ...projects]

  return (
    <div style={{ overflow: "hidden", paddingBlock: "10px" }}>
      <motion.div
        style={{
          x,
          display: "flex",
          gap: "20px",
          willChange: "transform",
        }}
      >
        {looped.map((project, i) => (
          <ProjectCard key={i} project={project} />
        ))}
      </motion.div>
    </div>
  )
}

export default function StackedGallery() {
  return (
    <section
      style={{
        backgroundColor: "var(--bg)",
        paddingTop: "80px",
        paddingBottom: "80px",
        borderTop: "1px solid var(--border)",
        overflow: "hidden",
      }}
    >
      <VelocityRow baseVelocity={-2} />
      <VelocityRow baseVelocity={2} />
    </section>
  )
}
