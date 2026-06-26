import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CASE_STUDY_ACCESS } from '../config/caseStudyAccess'

function readTimeLeft(caseId) {
  try {
    const raw = sessionStorage.getItem(`cs-access-${caseId}`)
    const session = raw ? JSON.parse(raw) : null
    return session ? Math.max(0, session.expiresAt - Date.now()) : 0
  } catch {
    return 0
  }
}

function formatTime(ms) {
  const totalSec = Math.max(0, Math.ceil(ms / 1000))
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function CaseStudyTimer({ caseId, totalMs }) {
  const config = CASE_STUDY_ACCESS[caseId] ?? {}
  const [timeLeftMs, setTimeLeftMs] = useState(() => readTimeLeft(caseId))

  useEffect(() => {
    setTimeLeftMs(readTimeLeft(caseId))
    const id = setInterval(() => setTimeLeftMs(readTimeLeft(caseId)), 1000)
    return () => clearInterval(id)
  }, [caseId])

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
          <div className="cs-timer-track">
            <motion.div
              className={`cs-timer-fill${isWarning ? ' is-warning' : ''}`}
              style={{ width: `${pct * 100}%` }}
              transition={{ duration: 0.9, ease: 'linear' }}
            />
          </div>

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
