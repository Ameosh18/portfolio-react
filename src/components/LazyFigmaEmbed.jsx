import { useState } from 'react'

export default function LazyFigmaEmbed({ src, title }) {
  const [active, setActive] = useState(false)

  if (active) {
    return (
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
    )
  }

  return (
    <button
      type="button"
      className="figma-embed-trigger"
      onClick={() => setActive(true)}
      aria-label={`Load Figma embed: ${title}`}
    >
      <svg className="figma-embed-trigger-icon" width="28" height="42" viewBox="0 0 28 42" fill="none" aria-hidden="true">
        <rect x="0" y="0" width="14" height="14" rx="7" fill="#F24E1E"/>
        <rect x="0" y="14" width="14" height="14" fill="#A259FF"/>
        <rect x="0" y="28" width="14" height="14" rx="0 0 7 7" fill="#0ACF83"/>
        <rect x="14" y="0" width="14" height="14" rx="0 7 7 0" fill="#F24E1E"/>
        <circle cx="21" cy="21" r="7" fill="#1ABCFE"/>
      </svg>
      <span className="figma-embed-trigger-label">Tap to load</span>
    </button>
  )
}
