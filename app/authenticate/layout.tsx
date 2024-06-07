import React, { Suspense } from 'react'

export default function AuthenticateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Suspense>{children}</Suspense>
}