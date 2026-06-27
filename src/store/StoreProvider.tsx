'use client'
import type { ReactNode } from 'react'
import { useRef } from 'react'
import { Provider } from 'react-redux'

import type { AppStore } from '@/store'

import { setupStore } from '@/store'

function StoreProvider({
  children,
}: {
  children: ReactNode
}) {
  const storeRef = useRef<AppStore | null>(null)
  storeRef.current ??= setupStore()

  return <Provider store={storeRef.current}>{children}</Provider>
}

export { StoreProvider }
