import { useEffect } from 'react'

export default function CaseStudyPage({ caseId }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [caseId])

  return (
    <div style={{ padding: '100px 40px', textAlign: 'center' }}>
      <h1>Case Study: {caseId}</h1>
      <p>Case study content coming soon...</p>
    </div>
  )
}
