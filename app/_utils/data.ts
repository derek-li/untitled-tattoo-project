'use server'

import { auth } from '@auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
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

export const getUserFromSession = cache(async () => {
  const session = await auth()

  if (!session?.user?.email) {
    redirect('/login')
  }

  const user = await getUserByEmail(session.user.email)

  if (!user) {
    redirect('/login')
  }

  return user
})

export const updateUser = async (email: string, formData: FormData) => {
  const rawData = {
    username: formData.get('username'),
    bio: formData.get('description'),
    isBookingOpen: formData.get('bookingsOpen')
  }

  await prisma.users.update({
    where: {
      email
    },
    data: {
      username: rawData.username?.toString(),
      bio: rawData.bio?.toString(),
      is_booking_open: rawData.isBookingOpen === 'on'
    }
  })

  // [Note]: How do you revalidate dynamic paths?
  revalidatePath('/account')
}