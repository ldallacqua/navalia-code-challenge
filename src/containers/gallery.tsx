import { ReloadIcon } from '@radix-ui/react-icons'

import { GalleryItem } from '@/components/gallery-item'
import { useGetProducts } from '@/hooks/use-get-products'

export const Gallery = () => {
  const { data: products, isLoading } = useGetProducts()

  return (
    <div className="flex flex-wrap justify-center flex-1 gap-4 p-4 max-w-6xl mx-auto items-center">
      {isLoading && (
        <div className="flex gap-2 items-center">
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Loading awesome products...
        </div>
      )}
      {products?.map((product) => (
        <GalleryItem key={product?.id} {...product} />
      ))}
    </div>
  )
}
