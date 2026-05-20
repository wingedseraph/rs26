import { Link } from 'react-router'

import type { Card } from '@/api/typeguard'

type CardListProperties = {
  data: Card[]
  page: number
}

function CardList({ data, page }: CardListProperties) {
  if (data.length === 0) {
    return (
      <h2 className='appear'>Oh No Data</h2>
    )
  }
  return (
    <div className='
      columns-2 gap-6 pt-10
      md:columns-3
    '
    >
      {data.map(element => (
        <div
          className='
            appear relative my-10 w-full cursor-pointer break-inside-avoid
            rounded-md-custom bg-white p-1 shadow-card transition-shadow
            duration-200
            hover:shadow-card-hover
          '
          key={element.systemNumber}
          title={element._primaryTitle}
        >
          <Link viewTransition to={{ pathname: `card/${element.systemNumber}`, search: `page=${page}` }}>
            <div className='flex flex-col gap-1 p-1'>
              <div className='flex w-full cursor-default justify-center'>
                <img
                  className='
                    max-h-40 w-full cursor-zoom-in rounded-xs object-contain
                    transition-opacity duration-150
                    hover:opacity-[0.92]
                  '
                  src={`${element._images._iiif_image_base_url}full/!600,600/0/default.jpg`}
                  alt={element.objectType}
                />
              </div>

              <div className='flex items-center justify-center p-2'>
                <h2 className='line-clamp-3 text-base-custom text-silver-font'>
                  {element._primaryTitle.length > 0 ? element._primaryTitle : element.objectType}
                </h2>
              </div>

            </div>
          </Link>

          <div className='flex-1'>
            <button
              type='button'
              className='
                relative w-full cursor-default justify-between overflow-hidden
                rounded-full border-silver-lighter-cloud bg-silver-lighter-cloud
                p-1 py-0.5 pl-2 text-sm font-medium text-stone-3
                transition-transform duration-100
                hover:bg-stone-6
                active:scale-97 active:bg-silver-lighter-cloud
              '
              aria-haspopup='dialog'
              aria-expanded='false'
            >
              <span className='
                flex scale-100 flex-row items-center justify-between gap-1
                opacity-100 transition-[transform,opacity] duration-200 ease-out
              '
              >
                Select
                <svg
                  width='30'
                  height='30'
                  fill='currentColor'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 30 30'
                  className='h-5 w-5 p-0.5 text-[#B1B1B0]'
                >
                  <path d='M14.6 2.67c1.08-.2 1.98 1.08 2.11 2.03.16 2.38-.37 5 .09 7.36.02.11.03.17.07.24.03.05.09.12.13.15.07.05.11.06.2.09.4.13.81.14 1.24.15 2.22.04 4.45-.1 6.66 0 .73.02 1.36.33 1.7 1 .51 1 .02 2.31-1.1 2.62-2.64.72-5.6.05-8.26.56a.7.7 0 0 0-.18.05.6.6 0 0 0-.13.1l-.1.11c-.55.88-.4 2.2-.38 3.17.04 1.9.4 3.96.04 5.83l-.02.06-.01.04-.02.04c-.7 1.55-3.08 1.42-3.5-.29-.37-2.56-.3-5.21-.45-7.8-.01-.76-.5-1.48-1.3-1.53-2.32-.12-4.84.41-7.15.04a.66.66 0 0 1-.1-.02l-.03-.01c-1.59-.62-1.44-3.02.25-3.42 2.41-.41 4.94-.31 7.38-.53.29-.05.83-.21.88-.56l-.04.3c0-.02 0 0 0 0l.06-.43c.32-2.43-.08-4.98.28-7.42.17-.93.65-1.8 1.67-1.93Z'></path>
                </svg>
              </span>

              <span className='
                absolute inset-0 flex scale-60 items-center justify-center
                opacity-0 transition-[transform,opacity] duration-200 ease-out
              '
              >
                <svg
                  width='30'
                  height='30'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 36 36'
                  className='h-3 w-3 animate-spin'
                >
                  <circle
                    cx='18'
                    cy='18'
                    r='15'
                    stroke-width='5'
                    className='text-silver-font/25'
                    stroke='currentColor'
                  >
                  </circle>

                  <path
                    stroke-linecap='round'
                    stroke-width='5'
                    d='M3 18A15 15 0 0 1 18 3'
                    className='text-silver-font'
                    stroke='currentColor'
                  >
                  </path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export { CardList }
