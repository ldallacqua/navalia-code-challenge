import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from '@/hooks/use-toast'
import api from '@/utils/axios-instance'

export const useUpdateItemInCart = ({ productId }: { productId: string }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (quantity: number) => {
      return api.patch(`/cart/${productId}`, { quantity })
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
