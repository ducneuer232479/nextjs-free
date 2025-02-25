'use client'

import { useState } from 'react'
import { clientSessionToken } from '@/lib/http'

const AppProvider = ({
  children,
  initialSessionToken = ''
}: {
  children: React.ReactNode
  initialSessionToken?: string
}) => {
  // Đảm bảo luôn có sessionToken ngay từ đầu
  useState(() => {
    if (typeof window !== 'undefined') {
      clientSessionToken.value = initialSessionToken
    }
  })
  return children
}

export default AppProvider
