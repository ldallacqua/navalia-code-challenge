import { Decimal } from '@prisma/client/runtime/library'

type CartItem = {
  price: Decimal
  quantity: number
}

export const calculateThreeForTwo = (cartItems: CartItem[]) => {
  // Flatten cart items based on quantity
  const allItems: number[] = []
  cartItems.forEach((item) => {
    for (let i = 0; i < item.quantity; i++) {
      allItems.push(item.price.toNumber()) // Convert Decimal to number
    }
  })

  // Sort items by price in ascending order to prioritize the cheapest items for removal
  const sortedItems = allItems.sort((a, b) => a - b)

  // Calculate the number of items to remove (one free item for every three items)
  const itemsToRemove = Math.floor(sortedItems.length / 3)

  // Remove the cheapest items
  sortedItems.splice(0, itemsToRemove)

  // Sum up the remaining items
  const total = sortedItems.reduce((sum, price) => sum + price, 0)

  return total
}

export const calculateVIPDiscount = (cartItems: CartItem[]) => {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price.toNumber() * item.quantity, // Convert Decimal to number
    0
  )
  return total * 0.85 // Apply 15% discount
}
