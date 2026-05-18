import { MemoryRouter } from 'react-router'

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CARD_WITH_PRIMARY_TITLE_MOCK, CARD_WITH_SECONDARY_TITLE_MOCK } from '@/mocks/mocks'

import { CardList } from './CardList'

describe('render cards empty data', () => {
  it('should render cardlist empty data if no data provided', () => {
    render(<MemoryRouter><CardList data={[]} page={1} /></MemoryRouter>)

    expect(screen.getByText('Oh No Data')).toBeTruthy()
  })
})

describe('render cards with data', () => {
  it('displays primary title when available', () => {
    render(<MemoryRouter><CardList data={CARD_WITH_PRIMARY_TITLE_MOCK} page={1} /></MemoryRouter>)

    expect(screen.queryByText('Oh No Data')).toBeNull()
    expect(screen.getByText('Primary Title')).toBeTruthy()
    expect(screen.queryByText('Secondary Title')).toBeNull()
  })

  it('displays secondary title when primary doesnt available', () => {
    render(<MemoryRouter><CardList data={CARD_WITH_SECONDARY_TITLE_MOCK} page={1} /></MemoryRouter>)

    expect(screen.queryByText('Oh No Data')).toBeNull()
    expect(screen.queryByText('Primary Title')).toBeNull()
    expect(screen.getByText('Secondary Title')).toBeTruthy()
  })
})
