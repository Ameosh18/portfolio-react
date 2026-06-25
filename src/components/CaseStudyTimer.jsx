import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CASE_STUDY_ACCESS } from '../config/caseStudyAccess'

function formatTime(ms) {
  const totalSec = Math.max(0, Math.ceil(ms / 1000))
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function CaseStudyTimer({ caseId, timeLeftMs, totalMs }) {
  const [showTooltip, setShowTooltip] = useState(false)
  const config = CASE_STUDY_ACCESS[caseId] ?? {}
  const pct = totalMs > 0 ? Math.max(0, Math.min(1, timeLeftMs / totalMs)) : 0
  const isWarning = pct < 0.2

  return (
    <AnimatePresence>
      {timeLeftMs > 0 && (
        <motion.div
          className="cs-timer-bar-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          aria-label={`Detailed view session: ${formatTime(timeLeftMs)} remaining`}
          role="timer"
        >
          <div className="cs-timer-track">
            <motion.div
              className={`cs-timer-fill${isWarning ? ' is-warning' : ''}`}
              style={{ width: `${pct * 100}%` }}
              transition={{ duration: 0.8, ease: 'linear' }}
            />
          </div>

          <AnimatePresence>
            {showTooltip && (
              <motion.div
                className="cs-timer-tooltip"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                aria-hidden="true"
              >
                {formatTime(timeLeftMs)} remaining · {config.displayName ?? caseId} detailed view
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
