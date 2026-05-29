import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Loader from './Loader'

export default function CaseStudyToggle() {
  const [isSimple, setIsSimple] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('cs-view-mode')
    if (saved === 'detailed') setIsSimple(false)
    document.documentElement.classList.toggle('is-simple', saved !== 'detailed')

    const observer = new MutationObserver(() => {
      const isSimpleMode = document.documentElement.classList.contains('is-simple')
      setIsSimple(isSimpleMode)
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const toggleMode = (mode) => {
    setIsLoading(true)
    const simple = mode === 'simple'
    setIsSimple(simple)
    localStorage.setItem('cs-view-mode', simple ? 'simple' : 'detailed')
    document.documentElement.classList.toggle('is-simple', simple)

    // Hide loader after transition completes (800ms for the animation)
    setTimeout(() => setIsLoading(false), 800)
  }

  return (
    <div className={`cs-toggle-pill ${isSimple ? 'is-simple' : ''}`} role="radiogroup" aria-label="View mode">
      {/* Animated highlight background that slides between buttons */}
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
        onClick={() => toggleMode('detailed')}
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
            <Loader size="medium" showText={true} text="Loading..." />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
