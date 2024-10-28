import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import api from '@/utils/axios-instance'

export const useDeleteUser = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => {
      return api.delete('/users')
    },
    onSettled: () => {
      localStorage.removeItem('userId')
      queryClient.removeQueries()
      router.replace('/')
    },
  })
}
