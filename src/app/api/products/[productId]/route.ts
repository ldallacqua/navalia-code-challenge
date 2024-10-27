import { NextRequest } from 'next/server'

import prisma from '../../../../../client'
import { PatchProductSchema } from '@/schemas/product'
import { errorResponseHandler } from '@/utils/handlers'

export const PATCH = async (
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) => {
  try {
    const fetchedParams = await params
    const body = await request.json()

    const { productId, description, imagePath, name, price } =
      PatchProductSchema.parse({
        ...fetchedParams,
        ...body,
      })

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        description,
        imagePath,
        name,
        price,
      },
    })

    return Response.json(updatedProduct)
  } catch (error) {
    return errorResponseHandler(error)
  } finally {
    await prisma.$disconnect()
  }
}
