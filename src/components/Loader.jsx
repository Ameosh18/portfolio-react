import { motion } from 'framer-motion'

export default function Loader({ size = 'medium', showText = false, text = 'Loading...' }) {
  const sizeMap = {
    small: 32,
    medium: 48,
    large: 64,
  }

  const spinnerSize = sizeMap[size] || sizeMap.medium

  return (
    <div className={`loader loader-${size}`}>
      <motion.svg
        className="loader-spinner"
        width={spinnerSize}
        height={spinnerSize}
        viewBox="0 0 48 48"
        fill="none"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, ease: 'linear', repeat: Infinity }}
      >
        {/* Blueprint-style rotating circle */}
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.2"
        />
        <motion.circle
          cx="24"
          cy="24"
          r="20"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeDasharray="31.4 125.6"
          strokeLinecap="round"
          fill="none"
        />
      </motion.svg>
      {showText && <p className="loader-text">{text}</p>}
    </div>
  )
}
