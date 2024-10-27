import { CartItem as CartItemType, Product } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useCallback, useState } from 'react'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import api from '@/utils/axios-instance'

type CartItemProps = {
  Product: Product
} & CartItemType

export const CartItem = ({ cartItem }: { cartItem: CartItemProps }) => {
  const queryClient = useQueryClient()
  const [quantity, setQuantity] = useState(cartItem?.quantity)

  const onError = (error: Error) => ({
    variant: 'destructive',
    title: 'Uh oh! Something went wrong.',
    description: error.message,
  })

  const { mutate: removeItemFromCart, isPending: isRemovingFromCart } =
    useMutation({
      mutationFn: () => {
        return api.delete(`/cart/${cartItem?.productId}`)
      },
      onSuccess: () => {
        toast({
          title: 'Cart Updated',
          description: 'Item removed from cart',
        })
        queryClient.invalidateQueries({ queryKey: ['cart'] })
      },
      onError,
    })

  const { mutate: updateItemInCart, isPending: isUpdatingInCart } = useMutation(
    {
      mutationFn: (quantity: number) => {
        return api.patch(`/cart/${cartItem?.productId}`, { quantity })
      },
      onSuccess: () => {
        toast({
          title: 'Cart Updated',
          description: 'Item updated in cart',
        })
        queryClient.invalidateQueries({ queryKey: ['cart'] })
      },
      onError,
    }
  )

  const handleUpdateItemInCart = useCallback(() => {
    if (quantity === cartItem?.quantity) return

    if (quantity < 1) {
      removeItemFromCart()
    }

    updateItemInCart(quantity)
  }, [cartItem?.quantity, quantity, removeItemFromCart, updateItemInCart])

  return (
    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
      <div className="flex gap-4 items-center">
        <div className="w-[80px]">
          <AspectRatio ratio={1 / 1} className="bg-muted rounded-lg">
            <Image
              src={cartItem?.Product?.imagePath}
              alt={cartItem?.Product?.description}
              fill
              priority
              className="h-full w-full rounded-md object-cover"
            />
          </AspectRatio>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {cartItem?.Product?.name}
          </h3>
          <span className="text-[0.8rem] text-muted-foreground">
            {cartItem?.Product?.description}
          </span>
          <div className="flex gap-2 justify-start items-center">
            <Input
              className="w-16"
              type="number"
              disabled={isUpdatingInCart}
              onChange={(e) => setQuantity(Number(e.target.value))}
              onBlur={() => handleUpdateItemInCart()}
              value={quantity}
            />
            {`x $${Number(cartItem?.Product?.price).toFixed(2)}`}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <Button
          onClick={() => removeItemFromCart()}
          disabled={isRemovingFromCart}
          variant="link"
        >
          Remove
        </Button>
        <div>
          ${(Number(cartItem?.Product?.price) * cartItem?.quantity).toFixed(2)}
        </div>
      </div>
    </div>
  )
}
