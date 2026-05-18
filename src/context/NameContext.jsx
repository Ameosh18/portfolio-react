import { createContext, useContext, useState } from 'react'

const NameContext = createContext()

export function NameProvider({ children }) {
  const [name, setNameState] = useState(() => {
    try { return sessionStorage.getItem('visitor-name') || '' } catch { return '' }
  })

  const setName = (n) => {
    try { sessionStorage.setItem('visitor-name', n) } catch {}
    setNameState(n)
  }

  return <NameContext.Provider value={{ name, setName }}>{children}</NameContext.Provider>
}

export const useName = () => useContext(NameContext)
