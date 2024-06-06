'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Navigation() {
  const pathname = usePathname()

  const activeLink = 'text-blue-500 h-full border-b-4 border-blue-600 pt-2'

  return (
    <header className="h-14 w-full px-8 border border-neutral-400 fixed top-0 flex justify-end items-center font-mono text-sm">
      <Link href="/login" className={`flex items-center px-6 py-1 hover:text-blue-600 ${pathname === '/login' && activeLink}`}>
        Sign in
      </Link>
    </header>
  )
}