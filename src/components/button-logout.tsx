'use client'

import authApiRequest from '@/apiRequests/auth'
import { Button } from '@/components/ui/button'
import { handleErrorApi } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const ButtonLogout = () => {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = async () => {
    try {
      await authApiRequest.logoutFromNextClientToNextServer()
      router.push('/login')
    } catch (error) {
      handleErrorApi({
        error
      })
      authApiRequest
        .logoutFromNextClientToNextServer(true)
        .then((res) => router.push(`/login?redirectFrom=${pathname}`))
    } finally {
      router.refresh()
      localStorage.removeItem('sessionToken')
      localStorage.removeItem('sessionTokenExpiresAt')
    }
  }

  return (
    <Button size='sm' onClick={handleLogout}>
      Đăng xuất
    </Button>
  )
}

export default ButtonLogout
