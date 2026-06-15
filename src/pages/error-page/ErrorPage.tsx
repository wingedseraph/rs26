import type { ReactNode } from 'react'

import { BackLink } from '@/components/ui/back-link'

type ErrorPageProperties = {
  errorMessage?: string
  children?: ReactNode
}

export default function ErrorPage({ errorMessage, children }: ErrorPageProperties) {
  return (
    <>
      <BackLink />

      <div
        id='center'
        className='appear p-2 md:px-8 md:pt-6'
      >
        <h1 className='sm:text-8xl/30'>Something went wrong</h1>
        {errorMessage && <span>{errorMessage}</span>}
        {children}
      </div>
    </>
  )
}
