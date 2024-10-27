import { NextRequest } from 'next/server'

import prisma from '../../../../../client'
import { authenticate } from '@/app/api/utils/authenticate'
import { errorResponseHandler, NotFound } from '@/app/api/utils/handlers'
import { deleteCartItemSchema, patchCartItemSchema } from '@/schemas/cart'

export const PATCH = async (
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) => {
  try {
    const userId = authenticate(request)
    const fetchedParams = await params

    const body = await request.json()
    const { productId, quantity } = patchCartItemSchema.parse({
      quantity: body.quantity,
      productId: fetchedParams?.productId,
    })

    const cartItem = await prisma.cartItem.findFirst({
      where: { productId, userId },
    })

    if (!cartItem) {
      return NotFound('Item not found in cart')
    }

    const updatedCartItem = await prisma.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity },
    })

    return Response.json(updatedCartItem)
  } catch (error) {
    return errorResponseHandler(error)
  } finally {
    await prisma.$disconnect()
  }
}

export const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) => {
  try {
    const userId = authenticate(request)
    const fetchedParams = await params

    const { productId } = deleteCartItemSchema.parse({
      productId: fetchedParams?.productId,
    })

    const cartItem = await prisma.cartItem.findFirst({
      where: { productId, userId },
    })

    if (!cartItem) {
      return NotFound('Item not found in cart')
    }

    const updatedCartItem = await prisma.cartItem.delete({
      where: { id: cartItem.id },
    })

    return Response.json(updatedCartItem)
  } catch (error) {
    return errorResponseHandler(error)
  } finally {
    await prisma.$disconnect()
  }
}
