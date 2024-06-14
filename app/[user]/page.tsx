import { TUser } from '@utils/definitions'
import { redirect } from 'next/navigation'
import prisma from 'prisma/prisma'
import React from 'react'

export default async function Page({ params }: { params: { user: string }}) {
  const user: TUser | null = await prisma.users.findUnique({
    where: {
      username: params.user,
    },
  })

  if (!user) {
    // [Note]: Maybe redirect to a "user does not exist page"
    redirect('/login')
  }

  return (
    <div>
      <div className="border border-rose-300 p-6 flex">
          <div className="border border-black-300 rounded-full w-36 h-36 bg-stone-200" /><div>
            <div>{user?.username}</div>
          </div>
      </div>
    </div>
  )
}