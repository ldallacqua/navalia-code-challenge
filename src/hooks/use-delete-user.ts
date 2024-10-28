import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { toast } from '@/hooks/use-toast'
import api from '@/utils/axios-instance'

export const useDeleteUser = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => {
      return api.delete('/users')
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'User deleted!',
      })
      localStorage.removeItem('userId')
      queryClient.removeQueries()
      router.replace('/')
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message,
      })
    },
  })
}
