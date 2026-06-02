import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { CardListFooter } from './CardListFooter'

describe('CardListFooter', () => {
  describe('Карточка не выбрана', () => {
    it('должен отобразить Save', () => {
      render(<CardListFooter isSelected={false} />)

      expect(screen.getByRole('button', { name: /Save/ })).toBeInTheDocument()
    })
  })

  describe('Карточка выбрана', () => {
    it('должен отобразить Saved', () => {
      render(<CardListFooter isSelected={true} />)

      expect(screen.getByRole('button', { name: /Saved/ })).toBeInTheDocument()
    })
  })

  describe('Взаимодействие', () => {
    it('должен вызвать onClick при клике', async () => {
      const onClick = vi.fn()

      render(<CardListFooter isSelected={false} onClick={onClick} />)

      await userEvent.click(screen.getByRole('button', { name: /Save/ }))

      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('не должен падать при клике без onClick', async () => {
      render(<CardListFooter isSelected={false} />)

      await userEvent.click(screen.getByRole('button', { name: /Save/ }))

      expect(screen.getByRole('button', { name: /Save/ })).toBeInTheDocument()
    })
  })
})
