import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useName } from '../context/NameContext'

export default function NamePopup({ show, onClose }) {
  const { setName } = useName()
  const [value, setValue] = useState('')
  const inputRef = useRef(null)
  const btnRef = useRef(null)
  const prevFocusRef = useRef(null)

  // Save/restore focus for accessibility
  useEffect(() => {
    if (show) {
      prevFocusRef.current = document.activeElement
      // Slight delay lets AnimatePresence mount before focusing
      const t = setTimeout(() => inputRef.current?.focus(), 60)
      return () => clearTimeout(t)
    } else {
      prevFocusRef.current?.focus()
    }
  }, [show])

  const handleSubmit = () => {
    const trimmed = value.trim()
    if (!trimmed) return
    setName(trimmed)
    onClose()
  }

  // Focus trap + keyboard shortcuts
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose()
      return
    }
    if (e.key === 'Enter' && document.activeElement === inputRef.current) {
      handleSubmit()
      return
    }
    if (e.key !== 'Tab') return

    const focusable = [inputRef.current, btnRef.current].filter(Boolean)
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last?.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first?.focus()
    }
  }

  // Click on backdrop (outside card) dismisses
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  const canSubmit = value.trim().length > 0

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="name-popup-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-title"
          onKeyDown={handleKeyDown}
          onClick={handleBackdropClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="name-popup-shell"
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Main glass card with concave notch */}
            <div className="name-popup-card">
              <p className="name-popup-eyebrow" aria-hidden="true">A quick hello</p>
              <h2 className="name-popup-headline" id="popup-title">Before we begin—</h2>
              <p className="name-popup-body">
                Every great collaboration starts with an introduction. I'd love to know who's stepping into my work today — it'll make this feel a little more like it was made just for you.
              </p>
              <div className="name-popup-field">
                <label htmlFor="popup-name-input" className="name-popup-label">
                  Your name
                </label>
                <input
                  id="popup-name-input"
                  ref={inputRef}
                  className="name-popup-input"
                  type="text"
                  placeholder="What should I call you?"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  maxLength={40}
                  autoComplete="given-name"
                />
              </div>
              <p className="name-popup-disclaimer">Only for this session</p>
            </div>

            {/* Floating button tab — sits inside the bottom-right notch */}
            <button
              ref={btnRef}
              className="name-popup-btn-tab"
              onClick={handleSubmit}
              disabled={!canSubmit}
              aria-disabled={!canSubmit}
              aria-label="Confirm your name and step inside"
            >
              Step Inside →
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
