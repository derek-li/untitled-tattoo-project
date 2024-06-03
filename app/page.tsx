'use client'

import { useStytchUser } from '@stytch/nextjs'
import React, { useEffect } from 'react'

export default function Home() {
  const { user, isInitialized } = useStytchUser()

  useEffect(() => {
    if (isInitialized && user) {
      console.log(isInitialized, user)
    }
  }, [user, isInitialized])

  return (
      <main className="flex min-h-screen flex-col font-mono text-sm gap-4 p-24">
        <p>Hi.</p>
        <p>Welcome to untitled_tattoo_project.</p>
        <p>If you&apos;re an artist, please sign up to start using this platform :)</p>
        {/* Sign up flow */}
        <p>If you&apos;re looking for a tattoo, stay tuned for exciting features.</p>
        {/* <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
            <a
              className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
              href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{" "}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className="dark:invert"
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div> */}
      </main>
  )
}
