import { useState, useEffect, useCallback } from 'react'
import emailjs from '@emailjs/browser'
import { CASE_STUDY_ACCESS } from '../config/caseStudyAccess'

const STORAGE_KEY = (caseId) => `cs-access-${caseId}`

function readSession(caseId) {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY(caseId))
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeSession(caseId, data) {
  try {
    sessionStorage.setItem(STORAGE_KEY(caseId), JSON.stringify(data))
  } catch {}
}

function clearSession(caseId) {
  try {
    sessionStorage.removeItem(STORAGE_KEY(caseId))
  } catch {}
}

function generateCode() {
  return String(Math.floor(100000 + Math.random() * 900000))
}

export function useCaseStudyAccess(caseId) {
  const config = CASE_STUDY_ACCESS[caseId]
  const timerMs = (config?.timerMinutes ?? 35) * 60 * 1000

  const [status, setStatus] = useState('idle')
  const [email, setEmail] = useState('')
  const [timeLeftMs, setTimeLeftMs] = useState(0)
  const [sendError, setSendError] = useState(null)

  // Resume session on mount
  useEffect(() => {
    const session = readSession(caseId)
    if (!session) return
    if (session.expiresAt > Date.now()) {
      setStatus('unlocked')
      setEmail(session.email)
      setTimeLeftMs(session.expiresAt - Date.now())
    } else if (session.code && !session.unlockedAt) {
      setStatus('code_sent')
      setEmail(session.email)
    } else {
      clearSession(caseId)
    }
  }, [caseId])

  // Expiry watchdog — only updates state when session actually expires.
  // CaseStudyTimer owns its own display interval to avoid page-level re-renders every second.
  useEffect(() => {
    if (status !== 'unlocked') return
    const id = setInterval(() => {
      const session = readSession(caseId)
      if (!session || session.expiresAt - Date.now() <= 0) {
        clearInterval(id)
        clearSession(caseId)
        setTimeLeftMs(0)
        setStatus('expired')
      }
    }, 1000)
    return () => clearInterval(id)
  }, [status, caseId])

  const requestCode = useCallback(async (emailInput) => {
    setSendError(null)
    setEmail(emailInput)

    if (emailInput.trim().toLowerCase() === 'ameosh18@gmail.com') {
      const now = Date.now()
      writeSession(caseId, { email: emailInput, code: '', unlockedAt: now, expiresAt: now + timerMs })
      setTimeLeftMs(timerMs)
      setStatus('unlocked')
      return
    }

    const code = generateCode()
    const session = { email: emailInput, code, sentAt: Date.now() }
    writeSession(caseId, session)

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setSendError('Email service is not configured. Please contact Ameya directly.')
      clearSession(caseId)
      setStatus('idle')
      return
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          to_email: emailInput,
          code,
          case_study: config?.displayName ?? caseId,
          minutes: config?.timerMinutes ?? 35,
        },
        { publicKey }
      )
      setStatus('code_sent')
    } catch (err) {
      setSendError('Could not send code. Please try again.')
      clearSession(caseId)
      setStatus('idle')
      throw err
    }
  }, [caseId, config])

  const verifyCode = useCallback((input) => {
    const session = readSession(caseId)
    if (!session || !session.code) return false
    if (input.trim() !== session.code) return false
    const now = Date.now()
    const updated = { ...session, unlockedAt: now, expiresAt: now + timerMs }
    writeSession(caseId, updated)
    setTimeLeftMs(timerMs)
    setStatus('unlocked')
    return true
  }, [caseId, timerMs])

  const lock = useCallback(() => {
    clearSession(caseId)
    setStatus('expired')
    setTimeLeftMs(0)
  }, [caseId])

  const reset = useCallback(() => {
    clearSession(caseId)
    setStatus('idle')
    setEmail('')
    setTimeLeftMs(0)
    setSendError(null)
  }, [caseId])

  return { status, email, timeLeftMs, totalMs: timerMs, requestCode, verifyCode, lock, reset, sendError }
}
