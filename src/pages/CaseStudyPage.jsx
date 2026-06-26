import { useEffect } from 'react'
import DigiSensePage from './DigiSensePage'
import PfsOnePage from './PfsOnePage'
import SiemensPage from './SiemensPage'
import { CaseModeProvider } from '../context/CaseModeContext'
import '../case-study.css'

export default function CaseStudyPage({ caseId }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [caseId])

  return (
    <CaseModeProvider>
      {caseId === 'digisense' && <DigiSensePage />}
      {caseId === 'pfsone' && <PfsOnePage />}
      {caseId === 'siemens' && <SiemensPage />}
    </CaseModeProvider>
  )
}
