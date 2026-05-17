import { Link } from 'react-router'

import { PATH } from '@/router'

function AboutPage() {
  return (
    <>
      <div className='
        sticky top-0 z-10 flex items-center justify-between gap-x-2 bg-light p-2
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
          <svg
            width='30'
            height='30'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 30 30'
            role='img'
            aria-label='Back'
            className='size-7 p-0.5'
          >
            <path d='M15.0445 6.6505c.5801.2717.7757.8817.883 1.4673.1822 1.243-.0415 2.7671.1339 4.0519.0326.2383.2239.4197.4617.4553.4337.0648.8678.1098 1.3091.0931 2.1737-.0652.8167.0055 2.9904-.0217.9564.0503 2.0337-.1861 2.8761.3288.6344.3722 1.2634.7619 1.2838 1.5444.0122.5461.1005 1.2607-.2785 1.705-.5231.6209-.9809.9725-1.8694.9806-2.2987.0462-1.0734-.0122-3.3721.0285-.8668.0218-1.7376-.038-2.603.0123-.3558-.0091-.5856.2767-.6859.5856a.4552.4552 0 0 0-.0198.1022c-.1177 1.3513.0859 2.9841-.1502 4.316-.0584.2772-.1209.6331-.36.8124-.6154.4973-1.4428.5666-2.1724.2976-.989-.3696-1.868-.9931-2.7062-1.6249-.7336-.5746-1.4496-1.1765-2.1262-1.8177-.8396-.7894-1.7158-1.5488-2.5215-2.3734-.542-.5611-.9523-1.2228-1.0692-2.0053-.0747-.6141-.1018-1.2091.2201-1.762.4932-.8654 1.3287-1.6113 2.027-2.3164.8817-.8926 1.8775-1.6493 2.7891-2.508.4891-.4632 1.0135-.8857 1.4985-1.3544.4334-.4157.8519-.7988 1.417-1.0298.629-.284 1.4156-.2106 2.0447.0326Z'></path>
          </svg>
        </Link>
      </div>

      <div
        id='center'
        className='
          appear p-2
          md:px-8 md:pt-6
        '
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
