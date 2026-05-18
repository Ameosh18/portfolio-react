import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useName } from '../context/NameContext'

export default function NamePopup({ show, onClose }) {
  const { setName } = useName()
  const [value, setValue] = useState('')

  const handleSubmit = () => {
    const trimmed = value.trim()
    if (!trimmed) return
    setName(trimmed)
    onClose()
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="name-popup-backdrop"
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
            <p className="name-popup-eyebrow">A quick hello</p>
            <h2 className="name-popup-headline">Before we begin—</h2>
            <p className="name-popup-body">
              Every great collaboration starts with an introduction. I'd love to know who's stepping into my work today — it'll make this feel a little more like it was made just for you.
            </p>
            <input
              className="name-popup-input"
              type="text"
              placeholder="What should I call you?"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKey}
              autoFocus
              maxLength={40}
            />
            <div className="name-popup-footer">
              <span className="name-popup-disclaimer">Only for this session</span>
              <button
                className="name-popup-btn"
                onClick={handleSubmit}
                disabled={!value.trim()}
              >
                Step Inside →
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
