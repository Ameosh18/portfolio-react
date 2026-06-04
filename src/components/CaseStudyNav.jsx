import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useCaseStudyMode } from '../hooks/useCaseStudyMode'

const ALL_SECTIONS = [
  { id: 'cs-overview',   label: 'Overview',            simpleVisible: true  },
  { id: 'cs-business',   label: 'Business Context',    simpleVisible: true  },
  { id: 'cs-ecosystem',  label: 'The Ecosystem',       simpleVisible: true  },
  { id: 'cs-research',   label: 'Research',            simpleVisible: false },
  { id: 'cs-insights',   label: 'Key Insights',        simpleVisible: true  },
  { id: 'cs-decisions',  label: 'Strategic Decisions', simpleVisible: false },
  { id: 'cs-design',     label: 'Design Work',         simpleVisible: true  },
  { id: 'cs-ai',         label: 'AI Opportunity',      simpleVisible: false },
  { id: 'cs-outcomes',   label: 'Outcomes',            simpleVisible: true  },
  { id: 'cs-reflection', label: 'Reflection',          simpleVisible: true  },
]

export default function CaseStudyNav() {
  const isSimple = useCaseStudyMode()
  const [activeId, setActiveId] = useState('cs-overview')
  const [isOpen, setIsOpen] = useState(false)

  const sections = ALL_SECTIONS.filter(s => !isSimple || s.simpleVisible)

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers = []
    const visibilityMap = {}

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
  }, [isSimple]) // re-run when mode changes so observer list updates

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setIsOpen(false)
  }, [])

  const activeLabel = sections.find(s => s.id === activeId)?.label ?? 'Sections'

  return (
    <>
      {/* ── Desktop: fixed left nav ── */}
      <nav className="cs-section-nav" aria-label="Case study sections">
        {sections.map(({ id, label }) => (
          <button
            key={id}
            className={`cs-nav-item${activeId === id ? ' active' : ''}`}
            onClick={() => scrollTo(id)}
            aria-current={activeId === id ? 'true' : undefined}
            title={label}
          >
            <span className="cs-nav-dot" aria-hidden="true" />
            <span className="cs-nav-label">{label}</span>
          </button>
        ))}
      </nav>

      {/* ── Mobile: floating button + bottom sheet ── */}
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
            {/* Backdrop */}
            <motion.div
              className="cs-sheet-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Bottom sheet */}
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
                      onClick={() => scrollTo(id)}
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
