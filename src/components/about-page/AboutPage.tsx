import { Link } from 'react-router'

import { IconArrow } from '@/components/ui/icon-arrow'
import { PATH } from '@/router'

function AboutPage() {
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
        <h1 className='sm:text-8xl/30'>Art enriches the soul, and that is what this project is all about</h1>

        <a
          className='
            group text-cta-about relative overflow-hidden rounded-md bg-stone-6
            pt-4 pr-7 pb-5 pl-8 outline-hidden transition-colors
            hover:bg-stone-1 hover:text-stone-6
            focus-visible:ring-1 focus-visible:ring-black
            lg:rounded-lg lg:px-14 lg:pt-6 lg:pb-7
          '
          href='https://rs.school/courses/reactjs'
          target='_blank'
          rel='noopener noreferrer'
        >
          try the course
        </a>
      </div>
    </>
  )
}

export { AboutPage }
