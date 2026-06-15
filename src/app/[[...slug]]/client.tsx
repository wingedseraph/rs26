'use client'

import dynamic from 'next/dynamic'

const App = dynamic(() => import('../../pages/landing-page/LandingPage'), { ssr: false })

export function ClientOnly() {
  return <App />
}
