import React from 'react'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import Profile from '@/app/me/profile'
import accountApiRequest from '@/apiRequests/account'
import ProfileForm from '@/app/me/profile-form'

export const metadata: Metadata = {
  title: 'Hồ sơ người dùng',
  description: 'Được tạo bởi Đức dev'
}

const MeProfile = async () => {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')

  const result = await accountApiRequest.me(sessionToken?.value ?? '')

  return (
    <div>
      <h1>Me Profile</h1>
      <div>Xin chào {result.payload?.data?.name}</div>
      <Profile />
      <ProfileForm profile={result.payload.data} />
    </div>
  )
}

export default MeProfile
