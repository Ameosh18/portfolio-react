import { useEffect, useState } from 'react'

export default function CaseStudyToggle() {
  const [isSimple, setIsSimple] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('cs-view-mode')
    if (saved === 'detailed') setIsSimple(false)
    document.documentElement.classList.toggle('is-simple', saved !== 'detailed')

    const observer = new MutationObserver(() => {
      const isSimpleMode = document.documentElement.classList.contains('is-simple')
      setIsSimple(isSimpleMode)
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
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
        className="cs-toggle-pill-btn simple-btn"
        onClick={() => toggleMode('simple')}
        aria-pressed={isSimple}
        role="radio"
        aria-checked={isSimple}
      >
        Simple
      </button>
      <button
        className="cs-toggle-pill-btn detailed-btn"
        onClick={() => toggleMode('detailed')}
        aria-pressed={!isSimple}
        role="radio"
        aria-checked={!isSimple}
      >
        Detailed
      </button>
    </div>
  )
}
