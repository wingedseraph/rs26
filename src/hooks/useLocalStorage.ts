import { useEffect, useState } from 'react'

import { STORAGE } from '@/api/localStorage'

export function useLocalStorage(initialValue: string, key?: string) {
  const [value, setValue] = useState(() => localStorage.getItem(key ?? STORAGE) ?? initialValue)

  useEffect(() => localStorage.setItem(key ?? STORAGE, value.trim()), [value, key])

  const clearValue = () => setValue('')

  return {
    value,
    setValue,
    clearValue,
  }
}
