// Boilerplate. Needs to be rewritten for user updates.

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const data = await request.json()

  const response = await prisma.users.upsert({
    where: {
      email: data.email,
    },
    update: {},
    create: {
      email: data.email,
      username: data.username,
      description: data.description,
      isBookingOpen: true
    },
  })

  return Response.json(response)
}
