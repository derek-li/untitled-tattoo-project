import { signIn } from '@auth'
import React from 'react'
 
export function SignIn() {
  return (
    <form
      action={async () => {
        'use server'
        await signIn('google', { redirectTo: '/authenticate' })
      }}
    >
      <button type="submit">Sign-in with Google</button>
    </form>
  )
} 