'use client'

import { useEffect, useState } from 'react'

import { STORAGE } from '@/lib/localStorage'

type useLocalStorageProperties = {
  value: string
  syncSetValue: (value: string) => void
}

export function useLocalStorage(initialValue: string, key?: string): useLocalStorageProperties {
  const [value, setValue] = useState(initialValue)
  useEffect(() => {
    // eslint-disable-next-line react/set-state-in-effect -- avoid hydration error, source: https://nextjs.org/docs/messages/react-hydration-error#solution-1-using-useeffect-to-run-on-the-client-only
    setValue(localStorage.getItem(key ?? STORAGE) ?? initialValue)
  }, [initialValue, key])

  const syncSetValue = (newValue: string) => {
    const trimmedValue = newValue.trim()

    setValue(trimmedValue)
    localStorage.setItem(key ?? STORAGE, trimmedValue)
  }

  return {
    value,
    syncSetValue,
  }
}
