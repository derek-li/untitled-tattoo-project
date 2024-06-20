import { auth, signOut } from '@auth'
import Link from 'next/link'
import React from 'react'

export default async function Navigation() {
  const session = await auth()

  return (
    <header className="h-14 w-full px-8 border border-neutral-400 fixed top-0 flex justify-end items-center font-mono text-sm gap-6">
      <Link href="/" className="flex mr-auto items-center py-1 hover:text-blue-600">
          Home
      </Link>
      {session && (
        <Link href="/account" className="flex items-center py-1 hover:text-blue-600">
          Account
        </Link>
      )}
      {session ?
        <form action={async () => {
          'use server'
          await signOut({ redirectTo: '/login'})
        }}>
          <button type="submit" className="flex items-center py-1 hover:text-blue-600">
            Sign out
          </button>
        </form>
         :
        <Link href="/login" className="flex items-center py-1 hover:text-blue-600">
          Sign in
        </Link>
      }
    </header>
  )
}