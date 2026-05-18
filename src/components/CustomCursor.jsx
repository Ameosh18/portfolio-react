import { useEffect, useRef, useState } from 'react'
import { useName } from '../context/NameContext'

export default function CustomCursor() {
  const { name } = useName()
  const dotRef = useRef(null)
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
          if (dotRef.current) {
            dotRef.current.style.left = x + 'px'
            dotRef.current.style.top = y + 'px'
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
      <div ref={dotRef} className="custom-cursor-dot" />
      {name && (
        <div ref={tooltipRef} className="custom-cursor-tooltip">
          {name}&nbsp;<span className="you-badge">(You)</span>
        </div>
      )}
    </>
  )
}
