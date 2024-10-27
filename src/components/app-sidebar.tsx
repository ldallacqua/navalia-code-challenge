import { useMemo } from 'react'

import { CartItem } from '@/components/cart-item'
import { Button } from '@/components/ui/button'
import { Sidebar, SidebarContent, SidebarFooter } from '@/components/ui/sidebar'
import { useGetCartItems } from '@/hooks/use-get-cart-items'

export function AppSidebar() {
  const { data: cartItems } = useGetCartItems()

  const hasCartItems = useMemo(() => {
    return cartItems && cartItems.length > 0
  }, [cartItems])

  return (
    <Sidebar side="right">
      <SidebarContent className="p-4">
        <h2 className="text-2xl mb-4">Cart</h2>
        {hasCartItems ? (
          cartItems
            ?.sort((a, b) => (a?.createdAt > b?.createdAt ? 1 : -1))
            ?.map((cartItem) => (
              <CartItem key={cartItem?.productId} cartItem={cartItem} />
            ))
        ) : (
          <div className="text-center text-muted-foreground">
            Your cart is empty
          </div>
        )}
      </SidebarContent>
      <SidebarFooter className="p-6">
        <Button disabled={!hasCartItems} className="w-full">
          Checkout
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
