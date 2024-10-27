import prisma from '../../../../client'

export const POST = async () => {
  const products = await prisma.product.createMany({
    data: [
      {
        name: 'T-shirt',
        price: 35.99,
      },
      {
        name: 'Jeans',
        price: 65.5,
      },
      {
        name: 'Dress',
        price: 80.75,
      },
    ],
  })

  await prisma.$disconnect()

  return new Response(JSON.stringify(products), {
    headers: { 'content-type': 'application/json' },
  })
}

export const GET = async () => {
  const products = await prisma.product.findMany()

  await prisma.$disconnect()

  return new Response(JSON.stringify(products), {
    headers: { 'content-type': 'application/json' },
  })
}
