'use client'

import { StytchProvider } from '@stytch/nextjs'
import { createStytchUIClient } from '@stytch/nextjs/ui'
import React, { ReactNode } from 'react'

const stytch = createStytchUIClient(
  process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN || ''
)

const Stytch = ({ children }: { children: ReactNode }) => {
  return <StytchProvider stytch={stytch}>{children}</StytchProvider>
}

export default Stytch
