import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { NameProvider } from './context/NameContext'
import HomePage from './pages/HomePage'
import WorkPage from './pages/WorkPage'
import CaseStudyPage from './pages/CaseStudyPage'
import MyProcessPage from './pages/MyProcessPage'
import AboutPage from './pages/AboutPage'
import Nav from './components/Nav'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import ClickSpark from './components/ClickSpark'
import ScrollToTopBtn from './components/ScrollToTopBtn'
import './App.css'

function AppContent() {
  const location = useLocation()
  const hideFooter = location.pathname.includes('/work')
  const isHome = location.pathname === '/'

  return (
    <>
      <CustomCursor />
      <Nav />
      <div id="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/my-process" element={<MyProcessPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/digisense" element={<CaseStudyPage caseId="digisense" />} />
          <Route path="/pfsone" element={<CaseStudyPage caseId="pfsone" />} />
          <Route path="/siemens" element={<CaseStudyPage caseId="siemens" />} />
        </Routes>
      </div>
      {!hideFooter && !isHome && <Footer />}
      <ScrollToTopBtn />
    </>
  )
}

export default function App() {
  return (
    <NameProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
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
