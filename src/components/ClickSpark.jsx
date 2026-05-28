import { useEffect, useRef } from 'react'

export default function ClickSpark({
  sparkColor = '#D5FF40',
  sparkSize = 12,
  sparkRadius = 20,
  sparkCount = 8,
  duration = 400,
  easing = 'ease-out',
  extraScale = 1.0,
  children
}) {
  const canvasRef = useRef(null)
  const sparklesRef = useRef([])
  const animationFrameRef = useRef(null)
  const startTimeRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const easeOutQuad = (t) => 1 - (1 - t) * (1 - t)

    const animate = (currentTime) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = currentTime
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      sparklesRef.current = sparklesRef.current.filter((sparkle) => {
        const elapsed = currentTime - sparkle.startTime
        if (elapsed > duration) return false

        const progress = Math.min(elapsed / duration, 1)
        const easeProgress =
          easing === 'ease-out' ? easeOutQuad(progress) : progress

        const opacity = 1 - easeProgress
        const scale = easeProgress * extraScale

        ctx.save()
        ctx.globalAlpha = opacity
        ctx.strokeStyle = sparkColor
        ctx.lineWidth = 2
        ctx.lineCap = 'round'

        for (let i = 0; i < sparkCount; i++) {
          const angle = (i / sparkCount) * Math.PI * 2
          const distance = sparkRadius * scale + sparkle.offsets[i]
          const x = sparkle.x + Math.cos(angle) * distance
          const y = sparkle.y + Math.sin(angle) * distance

          const startX = sparkle.x + Math.cos(angle) * sparkSize * 0.5
          const startY = sparkle.y + Math.sin(angle) * sparkSize * 0.5
          const endX = x
          const endY = y

          ctx.beginPath()
          ctx.moveTo(startX, startY)
          ctx.lineTo(endX, endY)
          ctx.stroke()
        }

        ctx.restore()
        return true
      })

      if (sparklesRef.current.length > 0) {
        animationFrameRef.current = requestAnimationFrame(animate)
      } else {
        animationFrameRef.current = null
      }
    }

    const handleClick = (e) => {
      const offsets = Array.from({ length: sparkCount }, () =>
        (Math.random() - 0.5) * sparkRadius * 0.3
      )

      sparklesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        startTime: performance.now(),
        offsets
      })

      if (!animationFrameRef.current) {
        startTimeRef.current = null
        animationFrameRef.current = requestAnimationFrame(animate)
      }
    }

    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easing, extraScale])

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 99997
        }}
      />
      {children}
    </>
  )
}
