import { ReloadIcon } from '@radix-ui/react-icons'
import { useEffect, useMemo, useState } from 'react'

import { CartItem } from '@/components/cart-item'
import { CheckoutButton } from '@/components/checkout-button'
import { Checkbox } from '@/components/ui/checkbox'
import { Sidebar, SidebarContent, SidebarFooter } from '@/components/ui/sidebar'
import { useGetCartItems } from '@/hooks/use-get-cart-items'
import { useGetTotals } from '@/hooks/use-get-totals'

export function CartSidebar() {
  const { data: cartItems, isFetching } = useGetCartItems()
  const [selectedPromotion, setSelectedPromotion] = useState('3for2')

  const hasCartItems = useMemo(() => {
    return cartItems && cartItems.length > 0
  }, [cartItems])

  const { data: totals, isFetching: isFetchingTotals } = useGetTotals({
    enabled: !!hasCartItems,
  })

  useEffect(() => {
    if (totals?.recommendation === 'vip') {
      return setSelectedPromotion('vip')
    } else if (totals?.recommendation === '3for2') {
      return setSelectedPromotion('3for2')
    }
  }, [totals])

  return (
    <Sidebar side="right">
      <SidebarContent className="p-4">
        <h2 className="text-2xl mb-4">Cart</h2>
        {hasCartItems ? (
          cartItems
            ?.sort((a, b) => (a?.createdAt > b?.createdAt ? 1 : -1))
            ?.map((cartItem) => (
              <CartItem
                key={cartItem?.productId}
                cartItem={cartItem}
                isFetching={isFetching}
              />
            ))
        ) : isFetching ? (
          <div className="flex gap-2 items-center">
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Loading your cart...
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            Your cart is empty
          </div>
        )}
      </SidebarContent>
      {isFetchingTotals ? (
        <SidebarFooter className="p-6">
          <div className="flex gap-2 items-center">
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Loading some nice discounts for you...
          </div>
        </SidebarFooter>
      ) : (
        hasCartItems && (
          <SidebarFooter className="p-6">
            <h2 className="mb-2">
              You have the following available discounts:
            </h2>
            {!!totals?.vipDiscountTotal && (
              <div className="flex gap-2 items-center">
                <Checkbox
                  checked={selectedPromotion === 'vip'}
                  id="vip"
                  onClick={() => setSelectedPromotion('vip')}
                />
                <label htmlFor="vip">
                  {`VIP Discount ${totals?.recommendation === 'vip' ? '(Recommended)' : ''}`}
                </label>
              </div>
            )}
            {!!totals?.threeForTwoTotal && (
              <div className="flex gap-2 items-center">
                <Checkbox
                  checked={selectedPromotion === '3for2'}
                  id="3for2"
                  onClick={() => setSelectedPromotion('3for2')}
                />
                <label htmlFor="3for2">
                  {`Buy 3, pay 2 ${totals?.recommendation === '3for2' ? '(Recommended)' : ''}`}
                </label>
              </div>
            )}
            <div className="flex flex-1 justify-between py-6 items-end">
              <span className="text-2xl">Subtotal:</span>
              <div className="text-2xl flex flex-col gap-2 items-center">
                <span
                  data-testid="total-value"
                  className="line-through"
                >{`$${totals?.total}`}</span>
                <span className="text-2xl font-bold">
                  {selectedPromotion === 'vip' && (
                    <span data-testid="final-value">{`$${totals?.vipDiscountTotal}`}</span>
                  )}
                  {selectedPromotion === '3for2' && (
                    <span data-testid="final-value">{`$${totals?.threeForTwoTotal}`}</span>
                  )}
                </span>
              </div>
            </div>

            <CheckoutButton />
          </SidebarFooter>
        )
      )}
    </Sidebar>
  )
}
