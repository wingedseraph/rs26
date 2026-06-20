'use client'

import { useEffect, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

import { STORAGE } from '@/lib/localStorage'

type useLocalStorageProperties = {
  value: string
  setValue: Dispatch<SetStateAction<string>>
  clearValue: () => void
}

export function useLocalStorage(initialValue: string, key?: string): useLocalStorageProperties {
  const [value, setValue] = useState(() => {
    try {
      return localStorage.getItem(key ?? STORAGE) ?? initialValue
    }
    catch {
      return initialValue
    }
  },
  )

  useEffect(() => {
    try {
      localStorage.setItem(key ?? STORAGE, value.trim())
    }
    catch (error_) { error_ instanceof Error && console.warn(error_.message) }
  }, [value, key])

  const clearValue = () => setValue('')

  return {
    value,
    setValue,
    clearValue,
  }
}
