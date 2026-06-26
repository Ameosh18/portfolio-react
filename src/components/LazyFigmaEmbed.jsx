import { useState, useEffect, useRef } from 'react'

export default function LazyFigmaEmbed({ src, title }) {
  const [active, setActive] = useState(false)
  const sentinelRef = useRef(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          obs.disconnect()
        }
      },
      { rootMargin: '600px 0px' }
    )
    obs.observe(sentinel)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <div
        ref={sentinelRef}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        aria-hidden="true"
      />
      {active && (
        <iframe
          title={title}
          src={src}
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-popups"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block',
          }}
        />
      )}
    </>
  )
}
