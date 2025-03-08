'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { AccountResType } from '@/schemaValidations/account.schema'
import { isClient } from '@/lib/http'

type User = AccountResType['data']

const AppContext = createContext<{
  user: User | null
  setUser: (user: User | null) => void
  isAuthenticated: boolean
}>({
  user: null,
  setUser: () => {},
  isAuthenticated: false
})

export const useAppContext = () => {
  const context = useContext(AppContext)

  if (context === undefined) {
    throw new Error('useAppContext must be used within AppProvider')
  }

  return context
}

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // const [user, setUserState] = useState<User | null>(() => {
  //   if (isClient()) {
  //     const _user = localStorage.getItem('user')
  //     return _user ? JSON.parse(_user) : null
  //   }
  // })
  const [user, setUserState] = useState<User | null>(null)
  const isAuthenticated = Boolean(user)

  const setUser = useCallback((user: User | null) => {
    setUserState(user)
    localStorage.setItem('user', JSON.stringify(user))
  }, [])

  useEffect(() => {
    const _user = localStorage.getItem('user')
    setUserState(_user ? JSON.parse(_user) : null)
  }, [])

  return (
    <AppContext.Provider value={{ user, setUser, isAuthenticated }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
