import { useCaseStudyMode } from '../hooks/useCaseStudyMode'
import { useCaseMode } from '../context/CaseModeContext'

export default function CaseStudyFeedbackPrompt({ accessStatus, onRequestAccess }) {
  const isSimple = useCaseStudyMode()
  const { setMode } = useCaseMode()

  const handleSwitchToDetailed = () => {
    if (accessStatus === 'unlocked') {
      setMode(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      onRequestAccess?.()
    }
  }

  if (!isSimple) return null

  return (
    <section className="case-study-feedback">
      <div className="feedback-container">
        <div className="feedback-content">
          <h3 className="feedback-title">Interested in more depth?</h3>
          <p className="feedback-text">This was the skimmable overview. The detailed version has all the research, design decisions, and strategic thinking.</p>
          <button
            onClick={handleSwitchToDetailed}
            className="feedback-btn"
            aria-label="Switch to detailed case study view"
          >
            <span>View Detailed Version</span>
            <span className="feedback-arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}
