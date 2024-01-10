// This file uses prisma to query the MongoDB Atlas Database

// Run this test with this command:
  // npx ts-node dbTest.ts

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface user {
  id: string;
  first: string;
  last: string;
}

async function main() {
  // Prisma Client queries:
  const allUsers: user[] = await prisma.testCollection.findMany()
  console.log(`Found user: ${allUsers[0].last}, ${allUsers[0].first}`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
