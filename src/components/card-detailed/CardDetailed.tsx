import { useLoaderData } from 'react-router'

import type { ValidResponseSingleCard } from '@/api/typeguard'

function CardDetailed() {
  const { record } = useLoaderData<ValidResponseSingleCard>()

  return (
    <div
      className='
        appear relative size-full h-fit max-h-200 cursor-pointer
        break-inside-avoid rounded-md-custom bg-white p-1 shadow-card
        transition-shadow duration-200
        hover:shadow-card-hover
      '
      title={record.dimensionsNote}
    >
      <div className='flex flex-col gap-1 p-1'>
        <div className='flex w-full cursor-default justify-center'>
          <img
            className='max-h-180 w-full object-contain py-10'
            src={`https://framemark.vam.ac.uk/collections/${record.images[0]}/full/full/0/default.jpg`}
            alt={record.dimensionsNote}
          />
        </div>

        <div className='flex justify-center p-2'>
          <h2 className='line-clamp-3 text-base-custom text-silver-font'>
            {record.briefDescription}
          </h2>
        </div>
      </div>
    </div>
  )
}

export { CardDetailed }
