import React, { cache } from 'react'
import productApiRequest from '@/apiRequests/product'
import Image from 'next/image'
import { Metadata, ResolvingMetadata } from 'next'
import envConfig from '@/config'
import { baseOpenGraph } from '@/app/shared-metadata'

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
  const url = envConfig.NEXT_PUBLIC_URL + '/products/' + product.id

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      url,

      images: [
        {
          url: product.image
        }
      ],
      ...baseOpenGraph
    },
    alternates: {
      canonical: url
    }
  }
}

const ProductDetail = async ({ params, searchParams }: Props) => {
  let product = null
  try {
    const { payload } = await getDetail(Number(params.id))
    product = payload.data
  } catch (error) {}

  return (
    <div>
      {!product && <div>Không tìm thấy sản phẩm</div>}
      {product && (
        <div>
          <Image
            src={product.image}
            alt=''
            width={180}
            height={180}
            className='w-32 h-32 object-cover'
          />
          <h3>{product.name}</h3>
          <div>{product.price}</div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail
