'use client'

import { createContext, useContext, useState } from 'react'
import { clientSessionToken } from '@/lib/http'
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
  initialSessionToken = '',
  user: userProp
}: {
  children: React.ReactNode
  initialSessionToken?: string
  user: User | null
}) => {
  const [user, setUser] = useState<User | null>(userProp)

  // Đảm bảo luôn có sessionToken ngay từ đầu
  useState(() => {
    if (typeof window !== 'undefined') {
      clientSessionToken.value = initialSessionToken
    }
  })

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
