import { MemoryRouter } from 'react-router'

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PAGE_SIZE } from '@/api/api'

import { Pagination } from './Pagination'

function renderPagination(page: number, recordsCount: number) {
  return render(
    <MemoryRouter>
      <Pagination page={page} recordsCount={recordsCount} />
    </MemoryRouter>,
  )
}

const TOTAL_RECORDS = 100
const LAST_PAGE = Math.ceil(TOTAL_RECORDS / PAGE_SIZE)

describe('Pagination', () => {
  describe('Отображение текущей страницы', () => {
    it('должен отобразить номер страницы', () => {
      renderPagination(3, TOTAL_RECORDS)

      expect(screen.getByText('3')).toBeInTheDocument()
    })
  })

  describe('Первая страница', () => {
    it('должен заблокировать ссылку назад', () => {
      renderPagination(1, TOTAL_RECORDS)

      const previousLink = screen.getAllByRole('link')[0]

      expect(previousLink).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('Средняя страница', () => {
    it('должен разблокировать ссылку назад', () => {
      renderPagination(2, TOTAL_RECORDS)

      const previousLink = screen.getAllByRole('link')[0]

      expect(previousLink).not.toHaveAttribute('aria-disabled', 'true')
    })

    it('должен разблокировать ссылку вперед', () => {
      renderPagination(1, TOTAL_RECORDS)

      const nextLink = screen.getAllByRole('link')[1]

      expect(nextLink).not.toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('Последняя страница', () => {
    it('должен заблокировать ссылку вперед', () => {
      renderPagination(LAST_PAGE, TOTAL_RECORDS)

      const nextLink = screen.getAllByRole('link')[1]

      expect(nextLink).toHaveAttribute('aria-disabled', 'true')
    })
  })
})
