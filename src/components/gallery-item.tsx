'use client'

import { Product } from '@prisma/client'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { z } from 'zod'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useSidebar } from '@/components/ui/sidebar'
import { toast } from '@/hooks/use-toast'
import { createCartItemSchema } from '@/schemas/cart'
import api from '@/utils/axios-instance'

export const GalleryItem = ({
  name,
  id,
  description,
  imagePath,
  price,
}: Product) => {
  const queryClient = useQueryClient()
  const { setOpen, setOpenMobile } = useSidebar()

  const { mutate: addToCart, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof createCartItemSchema>) => {
      return api.post('/cart', data)
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: `${name} added to cart`,
      })
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

  const handleAddToCart = () => {
    addToCart({ productId: id, quantity: 1 })
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <AspectRatio ratio={3 / 4} className="bg-muted rounded-lg">
          <Image
            src={imagePath}
            alt="Photo by Drew Beamer"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="h-full w-full rounded-md object-cover"
          />
        </AspectRatio>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>${price?.toString()}</div>
        <Button onClick={handleAddToCart} disabled={isPending}>
          {isPending ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            'Add to Cart'
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
