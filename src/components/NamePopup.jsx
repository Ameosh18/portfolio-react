import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useName } from '../context/NameContext'

export default function NamePopup({ show, onClose }) {
  const { setName } = useName()
  const [value, setValue] = useState('')
  const inputRef = useRef(null)
  const submitBtnRef = useRef(null)
  const skipRef = useRef(null)
  const closeRef = useRef(null)
  const prevFocusRef = useRef(null)

  useEffect(() => {
    if (show) {
      prevFocusRef.current = document.activeElement
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

  const handleSkip = () => {
    sessionStorage.setItem('visitor-skipped', 'true')
    onClose()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') { onClose(); return }
    if (e.key === 'Enter' && document.activeElement === inputRef.current) { handleSubmit(); return }
    if (e.key !== 'Tab') return

    const focusable = [closeRef.current, inputRef.current, skipRef.current, submitBtnRef.current].filter(Boolean)
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus() }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus() }
  }

  const canSubmit = value.trim().length > 0
  const showCharCount = value.length > 0

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="name-popup-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-title"
          onKeyDown={handleKeyDown}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="name-popup-card"
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              ref={closeRef}
              className="name-popup-close"
              onClick={handleSkip}
              aria-label="Close dialog"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
              </svg>
            </button>

            {/* AI Story Panel */}
            <div className="name-popup-ai-panel" aria-hidden="true">
              <p className="name-popup-ai-eyebrow">Built with AI · 2026</p>

              <div className="name-popup-stickers">
                <div className="ai-sticker ai-sticker--claude">
                  <div className="ai-sticker-logo">
                    <img src="/portfolio-react/logos/claude-logo.png" alt="" className="ai-sticker-img" onError={e => e.currentTarget.style.display='none'} />
                    <span className="ai-sticker-fallback" aria-hidden="true">C</span>
                  </div>
                  <span className="ai-sticker-label">Claude Code</span>
                </div>
                <div className="ai-sticker-plus" aria-hidden="true">+</div>
                <div className="ai-sticker ai-sticker--figma">
                  <div className="ai-sticker-logo">
                    <img src="/portfolio-react/logos/figma-logo.png" alt="" className="ai-sticker-img" onError={e => e.currentTarget.style.display='none'} />
                    <span className="ai-sticker-fallback" aria-hidden="true">F</span>
                  </div>
                  <span className="ai-sticker-label">Figma MCP</span>
                </div>
              </div>

              <h3 className="name-popup-ai-headline">I don't just know AI tools. I shipped with them.</h3>

              <div className="name-popup-terminal">
                <span className="terminal-line"><span className="terminal-prompt">$</span> claude-code --build</span>
                <span className="terminal-line"><span className="terminal-prompt">$</span> figma-mcp --sync</span>
                <span className="terminal-line terminal-success"><span className="terminal-check">✓</span> shipped</span>
              </div>
            </div>

            {/* Form Panel */}
            <div className="name-popup-form-panel">
              <p className="name-popup-eyebrow">One quick thing</p>
              <h2 className="name-popup-headline" id="popup-title">Glad you're here.</h2>
              <p className="name-popup-body">
                Whether you're here to hire, collaborate, or just explore, I'd love to know who I'm designing for. Just your first name. That's it.
              </p>

              <div className="name-popup-field">
                <div className="name-popup-label-row">
                  <label htmlFor="popup-name-input" className="name-popup-label">
                    Your name
                  </label>
                  <AnimatePresence>
                    {showCharCount && (
                      <motion.span
                        className="name-popup-charcount"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        aria-live="polite"
                        aria-atomic="true"
                      >
                        {value.length} / 40
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
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

              <div className="name-popup-footer">
                <div className="name-popup-footer-left">
                  <button
                    ref={skipRef}
                    className="name-popup-skip"
                    onClick={handleSkip}
                  >
                    Skip for now
                  </button>
                  <span className="name-popup-disclaimer">Stored for this session only</span>
                </div>
                <button
                  ref={submitBtnRef}
                  className={`name-popup-btn${!canSubmit ? ' name-popup-btn--disabled' : ''}`}
                  onClick={handleSubmit}
                  aria-disabled={!canSubmit}
                >
                  Step Inside →
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
