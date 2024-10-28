import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

import { toast } from '@/hooks/use-toast'
import { CreateUserSchema } from '@/schemas/users'
import api from '@/utils/axios-instance'

export const useCreateUser = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: (data: z.infer<typeof CreateUserSchema>) => {
      return api.post('/users', data)
    },
    onSuccess: ({ data }) => {
      toast({
        title: 'Success',
        description: 'User created!',
      })
      localStorage.setItem('userId', data?.id)
      router.replace('/dashboard')
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
