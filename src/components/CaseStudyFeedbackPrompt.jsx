import { useEffect, useState } from 'react'

export default function CaseStudyFeedbackPrompt() {
  const [isSimple, setIsSimple] = useState(false)

  useEffect(() => {
    const checkSimpleMode = () => {
      const isSimpleMode = document.documentElement.classList.contains('is-simple')
      setIsSimple(isSimpleMode)
    }

    checkSimpleMode()

    const observer = new MutationObserver(checkSimpleMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  const handleSwitchToDetailed = () => {
    document.documentElement.classList.remove('is-simple')
    localStorage.setItem('cs-view-mode', 'detailed')
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
            <span className="feedback-arrow" aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </section>
  )
}
