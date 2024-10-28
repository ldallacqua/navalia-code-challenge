'use client'

import { useQuery } from '@tanstack/react-query'

import api from '@/utils/axios-instance'

type TotalsType = {
  total: string
  vipDiscountTotal: string | null
  threeForTwoTotal: string | null
  recommendation: string | null
}

export const useGetTotals = ({ enabled }: { enabled: boolean }) => {
  return useQuery({
    queryKey: ['totals'],
    queryFn: async () => {
      const res = await api.get<TotalsType>('/cart/total')
      return res.data
    },
    staleTime: 1000 * 60 * 1,
    enabled,
  })
}
