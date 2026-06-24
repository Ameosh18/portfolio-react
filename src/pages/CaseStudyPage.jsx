import { useEffect } from 'react'
import DigiSensePage from './DigiSensePage'
import PfsOnePage from './PfsOnePage'
import SiemensPage from './SiemensPage'
import '../case-study.css'

export default function CaseStudyPage({ caseId }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [caseId])

  if (caseId === 'digisense') return <DigiSensePage />
  if (caseId === 'pfsone') return <PfsOnePage />
  if (caseId === 'siemens') return <SiemensPage />
  return null
}
