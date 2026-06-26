import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Loader from './Loader'
import { useCaseMode } from '../context/CaseModeContext'

export default function CaseStudyToggle({ accessStatus, onRequestAccess }) {
  const { isSimple, setMode } = useCaseMode()
  const [isLoading, setIsLoading] = useState(false)

  const toggleMode = (mode) => {
    const simple = mode === 'simple'

    const sections = Array.from(document.querySelectorAll('.cs-page > section'))
    const anchor = sections.find(s => s.getBoundingClientRect().top >= -8) || sections[0]
    const anchorTopBefore = anchor ? anchor.getBoundingClientRect().top : null

    setIsLoading(true)
    document.documentElement.classList.add('is-loading')
    setMode(simple)

    if (anchor !== null && anchorTopBefore !== null) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const anchorTopAfter = anchor.getBoundingClientRect().top
          const diff = anchorTopAfter - anchorTopBefore
          if (Math.abs(diff) > 1) {
            window.scrollBy({ top: diff, behavior: 'instant' })
          }
        })
      })
    }

    setTimeout(() => {
      setIsLoading(false)
      document.documentElement.classList.remove('is-loading')
    }, 1200)
  }

  return (
    <div className={`cs-toggle-pill ${isSimple ? 'is-simple' : ''}`} role="radiogroup" aria-label="View mode">
      <motion.div
        className="cs-toggle-highlight"
        layout
        layoutId="toggle-highlight"
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />

      <button
        className="cs-toggle-pill-btn simple-btn"
        onClick={() => toggleMode('simple')}
        aria-pressed={isSimple}
        role="radio"
        aria-checked={isSimple}
      >
        Simple
      </button>
      <button
        className="cs-toggle-pill-btn detailed-btn"
        onClick={() => {
          if (accessStatus === 'unlocked') {
            toggleMode('detailed')
          } else {
            onRequestAccess?.()
          }
        }}
        aria-pressed={!isSimple}
        role="radio"
        aria-checked={!isSimple}
      >
        Detailed
      </button>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="cs-content-loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Loader size="medium" showText={false} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
