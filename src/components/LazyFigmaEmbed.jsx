export default function LazyFigmaEmbed({ src, title }) {
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
