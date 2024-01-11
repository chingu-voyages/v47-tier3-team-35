// This file uses prisma to query the MongoDB Atlas Database

// Run this test with this command:
// npx ts-node dbTest.ts
  
const { config } = require('dotenv');
config({ path: '.env.local' })

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

interface user {
  id: string;
  first: string;
  last: string;
}

async function getDb() {
  // Prisma Client queries:
  const allUsers: user[] = await prisma.testCollection.findMany()
  console.log(`Found user: ${allUsers[0].last}, ${allUsers[0].first}`)
}

getDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
