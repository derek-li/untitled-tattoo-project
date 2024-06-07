'use client'

import { useStytchUser } from '@stytch/nextjs'
import { TUser } from 'app/_utils/definitions'
import { parseApiResponse } from 'app/_utils/parsing'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Page() {
  const { user, isInitialized } = useStytchUser()
  const pathname = usePathname()

  const [userData, setUserData] = useState<TUser>()
  const [isOwner, setIsOwner] = useState<boolean>(false)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = pathname.slice(1)
        const response = await fetch(`/${user}/api`)
        if (!response.ok) {
          throw new Error('Failed to fetch user data')
        }
        const data = await response.json()
        setUserData(parseApiResponse(data))
      } catch (e) {
        console.log('Failed to fetch user data')
      }
    }

    if (pathname) {
      fetchUserData()
    }
  }, [pathname])

  useEffect(() => {
    if (isInitialized && user?.untrusted_metadata?.username === userData?.username) {
      setIsOwner(true)
    }
  }, [isInitialized, user, userData])

  return (
    <div className="flex h-[calc(100vh-56px)] mt-14 flex-col font-mono text-sm">
      <div className="border border-rose-300 p-6 flex">
        {user && (
          <>
            <div className="border border-black-300 rounded-full w-36 h-36 bg-stone-200" /><div>
              <div>Bio</div>
              {isOwner && (
                <div>I am the owner</div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}