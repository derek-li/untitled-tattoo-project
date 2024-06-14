import { auth } from '@auth'
import { generateUsername } from '@utils/helpers'
import { redirect } from 'next/navigation'
import prisma from 'prisma/prisma'

export default async function Authenticate() {
  const session = await auth()
  if (!session?.user?.email) {
    redirect('/login')
  }

  const { username } = await prisma.users.upsert({
    where: {
      email: session.user.email,
    },
    update: {},
    create: {
      email: session.user.email,
      username: generateUsername(),
      // [Note]: Remove password from users table
      password: '12345678',
      is_booking_open: true,
      social_media: [],
      pages: []
    },
  })

  if (username) {
    redirect(`http://localhost:3000/${username}`)
  } else {
    redirect('/login')
  }
}
