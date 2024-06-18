import prisma from 'prisma/prisma'
import { cache } from 'react'

export const getUserByUsername = cache(async (username: string) => {
  const user = await prisma.users.findUnique({
    where: {
      username
    },
  })
  return user
})

export const getUserByEmail = cache(async (email: string) => {
  const user = await prisma.users.findUnique({
    where: {
      email
    },
  })
  return user
})