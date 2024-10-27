'use client'

import { CartItem, Product } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import api from '@/utils/axios-instance'

type CartItemType = ({
  Product: Product
} & CartItem)[]

export const useGetCartItems = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const res = await api.get<CartItemType>('/cart')
      return res.data
    },
    staleTime: 1000 * 60 * 1,
  })
}
