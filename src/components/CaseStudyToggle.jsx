import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Loader from './Loader'

export default function CaseStudyToggle() {
  const [isSimple, setIsSimple] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Always initialize to Simple view on mount
    setIsSimple(true)
    document.documentElement.classList.add('is-simple')
    document.documentElement.classList.remove('is-detailed')

    const observer = new MutationObserver(() => {
      const isSimpleModeFromDOM = document.documentElement.classList.contains('is-simple')
      setIsSimple(isSimpleModeFromDOM)
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const toggleMode = (mode) => {
    setIsLoading(true)
    document.documentElement.classList.add('is-loading')
    const simple = mode === 'simple'
    setIsSimple(simple)
    // Update CSS classes for Simple/Detailed view without persisting to localStorage
    document.documentElement.classList.toggle('is-simple', simple)
    document.documentElement.classList.toggle('is-detailed', !simple)

    // Simulate content loading with 1.2s delay for both simple and detailed views
    setTimeout(() => {
      setIsLoading(false)
      document.documentElement.classList.remove('is-loading')
    }, 1200)
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
            <Loader size="medium" showText={false} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
