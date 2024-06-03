'use client'

import { parseApiResponse } from 'app/_utils/parsing'
import { usePathname } from 'next/navigation'
import React, { ReactNode, useEffect, useState } from 'react'

export default function Page() {
  const pathname = usePathname()

  const [user, setUser] = useState<any>()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = pathname.slice(1)
        const response = await fetch(`/${user}/api`)
        if (!response.ok) {
          throw new Error('Failed to fetch user data')
        }
        const data = await response.json()
        setUser(parseApiResponse(data))
      } catch (e) {
        console.log('Failed to fetch user data')
      }
    }

    if (pathname) {
      fetchUserData()
    }
    
  }, [pathname])

  useEffect(() => {
    console.log(user)
  }, [user])

  const renderLinks = (socialMedia: any): ReactNode => {
    const links = socialMedia.map((media: string) => {
      return (
        <div key={media}>{media}</div>
      )
    })
    return links
  }

  return (
    <div className="flex min-h-screen flex-col font-mono text-sm gap-4 p-24">
      <div className="border border-rose-300 p-6 flex">
        {user && (
          <>
            <div className="border border-black-300 rounded-full w-36 h-36 bg-stone-200" /><div>
              <div>@{user.username}</div>
              <div>{renderLinks(user.socialMedia)}</div>
              <div>Bio</div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}