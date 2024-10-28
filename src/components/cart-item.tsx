import { CartItem as CartItemType, Product } from '@prisma/client'
import { ReloadIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRemoveItemFromCart } from '@/hooks/use-remove-item-from-cart'
import { useUpdateItemInCart } from '@/hooks/use-update-item-in-cart'

type CartItemProps = {
  Product: Product
} & CartItemType

export const CartItem = ({
  cartItem,
  isFetching,
}: {
  isFetching: boolean
  cartItem: CartItemProps
}) => {
  const [quantity, setQuantity] = useState(cartItem?.quantity)

  const { mutate: removeItemFromCart, isPending: isRemovingFromCart } =
    useRemoveItemFromCart({
      productId: cartItem?.productId,
    })

  const { mutate: updateItemInCart, isPending: isUpdatingInCart } =
    useUpdateItemInCart({
      productId: cartItem?.productId,
    })

  const handleUpdateItemInCart = useCallback(() => {
    if (quantity === cartItem?.quantity) return

    if (quantity < 1) {
      removeItemFromCart()
    }

    updateItemInCart(quantity)
  }, [cartItem?.quantity, quantity, removeItemFromCart, updateItemInCart])

  useEffect(() => {
    setQuantity(cartItem?.quantity)
  }, [cartItem?.quantity])

  return (
    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
      <div className="flex gap-3 items-center">
        <div className="w-[80px]">
          {!!cartItem?.Product?.imagePath && (
            <AspectRatio ratio={1 / 1} className="bg-muted rounded-lg">
              <Image
                src={cartItem?.Product?.imagePath}
                alt={cartItem?.Product?.description}
                fill
                priority
                className="h-full w-full rounded-md object-cover"
              />
            </AspectRatio>
          )}
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
              disabled={isUpdatingInCart || isFetching || isRemovingFromCart}
              onChange={(e) => setQuantity(Number(e.target.value))}
              onBlur={() => handleUpdateItemInCart()}
              value={quantity}
            />
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
          {isFetching ? (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            `$${(Number(cartItem?.Product?.price) * cartItem?.quantity).toFixed(2)}`
          )}
        </div>
      </div>
    </div>
  )
}
