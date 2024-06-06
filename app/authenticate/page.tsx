'use client'

import { useStytch,useStytchUser } from '@stytch/nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const OAUTH_TOKEN = 'oauth'
const MAGIC_LINKS_TOKEN = 'magic_links'

export default function Authenticate() {
  const { user, isInitialized } = useStytchUser()
  const stytch = useStytch()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (stytch && !user && isInitialized) {
      const token = searchParams.get('token')
      const stytchTokenType = searchParams.get('stytch_token_type')

      if (token && stytchTokenType === OAUTH_TOKEN) {
        stytch.oauth.authenticate(token, {
          session_duration_minutes: 60,
        })
      } else if (token && stytchTokenType === MAGIC_LINKS_TOKEN) {
        stytch.magicLinks.authenticate(token, {
          session_duration_minutes: 60,
        })
      }
    }
  }, [isInitialized, router, searchParams, stytch, user])

  useEffect(() => {
    if (!isInitialized) {
      return
    }
    if (user) {
      router.replace('/profile')
    }
  }, [router, user, isInitialized])

  return null
}
