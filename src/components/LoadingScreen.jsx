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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        pointerEvents: 'none',
        gap: isMobile ? '32px' : '40px',
        padding: isMobile ? '20px' : '0',
      }}
    >
      {/* Progress Bar Container */}
      <div
        style={{
          width: isMobile ? 'clamp(280px, 85vw, 400px)' : 'clamp(300px, 50vw, 500px)',
          height: '12px',
          background: 'var(--border)',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Animated Fill */}
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.4, ease: 'easeInOut' }}
          style={{
            height: '100%',
            background: 'var(--accent)',
            borderRadius: '12px',
          }}
        />
      </div>

      {/* Loading Text with Dots */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '0.12em' : '0.15em',
          fontSize: isMobile ? 'clamp(12px, 3vw, 16px)' : 'clamp(14px, 3.5vw, 18px)',
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 600,
          color: 'var(--text)',
          letterSpacing: '0.06em',
          userSelect: 'none',
        }}
      >
        LOADING
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          .
        </motion.span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        >
          .
        </motion.span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        >
          .
        </motion.span>
      </div>
    </motion.div>
  )
}
