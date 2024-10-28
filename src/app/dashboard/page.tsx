'use client'

import { ReloadIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { GalleryItem } from '@/components/gallery-item'
import SidebarContainer from '@/containers/sidebar-container'
import { useGetProducts } from '@/hooks/use-get-products'

const Dashboard = () => {
  const { data: products, isLoading } = useGetProducts()
  const router = useRouter()

  useEffect(() => {
    const userId = localStorage.getItem('userId')

    if (!userId) {
      router.replace('/')
    }
  }, [router])

  return (
    <SidebarContainer>
      <div className="flex flex-col md:flex-row flex-1 gap-4 p-4 max-w-5xl mx-auto items-center">
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
    </SidebarContainer>
  )
}

export default Dashboard
