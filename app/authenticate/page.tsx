'use client'

import { useStytch, useStytchUser } from '@stytch/nextjs'
import { generateUsername } from 'app/_utils/helpers'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const OAUTH_TOKEN = 'oauth'
const MAGIC_LINKS_TOKEN = 'magic_links'

export default function Authenticate() {
  const { user, isInitialized } = useStytchUser()
  const stytch = useStytch()
  const router = useRouter()
  const searchParams = useSearchParams()

  const createUser = async (email: string, username: string) => {
    return await fetch('/authenticate/api', {
      method: 'POST',
      body: JSON.stringify({
        email,
        username
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  useEffect(() => {
    if (stytch && !user && isInitialized) {
      const token = searchParams.get('token')
      const stytchTokenType = searchParams.get('stytch_token_type')

      if (token && stytchTokenType === OAUTH_TOKEN) {
        stytch.oauth.authenticate(token, {
          session_duration_minutes: 60,
        }).then(async res => {
          // If a new user is logging in, add default metadata for initial profile rendering.
          if (!res.user.untrusted_metadata.username) {
            const username = generateUsername()

            try {
              await Promise.all([
                stytch.user.update({
                  untrusted_metadata: {
                    // [Note]: How do I deal with collisions?
                    username
                  },
                }),
                createUser(res.user.emails[0].email , username) 
              ])
            } catch (e) {
              console.log(e)
            }
          }
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
    if (user && user.untrusted_metadata.username) {
      router.replace(`/${user.untrusted_metadata.username}`)
    }
  }, [router, user, isInitialized])

  return null
}
