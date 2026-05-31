import { useParams } from 'react-router'

import { skipToken } from '@reduxjs/toolkit/query'

import { useGetArtworkByIdQuery } from '@/api/services/artwork'

const cardBaseStyle = `
  appear relative size-full h-fit max-h-200 cursor-pointer break-inside-avoid rounded-md-custom bg-white p-1 shadow-card
  transition-shadow duration-200
  hover:shadow-card-hover
`

function CardDetailed() {
  const parameters = useParams<{ id: string }>()
  const { data, isLoading, isError } = useGetArtworkByIdQuery(parameters.id ?? skipToken)

  if (isLoading) {
    return <span>Loading</span>
  }

  if (!data || isError || !data.record) {
    return <h2>no data</h2>
  }

  return (
    <div
      className={cardBaseStyle}
      title={data.record.dimensionsNote}
    >
      <div className='flex flex-col gap-1 p-1'>
        <div className='flex w-full cursor-default justify-center'>
          <img
            className='max-h-180 w-full object-contain py-10'
            src={`https://framemark.vam.ac.uk/collections/${data.record.images[0]}/full/full/0/default.jpg`}
            alt={data.record.dimensionsNote}
          />
        </div>

        <div className='flex justify-center p-2'>
          <h2 className='line-clamp-3 text-base-custom text-silver-font'>
            {data.record.briefDescription}
          </h2>
        </div>
      </div>
    </div>
  )
}

export { CardDetailed }
