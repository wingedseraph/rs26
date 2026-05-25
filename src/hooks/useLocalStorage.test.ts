import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { STORAGE } from '@/api/localStorage'
import { useLocalStorage } from '@/hooks/useLocalStorage'

describe('useLocalStorage', () => {
  afterEach(() => {
    localStorage.clear()
  })

  describe('Инициализация', () => {
    it('должен вернуть начальное значение при пустом localStorage', () => {
      const { result } = renderHook(() => useLocalStorage('hello', 'test-key'))

      expect(result.current.value).toBe('hello')
    })

    it('должен вернуть сохранённое значение из localStorage', () => {
      localStorage.setItem('test-key', 'stored')

      const { result } = renderHook(() => useLocalStorage('hello', 'test-key'))

      expect(result.current.value).toBe('stored')
    })

    it('должен использовать ключ STORAGE по умолчанию', () => {
      const { result } = renderHook(() => useLocalStorage('default'))

      expect(result.current.value).toBe('default')
      expect(localStorage.getItem(STORAGE)).toBe('default')
    })
  })

  describe('Обновление значения', () => {
    it('должен обновить значение и записать в localStorage', () => {
      const { result } = renderHook(() => useLocalStorage('hello', 'test-key'))

      act(() => {
        result.current.setValue('updated')
      })

      expect(result.current.value).toBe('updated')
      expect(localStorage.getItem('test-key')).toBe('updated')
    })

    it('должен обрезать пробелы при сохранении в localStorage', () => {
      const { result } = renderHook(() => useLocalStorage('', 'test-key'))

      act(() => {
        result.current.setValue('  spaced  ')
      })

      expect(localStorage.getItem('test-key')).toBe('spaced')
    })
  })

  describe('Очистка значения', () => {
    it('должен сбросить значение на пустую строку', () => {
      const { result } = renderHook(() => useLocalStorage('hello', 'test-key'))

      act(() => {
        result.current.clearValue()
      })

      expect(result.current.value).toBe('')
    })
  })
})
