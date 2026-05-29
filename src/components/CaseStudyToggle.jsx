import { useEffect, useState } from 'react'

export default function CaseStudyToggle() {
  const [isSimple, setIsSimple] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('cs-view-mode')
    if (saved === 'simple') setIsSimple(true)
    document.documentElement.classList.toggle('is-simple', saved === 'simple')
  }, [])

  const toggleMode = (mode) => {
    const simple = mode === 'simple'
    setIsSimple(simple)
    localStorage.setItem('cs-view-mode', simple ? 'simple' : 'detailed')
    document.documentElement.classList.toggle('is-simple', simple)
  }

  return (
    <div className={`cs-toggle-pill ${isSimple ? 'is-simple' : ''}`} role="radiogroup" aria-label="View mode">
      <button
        className="cs-toggle-pill-btn detailed-btn"
        onClick={() => toggleMode('detailed')}
        aria-pressed={!isSimple}
        role="radio"
        aria-checked={!isSimple}
      >
        Detailed
      </button>
      <button
        className="cs-toggle-pill-btn simple-btn"
        onClick={() => toggleMode('simple')}
        aria-pressed={isSimple}
        role="radio"
        aria-checked={isSimple}
      >
        Skim
      </button>
    </div>
  )
}
