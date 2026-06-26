import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { useCaseStudyMode } from '../hooks/useCaseStudyMode'

const ALL_SECTIONS = [
  { id: 'cs-overview',   label: 'Overview',            simpleVisible: true  },
  { id: 'cs-business',   label: 'Business Context',    simpleVisible: true  },
  { id: 'cs-ecosystem',  label: 'The Ecosystem',       simpleVisible: false },
  { id: 'cs-research',   label: 'Research',            simpleVisible: false },
  { id: 'cs-insights',   label: 'Key Insights',        simpleVisible: true  },
  { id: 'cs-decisions',  label: 'Strategic Decisions', simpleVisible: false },
  { id: 'cs-design',     label: 'Design Work',         simpleVisible: true  },
  { id: 'cs-ai',         label: 'AI Opportunity',      simpleVisible: false },
  { id: 'cs-outcomes',   label: 'Outcomes',            simpleVisible: true  },
  { id: 'cs-reflection', label: 'Reflection',          simpleVisible: true  },
]

const NAV_OFFSET = 80 // fixed nav height in px

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET - 8
  window.scrollTo({ top, behavior: 'smooth' })
}

function DesktopNav({ sections, activeId }) {
  const [hovered, setHovered] = useState(false)
  const reduce = useReducedMotion()

  return (
    <motion.div
      role="navigation"
      aria-label="Case study sections"
      className="cs-section-nav"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {sections.map(({ id, label }, i) => {
        const isActive = activeId === id
        return (
          <button
            key={id}
            className={`cs-nav-item${isActive ? ' active' : ''}`}
            onClick={() => scrollToSection(id)}
            aria-current={isActive ? 'true' : undefined}
          >
            <span className="cs-nav-dot" aria-hidden="true" />
            <AnimatePresence>
              {(hovered || isActive) && (
                <motion.span
                  className="cs-nav-label"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { duration: 0.18, delay: hovered ? i * 0.03 : 0, ease: 'easeOut' }
                  }
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        )
      })}
    </motion.div>
  )
}

export default function CaseStudyNav() {
  const isSimple = useCaseStudyMode()
  const [activeId, setActiveId] = useState('cs-overview')
  const [isOpen, setIsOpen] = useState(false)

  const sections = ALL_SECTIONS.filter(s => !isSimple || s.simpleVisible)

  useEffect(() => {
    document.body.classList.add('has-cs-nav')
    return () => document.body.classList.remove('has-cs-nav')
  }, [])

  const sectionKey = sections.map(s => s.id).join(',')

  useEffect(() => {
    const visibilityMap = {}
    const observers = []

    const pickMostVisible = () => {
      let best = null
      let bestRatio = -1
      for (const [id, ratio] of Object.entries(visibilityMap)) {
        if (ratio > bestRatio) { bestRatio = ratio; best = id }
      }
      if (best) setActiveId(best)
    }

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      visibilityMap[id] = 0
      const obs = new IntersectionObserver(
        ([entry]) => {
          visibilityMap[id] = entry.intersectionRatio
          pickMostVisible()
        },
        { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionKey])

  const activeLabel = sections.find(s => s.id === activeId)?.label ?? 'Sections'

  const handleSheetScroll = useCallback((id) => {
    scrollToSection(id)
    setIsOpen(false)
  }, [])

  return (
    <>
      {/* Desktop nav: portalled to body so position:fixed works regardless of ancestor transforms */}
      {createPortal(
        <DesktopNav sections={sections} activeId={activeId} />,
        document.body
      )}

      {/* Mobile FAB */}
      <div className="cs-sections-fab-wrap">
        <button
          className="cs-sections-fab"
          onClick={() => setIsOpen(o => !o)}
          aria-expanded={isOpen}
          aria-controls="cs-sections-sheet"
        >
          <span className="cs-fab-icon" aria-hidden="true">≡</span>
          <span className="cs-fab-label">{isOpen ? 'Close' : activeLabel}</span>
          <span className="cs-fab-arrow" aria-hidden="true">{isOpen ? '↓' : '↑'}</span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="cs-sheet-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              id="cs-sections-sheet"
              className="cs-sections-sheet"
              role="dialog"
              aria-label="Jump to section"
              aria-modal="true"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="cs-sheet-handle" aria-hidden="true" />
              <p className="cs-sheet-eyebrow eyebrow">Sections</p>
              <ul className="cs-sheet-list">
                {sections.map(({ id, label }) => (
                  <li key={id}>
                    <button
                      className={`cs-sheet-item${activeId === id ? ' active' : ''}`}
                      onClick={() => handleSheetScroll(id)}
                    >
                      <span className="cs-nav-dot" aria-hidden="true" />
                      <span>{label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
