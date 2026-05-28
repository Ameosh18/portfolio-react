import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { NameProvider } from './context/NameContext'
import HomePage from './pages/HomePage'
import WorkPage from './pages/WorkPage'
import CaseStudyPage from './pages/CaseStudyPage'
import Nav from './components/Nav'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import ClickSpark from './components/ClickSpark'
import './App.css'

function AppContent() {
  const location = useLocation()
  const hideFooter = location.pathname.includes('/work')
  const isHome = location.pathname === '/'

  return (
    <>
      <CustomCursor />
      {!isHome && <Nav />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/digisense" element={<CaseStudyPage caseId="digisense" />} />
        <Route path="/pfsone" element={<CaseStudyPage caseId="pfsone" />} />
      </Routes>
      {!hideFooter && !isHome && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <NameProvider>
      <BrowserRouter basename="/portfolio-react/">
        <ClickSpark
          sparkColor='#D5FF40'
          sparkSize={12}
          sparkRadius={20}
          sparkCount={8}
          duration={400}
          easing='ease-out'
          extraScale={1.0}
        >
          <AppContent />
        </ClickSpark>
      </BrowserRouter>
    </NameProvider>
  )
}
