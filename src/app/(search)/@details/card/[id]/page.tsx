import { getByIdArtwork } from '@/api/artwork'
import { baseCardStyle } from '@/styles/styles'

export default async function CardDetailedPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const data = await getByIdArtwork(id)

  if (!data) {
    return <h2>Failed to load artwork</h2>
  }

  return (
    <div
      className={baseCardStyle}
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
          <h2 className='line-clamp-3 text-base-custom text-stone-3'>
            {data.record.briefDescription}
          </h2>
        </div>
      </div>
    </div>
  )
}
