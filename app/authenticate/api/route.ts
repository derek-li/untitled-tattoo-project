import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'
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
      // [Note]: Remove password from users table
      password: '12345678',
      is_booking_open: true,
      social_media: [],
      pages: []
    },
  })

  return Response.json(response)
}
