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
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }

    const onMove = (e) => {
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

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (isTouch) return null

  return (
    <>
      <div ref={arrowRef} className="custom-cursor-arrow" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="30"
          viewBox="0 0 26 30"
          fill="none"
        >
          <path
            d="M2 2 L2 25 L9 18 L24 18 Z"
            fill="var(--accent)"
            stroke="rgba(0,0,0,0.35)"
            strokeWidth="1.5"
            strokeLinejoin="round"
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
