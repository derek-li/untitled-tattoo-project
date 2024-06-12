'use client'

import { useStytchUser } from '@stytch/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Navigation() {
  const pathname = usePathname()
  const { user, isInitialized } = useStytchUser()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)


  const activeLink = 'text-blue-500 h-full border-b-4 border-blue-600 pt-2'

  useEffect(() => {
    if (isInitialized && user) {
      setIsLoggedIn(true)
    }
  }, [user, isInitialized])

  return (
    <header className="h-14 w-full px-8 border border-neutral-400 fixed top-0 flex justify-end items-center font-mono text-sm">
      {isLoggedIn && <Link href="/account">
        Account
      </Link>
      }
      <Link href="/login" className={`flex items-center px-6 py-1 hover:text-blue-600 ${pathname === '/login' && activeLink}`}>
        Sign in
      </Link>
    </header>
  )
}