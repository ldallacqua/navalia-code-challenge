import { NextRequest } from 'next/server'

import prisma from '../../../../client'
import { CreateUserSchema } from '@/schemas/users'
import { authenticate } from '@/utils/authenticate'
import { errorResponseHandler } from '@/utils/handlers'

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json()
    const { email, name, userType } = CreateUserSchema.parse(body)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        userType,
      },
    })

    return Response.json(user)
  } catch (error) {
    return errorResponseHandler(error)
  } finally {
    await prisma.$disconnect()
  }
}

export const GET = async () => {
  try {
    const users = await prisma.user.findMany()

    return Response.json(users)
  } catch (error) {
    return errorResponseHandler(error)
  } finally {
    await prisma.$disconnect()
  }
}

export const DELETE = async (request: NextRequest) => {
  try {
    const userId = authenticate(request)

    await prisma.cartItem.deleteMany({
      where: {
        userId: userId,
      },
    })

    await prisma.user.delete({
      where: {
        id: userId,
      },
    })

    return Response.json({ message: 'User deleted' })
  } catch (error) {
    return errorResponseHandler(error)
  } finally {
    await prisma.$disconnect()
  }
}
