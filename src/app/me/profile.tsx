'use client'

import accountApiRequest from '@/apiRequests/account'
import { handleErrorApi } from '@/lib/utils'

import React, { useEffect } from 'react'

const Profile = () => {
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const result = await accountApiRequest.meClient()
        console.log('profile', result)
      } catch (error) {
        handleErrorApi({
          error
        })
      }
    }

    fetchRequest()
  }, [])

  return <div>Profile</div>
}

export default Profile
