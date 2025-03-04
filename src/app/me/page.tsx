import React from 'react'
import { cookies } from 'next/headers'
import Profile from '@/app/me/profile'
import accountApiRequest from '@/apiRequests/account'

const MeProfile = async () => {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')

  const result = await accountApiRequest.me(sessionToken?.value ?? '')

  return (
    <div>
      <h1>Me Profile</h1>
      <div>Xin chào {result.payload?.data?.name}</div>
      <Profile />
    </div>
  )
}

export default MeProfile
