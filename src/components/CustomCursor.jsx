import { useEffect, useRef, useState } from 'react'
import { useName } from '../context/NameContext'

export default function CustomCursor() {
  const { name } = useName()
  const arrowRef = useRef(null)
  const tooltipRef = useRef(null)
  const posRef = useRef({ x: -200, y: -200 })
  const rafRef = useRef(null)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const onMove = (e) => {
      setIsTouch(false)
      posRef.current = { x: e.clientX, y: e.clientY }
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = null
          const { x, y } = posRef.current
          if (arrowRef.current) {
            arrowRef.current.style.left = x + 'px'
            arrowRef.current.style.top = y + 'px'
          }
          if (tooltipRef.current) {
            tooltipRef.current.style.left = x + 'px'
            tooltipRef.current.style.top = y + 'px'
          }
        })
      }
    }

    const onTouchStart = () => setIsTouch(true)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchstart', onTouchStart)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchstart', onTouchStart)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (isTouch) return null

  return (
    <>
      <div ref={arrowRef} className="custom-cursor-arrow" aria-hidden="true" style={{ transform: 'translate(-1.12px, -0.28px)' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 100 100"
          fill="none"
        >
          <path
            d="M4 1 L97 45 L52 54 L36 99 Z"
            fill="var(--accent)"
          />
        </svg>
      </div>
      {name && (
        <div ref={tooltipRef} className="custom-cursor-tooltip" aria-hidden="true">
          {name}&nbsp;<span className="you-badge">(You)</span>
        </div>
      )}
    </>
  )
}
