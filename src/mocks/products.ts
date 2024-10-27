import { Decimal } from '@prisma/client/runtime/library'

export const PRODUCTS = {
  SHIRT: {
    name: 'T-shirt',
    price: new Decimal(35.99),
  },
  JEANS: {
    name: 'Jeans',
    price: new Decimal(65.5),
  },
  DRESS: {
    name: 'Dress',
    price: new Decimal(80.75),
  },
}
