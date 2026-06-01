import { Link } from 'react-router'

import { IconArrowBold } from '@/components/ui/icon-arrow-bold'
import { PATH } from '@/router'

function BackLink() {
  return (
    <div className='absolute top-0 left-0 z-10 flex items-center justify-between gap-x-2 bg-light p-2 md:px-8 md:pt-6'>
      <Link
        viewTransition
        to={PATH.index}
        className='
          inline-block w-fit shrink-0 rounded-full bg-white p-1 text-silver-icon shadow-cloud outline-hidden
          transition-colors
          hover:text-black-tisa
          focus-visible:ring-1 focus-visible:ring-black
        '
      >
        <IconArrowBold />
      </Link>
    </div>
  )
}
export { BackLink }
