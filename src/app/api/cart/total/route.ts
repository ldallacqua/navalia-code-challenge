import { NextRequest } from 'next/server'

import prisma from '../../../../../client'
import {
  calculateThreeForTwo,
  calculateVIPDiscount,
} from '@/helpers/calculate-totals'
import { authenticate } from '@/utils/authenticate'
import { errorResponseHandler, NotFound } from '@/utils/handlers'

export const GET = async (request: NextRequest) => {
  try {
    const userId = authenticate(request)

    // Fetch user and their cart items
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        CartItem: {
          include: {
            Product: true,
          },
        },
      },
    })

    if (!user) {
      return NotFound('User not found')
    }

    const { userType, CartItem } = user

    if (CartItem.length === 0) {
      return Response.json({})
    }

    // Extract product prices and quantities from cart items
    const cartItems = CartItem.map((item) => ({
      price: item.Product.price,
      quantity: item.quantity,
    }))

    const allItems: number[] = []
    cartItems.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        allItems.push(item.price.toNumber()) // Convert Decimal to number
      }
    })

    const total = allItems.reduce((sum, price) => sum + price, 0)

    // Calculate total for "3 for the Price of 2" promotion
    const threeForTwoTotal = calculateThreeForTwo(cartItems)

    // Calculate VIP total (only if user is VIP)
    const vipDiscountTotal =
      userType === 'VIP' ? calculateVIPDiscount(cartItems) : null

    // Determine the best option
    let recommendation
    if (vipDiscountTotal !== null && vipDiscountTotal < threeForTwoTotal) {
      recommendation = 'vip'
    } else {
      recommendation = '3for2'
    }

    return Response.json({
      total: total.toFixed(2),
      vipDiscountTotal: vipDiscountTotal && vipDiscountTotal.toFixed(2),
      threeForTwoTotal: threeForTwoTotal.toFixed(2),
      recommendation,
    })
  } catch (error) {
    return errorResponseHandler(error)
  } finally {
    await prisma.$disconnect()
  }
}
