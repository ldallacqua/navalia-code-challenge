import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from '@/hooks/use-toast'
import api from '@/utils/axios-instance'

export const useRemoveItemFromCart = ({ productId }: { productId: string }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => {
      return api.delete(`/cart/${productId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      queryClient.invalidateQueries({ queryKey: ['totals'] })
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
