'use client'
import type { ReactNode } from 'react'

import { BackLink } from '@/components/ui/back-link'

type ErrorPageProperties = {
  error?: Error
  unstable_retry?: () => void
  children?: ReactNode
}

export default function ErrorPage({ error, unstable_retry, children }: ErrorPageProperties) {
  return (
    <>
      <BackLink />

      <div
        id='center'
        className='appear p-2 md:px-8 md:pt-6'
      >
        <h1 className='sm:text-8xl/30'>Something went wrong</h1>
        {error && <span>{error.message}</span>}
        {unstable_retry && <button onClick={() => unstable_retry()}>Try again</button>}
        {children}
      </div>
    </>
  )
}
