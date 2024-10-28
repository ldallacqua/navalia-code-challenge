import { Decimal } from '@prisma/client/runtime/library'

export const PRODUCTS = {
  SHIRT: {
    id: 'SHIRT',
    name: 'T-shirt',
    price: new Decimal(35.99),
    description: 'A simple T-Shirt',
  },
  JEANS: {
    id: 'JEANS',
    name: 'Jeans',
    price: new Decimal(65.5),
    description: 'A simple jeans',
  },
  DRESS: {
    id: 'DRESS',
    name: 'Dress',
    price: new Decimal(80.75),
    description: 'A simple Dress',
  },
}
