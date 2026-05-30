import { useState, useEffect } from 'react'

export function useCaseStudyMode() {
  const [isSimple, setIsSimple] = useState(true)

  useEffect(() => {
    const checkMode = () => {
      const isSimpleMode = document.documentElement.classList.contains('is-simple')
      setIsSimple(isSimpleMode)
    }

    checkMode()

    const observer = new MutationObserver(checkMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  return isSimple
}
