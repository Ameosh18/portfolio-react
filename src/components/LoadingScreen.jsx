import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

export default function LoadingScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(false)
  const [shouldRender, setShouldRender] = useState(true)

  useEffect(() => {
    const hasShown = sessionStorage.getItem('loadingShown')
    if (hasShown) {
      setShouldRender(false)
      onComplete?.()
      return
    }

    setIsVisible(true)
    sessionStorage.setItem('loadingShown', 'true')

    const timer = setTimeout(() => {
      setIsVisible(false)
      onComplete?.()
    }, 2800)

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!shouldRender) return null

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5, delay: 2.7 }}
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
        padding: isMobile ? '20px' : '0',
      }}
    >
      <div style={{ position: 'relative', height: 'auto', minHeight: isMobile ? 60 : 80 }}>
        {/* Base text (white with golden outline) */}
        <div
          style={{
            fontSize: isMobile ? 'clamp(32px, 8vw, 48px)' : 'clamp(48px, 10vw, 96px)',
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 700,
            color: 'var(--text)',
            letterSpacing: '-0.02em',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '0.08em' : '0.1em',
            WebkitTextStroke: '2.2px var(--accent)',
          }}
        >
          LOADING
          <motion.span
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            .
          </motion.span>
          <motion.span
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          >
            .
          </motion.span>
          <motion.span
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          >
            .
          </motion.span>
        </div>

        {/* Animated golden fill overlay */}
        <motion.div
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: 2.4, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            fontSize: isMobile ? 'clamp(32px, 8vw, 48px)' : 'clamp(48px, 10vw, 96px)',
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 700,
            color: 'var(--accent)',
            letterSpacing: '-0.02em',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '0.08em' : '0.1em',
            WebkitTextStroke: '2.2px var(--accent)',
          }}
        >
          LOADING
          <motion.span
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            .
          </motion.span>
          <motion.span
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          >
            .
          </motion.span>
          <motion.span
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          >
            .
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  )
}
