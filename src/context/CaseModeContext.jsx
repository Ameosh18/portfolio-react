import { createContext, useContext, useState, useEffect } from 'react'

const CaseModeContext = createContext({ isSimple: true, setMode: () => {} })

export function CaseModeProvider({ children }) {
  const [isSimple, setIsSimpleState] = useState(true)

  useEffect(() => {
    document.documentElement.classList.add('is-simple')
    document.documentElement.classList.remove('is-detailed')
    return () => {
      document.documentElement.classList.remove('is-simple', 'is-detailed')
    }
  }, [])

  const setMode = (simple) => {
    setIsSimpleState(simple)
    document.documentElement.classList.toggle('is-simple', simple)
    document.documentElement.classList.toggle('is-detailed', !simple)
  }

  return (
    <CaseModeContext.Provider value={{ isSimple, setMode }}>
      {children}
    </CaseModeContext.Provider>
  )
}

export function useCaseMode() {
  return useContext(CaseModeContext)
}
