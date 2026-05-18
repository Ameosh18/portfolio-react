import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react"
import DigiSenseHero from "../../digisense_hero_image.png"

const projects = [
  {
    id: "digisense",
    title: "DiGiSense",
    subtitle: "Connected Vehicle Telematics",
    image: DigiSenseHero,
  },
  {
    id: "pfsone",
    title: "NETSCOUT PFS ONE",
    subtitle: "Enterprise Network Platform",
    image: null, // Placeholder - will use gradient
  },
  {
    id: "innoplexus",
    title: "Innoplexus",
    subtitle: "Research Intelligence",
    image: null,
  },
  {
    id: "extentia",
    title: "Extentia",
    subtitle: "Fintech Platform",
    image: null,
  },
  {
    id: "ogee",
    title: "Ogee Studio",
    subtitle: "Design System",
    image: null,
  },
]

export default function StackedGallery() {
  const { scrollY } = useScroll()

  // Track scroll velocity
  const velocity = useVelocity(scrollY)

  // Smooth velocity for cinematic movement
  const smoothVelocity = useSpring(velocity, {
    damping: 50,
    stiffness: 400,
  })

  // Map velocity → transforms
  const rotateX = useTransform(
    smoothVelocity,
    [-3000, 0, 3000],
    [-25, 0, 25]
  )

  const rotateY = useTransform(
    smoothVelocity,
    [-3000, 0, 3000],
    [15, 0, -15]
  )

  const z = useTransform(
    smoothVelocity,
    [-3000, 0, 3000],
    [120, 0, 120]
  )

  return (
    <div style={{ minHeight: "300vh", backgroundColor: "#000" }}>
      <div style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: "2000px",
      }}>
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="flex gap-8"
        >
          {projects.map((project, i) => (
            <Plane
              key={i}
              project={project}
              index={i}
              z={z}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

function Plane({ project, index, z }) {
  const offset = (index - 2) * 80

  const translateY = useTransform(
    z,
    [0, 120],
    [0, offset]
  )

  return (
    <motion.div
      style={{
        z,
        y: translateY,
      }}
      whileHover={{
        scale: 1.05,
        z: 180,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="relative shrink-0 cursor-pointer"
      style={{
        width: "320px",
        height: "420px",
        borderRadius: "24px",
        overflow: "hidden",
      }}
    >
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        <div style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
        }} />
      )}

      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
      }} />

      <div style={{
        position: "absolute",
        bottom: "24px",
        left: "24px",
        color: "white",
      }}>
        <div style={{ fontSize: "20px", fontWeight: "600" }}>{project.title}</div>
        <div style={{ fontSize: "14px", color: "#d1d5db" }}>{project.subtitle}</div>
      </div>
    </motion.div>
  )
}
