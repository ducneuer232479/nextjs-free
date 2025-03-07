import React, { cache } from 'react'
import productApiRequest from '@/apiRequests/product'
import ProductAddForm from '@/app/products/_components/product-add-form'
import { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const getDetail = cache(productApiRequest.getDetail)

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { payload } = await getDetail(Number(params.id))
  const product = payload.data

  return {
    title: 'Edit sản phẩm: ' + product.name,
    description: product.description
  }
}

const ProductEdit = async ({ params }: { params: { id: string } }) => {
  let product = null
  try {
    const { payload } = await getDetail(Number(params.id))

    product = payload.data
  } catch (error) {}

  return (
    <div>
      {!product && <div>Không tìm thấy sản phẩm</div>}
      {product && <ProductAddForm product={product} />}
    </div>
  )
}

export default ProductEdit
