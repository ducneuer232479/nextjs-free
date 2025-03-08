'use client'

import { createContext, useContext, useState } from 'react'
import { AccountResType } from '@/schemaValidations/account.schema'

type User = AccountResType['data']

const AppContext = createContext<{
  user: User | null
  setUser: (user: User | null) => void
}>({
  user: null,
  setUser: () => {}
})

export const useAppContext = () => {
  const context = useContext(AppContext)

  if (context === undefined) {
    throw new Error('useAppContext must be used within AppProvider')
  }

  return context
}

const AppProvider = ({
  children,
  user: userProp
}: {
  children: React.ReactNode
  user: User | null
}) => {
  const [user, setUser] = useState<User | null>(userProp)

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
