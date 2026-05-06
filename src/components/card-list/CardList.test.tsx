import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CardList } from './CardList'

const PRIMARY_SECONDARY_TITLE_MOCK = [
  {
    systemNumber: 1,
    objectType: 'Secondary Title',
    _primaryTitle: 'Primary Title',
    _images: {
      _iiif_image_base_url: 'example.com',
    },
  },
]

const SECONDARY_TITLE_MOCK = PRIMARY_SECONDARY_TITLE_MOCK.map(e => ({
  ...e,
  _primaryTitle: '',
}))

describe('render cards', () => {
  it('should render cardlist empty data if no data provided', () => {
    render(<CardList data={[]} loading={false} />)

    expect(screen.getByText('Oh No Data')).toBeTruthy()
  })

  it('should render loading when loading props provided', () => {
    render(<CardList data={[]} loading={true} />)

    expect(screen.queryByText('Oh No Data')).toBeNull()
  })

  it('should render cardlist when valid data provided with primary and secondary title', () => {
    render(<CardList data={PRIMARY_SECONDARY_TITLE_MOCK} loading={false} />)

    expect(screen.queryByText('Oh No Data')).toBeNull()
    expect(screen.queryByText('Primary Title')).toBeTruthy()
    expect(screen.queryByText('Secondary Title')).toBeFalsy()
  })

  it('should render cardlist when valid data provided with only secondary title', () => {
    render(<CardList data={SECONDARY_TITLE_MOCK} loading={false} />)

    expect(screen.queryByText('Oh No Data')).toBeNull()
    expect(screen.queryByText('Primary Title')).toBeFalsy()
    expect(screen.queryByText('Secondary Title')).toBeTruthy()
  })
})
