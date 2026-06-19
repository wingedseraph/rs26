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
  const [value, setValue] = useState(() => /* fix: window* is that enough for ssr? */ window.localStorage.getItem(key ?? STORAGE) ?? initialValue)

  useEffect(() => window.localStorage.setItem(key ?? STORAGE, value.trim()), [value, key])

  const clearValue = () => setValue('')

  return {
    value,
    setValue,
    clearValue,
  }
}
