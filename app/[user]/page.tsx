'use client'

import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

export default function Page() {
  const pathname = usePathname()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = pathname.slice(1)
        const response = await fetch(`/${user}/api`)
        if (!response.ok) {
          throw new Error('Failed to fetch user data')
        }
        const data = await response.json()
        console.log(data)
      } catch (e) {
        console.log('Failed to fetch user data')
      }
    }

    if (pathname) {
      fetchUserData()
    }
    
  }, [pathname])

  return <p>Users Page</p>
}