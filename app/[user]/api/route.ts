import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'
export async function GET(request: Request, { params }: { params: { user: string }}) {
  const username = params.user

  const user = await prisma.users.findUnique({
    where: {
      username: username,
    },
  })

  return Response.json(user)
}
