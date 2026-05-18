import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

export default function LoadingScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onComplete?.()
    }, 2400)

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5, delay: 2.3 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <div style={{ position: 'relative', height: 80 }}>
        {/* Base text (outline) */}
        <div
          style={{
            fontSize: 'clamp(48px, 10vw, 96px)',
            fontFamily: '"Playfair Display", serif',
            fontWeight: 600,
            color: 'rgba(255, 255, 255, 0.1)',
            letterSpacing: '-0.02em',
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          LOADING
        </div>

        {/* Animated fill overlay */}
        <motion.div
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            fontSize: 'clamp(48px, 10vw, 96px)',
            fontFamily: '"Playfair Display", serif',
            fontWeight: 600,
            color: 'var(--accent)',
            letterSpacing: '-0.02em',
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          LOADING
        </motion.div>
      </div>
    </motion.div>
  )
}
