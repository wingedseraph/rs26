import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { CombinedInput } from './CombinedInput'

function renderCombinedInput(query = '') {
  const onChange = vi.fn()
  const clearQuery = vi.fn()

  render(<CombinedInput onChange={onChange} clearQuery={clearQuery} query={query} />)

  return { onChange, clearQuery }
}

describe('CombinedInput', () => {
  describe('Поле пустое', () => {
    it('должен отобразить placeholder', () => {
      renderCombinedInput()

      expect(screen.getByPlaceholderText('Find')).toBeInTheDocument()
    })

    it('должен скрыть кнопки submit и clear', () => {
      renderCombinedInput()

      expect(screen.queryByTitle('Submit search')).not.toBeInTheDocument()
      expect(screen.queryByTitle('Clear search')).not.toBeInTheDocument()
    })
  })

  describe('Поле заполнено', () => {
    it('должен отобразить переданное значение', () => {
      renderCombinedInput('test')

      expect(screen.getByDisplayValue('test')).toBeInTheDocument()
    })

    it('должен показать кнопки submit и clear', () => {
      renderCombinedInput('test')

      expect(screen.getByTitle('Submit search')).toBeInTheDocument()
      expect(screen.getByTitle('Clear search')).toBeInTheDocument()
    })
  })

  describe('Взаимодействия', () => {
    it('должен вызвать onChange при вводе текста', async () => {
      const { onChange } = renderCombinedInput()

      await userEvent.type(screen.getByPlaceholderText('Find'), 'a')

      expect(onChange).toHaveBeenCalledTimes(1)
    })

    it('должен вызвать clearQuery при клике на кнопку очистки', async () => {
      const { clearQuery } = renderCombinedInput('test')

      await userEvent.click(screen.getByTitle('Clear search'))

      expect(clearQuery).toHaveBeenCalledTimes(1)
    })
  })
})
