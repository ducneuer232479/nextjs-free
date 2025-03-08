import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

import productApiRequest from '@/apiRequests/product'
import ProductAddButton from '@/app/products/_components/product-add-button'
import ProductEditButton from '@/app/products/_components/product-edit-button'

export const metadata: Metadata = {
  title: 'Danh sách sản phẩm',
  description: 'Danh sách sản phẩm của Productic được tạo bởi Đức Dev'
}

const ProductListPage = async () => {
  const { payload } = await productApiRequest.getList()
  const productList = payload.data

  return (
    <div>
      <h1>Product List</h1>
      <ProductAddButton />

      <div className='space-y-5'>
        {productList.map((product) => (
          <div key={product.id} className='flex space-x-4'>
            <Link href={`/products/${product.id}`}>
              <Image
                src={product.image}
                alt=''
                width={180}
                height={180}
                className='w-32 h-32 object-cover'
              />
            </Link>
            <h3>{product.name}</h3>
            <div>{product.price}</div>
            <ProductEditButton product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductListPage
