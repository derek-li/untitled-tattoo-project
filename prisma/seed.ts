import { PrismaClient } from '@prisma/client'

import users from '../seeds/users'

const prisma = new PrismaClient()

async function insertUsers() {
  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      return await prisma.users.upsert({
        where: { email: user.email },
        update: {},
        create: user
      })
    })
  )

  console.log(insertedUsers)
}

async function main() {
  await insertUsers()
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