'use client'

import { Product } from '@prisma/client'
import { ReloadIcon } from '@radix-ui/react-icons'
import Image from 'next/image'

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
import { useAddItemToCart } from '@/hooks/use-add-item-to-cart'

export const GalleryItem = ({
  name,
  id,
  description,
  imagePath,
  price,
}: Product) => {
  const { mutate: addToCart, isPending } = useAddItemToCart()

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
        {!!imagePath && (
          <AspectRatio ratio={3 / 4} className="bg-muted rounded-lg">
            <Image
              src={imagePath}
              alt={description}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="h-full w-full rounded-md object-cover"
            />
          </AspectRatio>
        )}
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
