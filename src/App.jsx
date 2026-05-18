import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import WorkPage from './pages/WorkPage'
import CaseStudyPage from './pages/CaseStudyPage'
import Nav from './components/Nav'
import Footer from './components/Footer'
import './App.css'

export default function App() {
  return (
    <BrowserRouter basename="/portfolio-react/">
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/digisense" element={<CaseStudyPage caseId="digisense" />} />
        <Route path="/pfsone" element={<CaseStudyPage caseId="pfsone" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
