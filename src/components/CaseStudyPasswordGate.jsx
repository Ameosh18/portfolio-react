import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CASE_STUDY_ACCESS } from '../config/caseStudyAccess'

const BACKDROP_VARIANTS = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.25 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
}

const CARD_VARIANTS = {
  initial: { opacity: 0, scale: 0.95, y: 24 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, scale: 0.96, y: 16, transition: { duration: 0.2 } },
}

const STEP_VARIANTS = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, x: -24, transition: { duration: 0.2 } },
}

export default function CaseStudyPasswordGate({ caseId, access, onClose }) {
  const config = CASE_STUDY_ACCESS[caseId] ?? {}
  const minutes = config.timerMinutes ?? 35

  const [inputEmail, setInputEmail] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [otpError, setOtpError] = useState(false)
  const [sending, setSending] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const emailRef = useRef(null)
  const otpRefs = useRef([])
  const prevFocusRef = useRef(null)

  useEffect(() => {
    prevFocusRef.current = document.activeElement
    setTimeout(() => emailRef.current?.focus(), 80)
    const onKey = (e) => { if (e.key === 'Escape') onClose?.() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      prevFocusRef.current?.focus()
    }
  }, [onClose])

  useEffect(() => {
    if (access.status === 'code_sent') {
      setTimeout(() => otpRefs.current[0]?.focus(), 80)
    }
  }, [access.status])

  const handleSendCode = async (e) => {
    e.preventDefault()
    if (!inputEmail.trim()) return
    setSending(true)
    try {
      await access.requestCode(inputEmail.trim())
    } catch {}
    setSending(false)
  }

  const handleOtpChange = useCallback((index, value) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    const next = [...otp]
    next[index] = digit
    setOtp(next)
    setOtpError(false)
    if (digit && index < 5) otpRefs.current[index + 1]?.focus()
  }, [otp])

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const handleOtpPaste = (e) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (text.length === 6) {
      e.preventDefault()
      setOtp(text.split(''))
      setOtpError(false)
      otpRefs.current[5]?.focus()
    }
  }

  const handleVerify = (e) => {
    e.preventDefault()
    const code = otp.join('')
    if (code.length < 6) return
    setVerifying(true)
    setTimeout(() => {
      const ok = access.verifyCode(code)
      if (!ok) {
        setOtpError(true)
        setOtp(['', '', '', '', '', ''])
        otpRefs.current[0]?.focus()
      } else {
        onClose?.()
      }
      setVerifying(false)
    }, 400)
  }

  const handleResend = () => {
    access.reset()
    setOtp(['', '', '', '', '', ''])
    setOtpError(false)
    setTimeout(() => emailRef.current?.focus(), 80)
  }

  const { status, email, sendError } = access

  return (
    <motion.div
      className="cs-gate-backdrop"
      variants={BACKDROP_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
      onClick={onClose}
      aria-hidden="true"
    >
      <motion.div
        className="cs-gate-modal"
        variants={CARD_VARIANTS}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cs-gate-title"
      >
        <div className="cs-gate-eyebrow">
          <span className="cs-gate-lock-icon" aria-hidden="true">
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
              <rect x="2" y="6" width="8" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M4 6V4a2 2 0 0 1 4 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </span>
          PROTECTED VIEW · NDA
        </div>

        <AnimatePresence mode="wait">
          {(status === 'idle' || status === 'expired') && (
            <motion.div key="email-step" variants={STEP_VARIANTS} initial="initial" animate="animate" exit="exit">
              {status === 'expired' ? (
                <>
                  <h2 id="cs-gate-title" className="cs-gate-headline">Session expired.</h2>
                  <p className="cs-gate-body">Your access window has closed. Enter your email to get a new code.</p>
                </>
              ) : (
                <>
                  <h2 id="cs-gate-title" className="cs-gate-headline">Unlock the detailed view.</h2>
                  <p className="cs-gate-body">This version contains confidential client details. Enter your email and I'll send you a temporary access code.</p>
                </>
              )}

              <form className="cs-gate-form" onSubmit={handleSendCode}>
                <label className="cs-gate-label" htmlFor="cs-gate-email">Your email address</label>
                <div className="cs-gate-input-row">
                  <input
                    id="cs-gate-email"
                    ref={emailRef}
                    className="cs-gate-input"
                    type="email"
                    placeholder="you@company.com"
                    value={inputEmail}
                    onChange={e => setInputEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                  <button
                    type="submit"
                    className="cs-gate-btn"
                    disabled={sending || !inputEmail.trim()}
                    aria-disabled={sending || !inputEmail.trim()}
                  >
                    {sending ? 'Sending...' : 'Send Code'}
                    {!sending && <span className="cs-gate-btn-arrow" aria-hidden="true">→</span>}
                  </button>
                </div>
                {sendError && <p className="cs-gate-error">{sendError}</p>}
              </form>

              <p className="cs-gate-subtext">
                One-time code · Valid for {minutes} min · This session only
              </p>
            </motion.div>
          )}

          {status === 'code_sent' && (
            <motion.div key="otp-step" variants={STEP_VARIANTS} initial="initial" animate="animate" exit="exit">
              <h2 id="cs-gate-title" className="cs-gate-headline">Check your inbox.</h2>
              <p className="cs-gate-body">Code sent to <strong>{email}</strong>. Enter the 6-digit code below.</p>

              <form className="cs-gate-form" onSubmit={handleVerify}>
                <label className="cs-gate-label" htmlFor="cs-otp-0">Access code</label>
                <div className="cs-otp-row" onPaste={handleOtpPaste}>
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={i === 0 ? 'cs-otp-0' : undefined}
                      ref={el => otpRefs.current[i] = el}
                      className={`cs-otp-box${otpError ? ' is-error' : ''}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleOtpChange(i, e.target.value)}
                      onKeyDown={e => handleOtpKeyDown(i, e)}
                      aria-label={`Digit ${i + 1}`}
                    />
                  ))}
                </div>
                {otpError && <p className="cs-gate-error">Incorrect code. Please try again.</p>}
                <div className="cs-gate-verify-row">
                  <button
                    type="submit"
                    className="cs-gate-btn"
                    disabled={verifying || otp.join('').length < 6}
                    aria-disabled={verifying || otp.join('').length < 6}
                  >
                    {verifying ? 'Verifying...' : 'Verify'}
                    {!verifying && <span className="cs-gate-btn-arrow" aria-hidden="true">→</span>}
                  </button>
                  <button type="button" className="cs-gate-link" onClick={handleResend}>
                    Resend code
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
