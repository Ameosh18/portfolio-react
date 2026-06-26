import { motion, AnimatePresence } from 'framer-motion'
import { CASE_STUDY_ACCESS } from '../config/caseStudyAccess'

function formatTime(ms) {
  const totalSec = Math.max(0, Math.ceil(ms / 1000))
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function CaseStudyTimer({ caseId, timeLeftMs, totalMs }) {
  const config = CASE_STUDY_ACCESS[caseId] ?? {}
  const pct = totalMs > 0 ? Math.max(0, Math.min(1, timeLeftMs / totalMs)) : 0
  const isWarning = pct < 0.2

  return (
    <AnimatePresence>
      {timeLeftMs > 0 && (
        <motion.div
          className="cs-timer-bar-wrap"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          role="timer"
          aria-label={`Detailed view session: ${formatTime(timeLeftMs)} remaining`}
        >
          {/* Progress track */}
          <div className="cs-timer-track">
            <motion.div
              className={`cs-timer-fill${isWarning ? ' is-warning' : ''}`}
              style={{ width: `${pct * 100}%` }}
              transition={{ duration: 0.9, ease: 'linear' }}
            />
          </div>

          {/* Persistent label strip centered below the bar */}
          <div className="cs-timer-label">
            <span className={`cs-timer-countdown${isWarning ? ' is-warning' : ''}`}>
              {formatTime(timeLeftMs)}
            </span>
            <span className="cs-timer-sep" aria-hidden="true">·</span>
            <span className="cs-timer-text">
              {config.displayName ?? caseId} · detailed view
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
