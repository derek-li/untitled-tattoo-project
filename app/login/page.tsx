'use client'

import { StytchLogin } from '@stytch/nextjs'
import { Products } from '@stytch/vanilla-js'
import { getDomainFromWindow } from 'app/_utils/routing'
import React from 'react'

/*
 * Login configures and renders the StytchLogin component which is a prebuilt UI component for auth powered by Stytch.
 * 
 * This component accepts style, config, and callbacks props. To learn more about possible options review the documentation at
 * https://stytch.com/docs/sdks/javascript-sdk#ui-configs.
*/
export default function Login() {
  const styles = {
    container: {
      width: '600px',
    },
    buttons: {
      primary: {
        backgroundColor: '#4A37BE',
        borderColor: '#4A37BE',
      },
    },
    fontFamily: 'Menlo',
  }

  const config = {
    products: [Products.emailMagicLinks, Products.oauth],
    emailMagicLinksOptions: {
      loginRedirectURL: getDomainFromWindow() + '/authenticate',
      loginExpirationMinutes: 60,
      signupRedirectURL: getDomainFromWindow() + '/authenticate',
      signupExpirationMinutes: 60,
    },
    oauthOptions: {
      providers: [{ type: 'google' }],
      loginRedirectURL: getDomainFromWindow() + '/authenticate',
      signupRedirectURL: getDomainFromWindow() + '/authenticate',
    }
  } as Parameters<typeof StytchLogin>[0]['config']

  return (
    <div className='w-full h-[calc(100vh-56px)] mt-14 flex justify-center items-center'>
      <StytchLogin config={config} styles={styles} />
    </div>
  )
}
