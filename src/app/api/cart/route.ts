import { createCartItemSchema } from '@/schemas/cart'
import { authenticate } from '@/app/api/utils/authenticate'
import { errorResponseHandler } from '@/app/api/utils/handlers'
import { NextRequest } from 'next/server'
import prisma from '../../../../client'

export const POST = async (request: NextRequest) => {
  try {
    const userId = authenticate(request)

    const body = await request.json()
    const { productId, quantity } = createCartItemSchema.parse(body)

    // Check if cart item already exists
    const cartItem = await prisma.cartItem.findFirst({
      where: { productId, userId },
    })

    let createdCartItem

    // If cart item does not exist, create a new one
    if (!cartItem) {
      createdCartItem = await prisma.cartItem.create({
        data: {
          productId,
          quantity,
          userId,
        },
      })
      // If cart item exists, update the quantity
    } else {
      createdCartItem = await prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity: cartItem.quantity + quantity },
      })
    }

    return Response.json(createdCartItem)
  } catch (error) {
    return errorResponseHandler(error)
  } finally {
    await prisma.$disconnect()
  }
}

export const GET = async (request: NextRequest) => {
  try {
    const userId = authenticate(request)
    const cartItems = await prisma.cartItem.findMany({
      include: {
        Product: true,
      },
      where: {
        userId,
      },
    })

    return Response.json(cartItems)
  } catch (error) {
    return errorResponseHandler(error)
  } finally {
    await prisma.$disconnect()
  }
}

export const DELETE = async (request: NextRequest) => {
  try {
    const userId = authenticate(request)

    const updatedCartItem = await prisma.cartItem.deleteMany({
      where: { userId },
    })

    return Response.json(updatedCartItem)
  } catch (error) {
    return errorResponseHandler(error)
  } finally {
    await prisma.$disconnect()
  }
}
