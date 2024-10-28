// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: 'T-shirt',
        price: 35.99,
        description: 'A simple t-shirt',
        imagePath: '/shirt.jpg',
      },
      {
        name: 'Jeans',
        price: 65.5,
        description: 'A simple jeans',
        imagePath: '/jeans.jpg',
      },
      {
        name: 'Dress',
        price: 80.75,
        description: 'A simple dress',
        imagePath: '/dress.jpg',
      },
    ],
  })
}

main()
  .then(() => console.log('Seeding completed!'))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
