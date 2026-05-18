import { Link } from 'react-router'

type PaginationProperties = {
  page: number
}

function Pagination({ page }: PaginationProperties) {
  return (
    <div
      className='
        mx-auto mt-6 max-w-50 rounded-lg bg-light p-2
        shadow-[0px_2px_10px_0px_rgba(149,156,166,0.25)]
      '
      aria-hidden='false'

    >
      <nav className='flex items-center gap-x-2'>
        <Link
          to={{ search: `page=${page - 1}` }}
          className={`
            flex flex-1 items-center justify-center rounded-md px-2 py-1
            text-silver-icon shadow-cloud outline-hidden transition-colors
            focus-visible:ring-1 focus-visible:ring-black
            md:p-2
            ${page === 1 ? 'pointer-events-none bg-stone-6' : 'bg-white'}
          `}
        >
          <svg
            width='30'
            height='30'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 30 30'
            className='size-7 rotate-90 cursor-pointer p-0.5 text-black-tisa'
          >
            <path d='M20.64 9.787c1.078-.317 2.22.436 2.345 1.552.105.786-.343 1.339-.731 1.964-1.113 1.657-2.117 3.354-3.285 4.982-.787.95-1.504 1.821-2.805 1.998-3.081.097-5.39-2.889-7.121-5.44-.517-.74-1.111-1.416-1.671-2.122-.358-.588-.555-1.42-.135-2.03.473-.797 1.685-.818 2.416-.423 1.266.822 2.125 2.286 3.102 3.445.583.827 1.266 1.569 1.878 2.371.112.148.28.243.465.257a.645.645 0 0 0 .554-.245c.292-.368.597-.725.909-1.077.86-.985 1.41-2.08 2.177-3.168.493-.734.965-1.831 1.902-2.064Z'></path>
          </svg>
        </Link>

        <button className='
          flex h-11 w-12.25 flex-1 cursor-pointer items-center justify-center
          rounded-md bg-white px-2 py-1 font-extrabold text-black-tisa
          shadow-cloud outline-hidden transition-colors
          focus-visible:ring-1 focus-visible:ring-black
          md:p-2
        '
        >
          {page}
        </button>

        <Link
          to={{ search: `page=${page + 1}` }}
          className='
            flex flex-1 cursor-pointer items-center justify-center rounded-md
            bg-white px-2 py-1 text-black-tisa shadow-cloud outline-hidden
            transition-colors
            focus-visible:ring-1 focus-visible:ring-black
            md:p-2
          '
        >
          <svg
            width='30'
            height='30'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 30 30'
            className='size-7 -rotate-90 p-0.5 text-black-tisa'
          >
            <path d='M20.64 9.787c1.078-.317 2.22.436 2.345 1.552.105.786-.343 1.339-.731 1.964-1.113 1.657-2.117 3.354-3.285 4.982-.787.95-1.504 1.821-2.805 1.998-3.081.097-5.39-2.889-7.121-5.44-.517-.74-1.111-1.416-1.671-2.122-.358-.588-.555-1.42-.135-2.03.473-.797 1.685-.818 2.416-.423 1.266.822 2.125 2.286 3.102 3.445.583.827 1.266 1.569 1.878 2.371.112.148.28.243.465.257a.645.645 0 0 0 .554-.245c.292-.368.597-.725.909-1.077.86-.985 1.41-2.08 2.177-3.168.493-.734.965-1.831 1.902-2.064Z'></path>
          </svg>
        </Link>
      </nav>
    </div>
  )
}

export { Pagination }
