/**
 * @jest-environment node
 */

import { authenticate } from '@/app/api/utils/authenticate'
import { NextRequest } from 'next/server'
import { GET } from '@/app/api/cart/total/route'
import { User, CartItem, Product } from '@prisma/client'
import { prismaMock } from '../../../../../singleton'
import { PRODUCTS } from '@/mocks/products'

jest.mock('@/app/api/utils/authenticate')
const mockAuthenticate = authenticate as jest.Mock

type UserWithCartItems = User & {
  CartItem: (CartItem & {
    Product: Product
  })[]
}

describe('GET /api/cart/price', () => {
  beforeEach(() => {
    mockAuthenticate.mockReturnValue('mock-user-id')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('common customer adds 3 t-shirts', () => {
    it('returns a total with the 3-for-2 promotion', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        userType: 'COMMON',
        CartItem: [
          {
            quantity: 3,
            Product: PRODUCTS.SHIRT,
          },
        ],
      } as unknown as UserWithCartItems)

      const request = new NextRequest('http://localhost/api/cart/total')
      const response = await GET(request)

      const json = await response.json()
      expect(json).toMatchObject({
        recommendation: '3 for 2 Promotion',
        threeForTwoTotal: '71.98',
        total: '107.97',
        vipDiscountTotal: null,
      })
    })
  })

  describe('common customer adds 2 t-shirts and 2 jeans', () => {
    it('returns a total with the 3-for-2 promotion', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        userType: 'COMMON',
        CartItem: [
          {
            quantity: 2,
            Product: PRODUCTS.SHIRT,
          },
          {
            quantity: 2,
            Product: PRODUCTS.JEANS,
          },
        ],
      } as unknown as UserWithCartItems)

      const request = new NextRequest('http://localhost/api/cart/total')
      const response = await GET(request)

      const json = await response.json()

      expect(json).toMatchObject({
        recommendation: '3 for 2 Promotion',
        threeForTwoTotal: '166.99',
        total: '202.98',
        vipDiscountTotal: null,
      })
    })
  })

  describe('VIP customer adds 3 dresses', () => {
    it('returns a total with the 3-for-2 promotion', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        userType: 'VIP',
        CartItem: [
          {
            quantity: 3,
            Product: PRODUCTS.DRESS,
          },
        ],
      } as unknown as UserWithCartItems)

      const request = new NextRequest('http://localhost/api/cart/total')
      const response = await GET(request)

      const json = await response.json()
      expect(json).toMatchObject({
        recommendation: '3 for 2 Promotion',
        threeForTwoTotal: '161.50',
        total: '242.25',
        vipDiscountTotal: '205.91',
      })
    })
  })

  describe('VIP customer adds 2 jeans and 2 dresses', () => {
    it('returns a total with the 3-for-2 promotion', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        userType: 'VIP',
        CartItem: [
          {
            quantity: 2,
            Product: PRODUCTS.JEANS,
          },
          {
            quantity: 2,
            Product: PRODUCTS.DRESS,
          },
        ],
      } as unknown as UserWithCartItems)

      const request = new NextRequest('http://localhost/api/cart/total')
      const response = await GET(request)

      const json = await response.json()
      expect(json).toMatchObject({
        recommendation: '3 for 2 Promotion',
        threeForTwoTotal: '227.00',
        total: '292.50',
        vipDiscountTotal: '248.63',
      })
    })
  })

  describe('VIP customer adds 4 t-shirts and 1 jeans', () => {
    it('returns a total with the 3-for-2 promotion', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        userType: 'VIP',
        CartItem: [
          {
            quantity: 4,
            Product: PRODUCTS.SHIRT,
          },
          {
            quantity: 1,
            Product: PRODUCTS.JEANS,
          },
        ],
      } as unknown as UserWithCartItems)

      const request = new NextRequest('http://localhost/api/cart/total')
      const response = await GET(request)

      const json = await response.json()
      expect(json).toMatchObject({
        recommendation: '3 for 2 Promotion',
        threeForTwoTotal: '173.47',
        total: '209.46',
        vipDiscountTotal: '178.04',
      })
    })
  })
})
