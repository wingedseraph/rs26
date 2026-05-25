import { useRef } from 'react'
import { useSelector } from 'react-redux'

import type { RootState } from '@/store'

import { cardToCsv } from '@/lib/cardToCsv'
import { removeAll, useAppDispatch } from '@/store'

function Flyout() {
  const dispatch = useAppDispatch()
  const selectedCards = useSelector((state: RootState) => state.selectedCards)
  const downloadLinkRef = useRef<HTMLAnchorElement>(null)

  const downloadBlob = () => {
    if (downloadLinkRef.current && Object.keys(selectedCards).length > 0) {
      const array = Object.values(selectedCards)
      const csv = cardToCsv(array)
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)

      downloadLinkRef.current.href = url
      downloadLinkRef.current.setAttribute('download', `${array.length} selected cards.csv`)
      downloadLinkRef.current.click()

      setTimeout(() =>
        URL.revokeObjectURL(url), 100)
    }
  }

  return (
    <div className='fixed top-0 left-0 flex flex-col items-center gap-2'>
      <p>
        Selected cards:
        {' '}
        {Object.keys(selectedCards).length}
      </p>

      <button onClick={() => dispatch(removeAll())}>Unselect all</button>

      <button onClick={downloadBlob}>
        Download
        <a aria-label='download' aria-hidden={true} href='/' ref={downloadLinkRef}></a>
      </button>

      {(Object.keys(selectedCards)).map(element => (
        <p key={element}>
          {element}
        </p>
      ))}
    </div>
  )
}

export { Flyout }
