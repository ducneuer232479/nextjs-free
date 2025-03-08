'use client'

import { Button } from '@/components/ui/button'
import { isClient } from '@/lib/http'
import Link from 'next/link'
import React from 'react'

const ProductAddButton = () => {
  const isAuthenticated =
    isClient() && Boolean(localStorage.getItem('sessionToken'))

  if (!isAuthenticated) return null

  return (
    <Link href='/products/add'>
      <Button variant='secondary'>Thêm sản phẩm</Button>
    </Link>
  )
}

export default ProductAddButton
