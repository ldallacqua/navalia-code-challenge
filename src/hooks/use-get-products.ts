import { Product } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import api from '@/utils/axios-instance'

export const useGetProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await api.get<Product[]>('/products')
      return res.data
    },
    staleTime: 1000 * 60 * 1,
  })
}
