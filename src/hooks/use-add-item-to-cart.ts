import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { useSidebar } from '@/components/ui/sidebar'
import { toast } from '@/hooks/use-toast'
import { createCartItemSchema } from '@/schemas/cart'
import api from '@/utils/axios-instance'

export const useAddItemToCart = () => {
  const queryClient = useQueryClient()
  const { setOpen, setOpenMobile } = useSidebar()

  return useMutation({
    mutationFn: (data: z.infer<typeof createCartItemSchema>) => {
      return api.post('/cart', data)
    },
    onSuccess: () => {
      setOpen(true)
      setOpenMobile(true)
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
