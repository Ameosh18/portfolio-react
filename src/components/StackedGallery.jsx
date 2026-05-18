"use client"

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
    <div className="min-h-[300vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center" style={{ perspective: "2000px" }}>
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
      className="relative w-[320px] h-[420px] rounded-3xl overflow-hidden shrink-0 cursor-pointer"
    >
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      <div className="absolute bottom-6 left-6 text-white">
        <div className="text-xl font-semibold">{project.title}</div>
        <div className="text-sm text-gray-300">{project.subtitle}</div>
      </div>
    </motion.div>
  )
}
