'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

const ButtonRedirect = () => {
  const router = useRouter()

  const handleNavigate = () => {
    router.push('/login')
  }
  return <button onClick={handleNavigate}>Chuyển sang trang login</button>
}

export default ButtonRedirect
