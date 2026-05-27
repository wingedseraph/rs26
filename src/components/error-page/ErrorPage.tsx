import { Link } from 'react-router'

import { IconArrow } from '@/components/ui/icon-arrow'
import { PATH } from '@/router'

export default function ErrorPage() {
  return (
    <>
      <div className='
        absolute top-0 z-10 flex items-center justify-between gap-x-2 bg-light
        p-2
        md:px-8 md:pt-6
      '
      >
        <Link
          viewTransition
          to={PATH.index}
          className='
            inline-block w-fit shrink-0 rounded-full bg-white p-1
            text-silver-icon shadow-cloud outline-hidden transition-colors
            hover:text-black-tisa
            data-focus-visible:ring-1 data-focus-visible:ring-black
          '
        >
          <IconArrow />
        </Link>
      </div>

      <div
        id='center'
        className='appear p-2 md:px-8 md:pt-6'
      >
        <h1 className='sm:text-8xl/30'>Something went wrong</h1>
      </div>
    </>
  )
}
