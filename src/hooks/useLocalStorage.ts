import { useEffect, useState } from 'react'
import type { Dispatch } from 'react'

import { STORAGE } from '@/lib/localStorage'

type useLocalStorageProperties = {
  value: string
  setValue: Dispatch<React.SetStateAction<string>>
  clearValue: () => void

}

export function useLocalStorage(initialValue: string, key?: string): useLocalStorageProperties {
  const [value, setValue] = useState(() => localStorage.getItem(key ?? STORAGE) ?? initialValue)

  useEffect(() => localStorage.setItem(key ?? STORAGE, value.trim()), [value, key])

  const clearValue = () => setValue('')

  return {
    value,
    setValue,
    clearValue,
  }
}
