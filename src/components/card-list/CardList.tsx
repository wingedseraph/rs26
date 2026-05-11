import type { Card } from '@/api/api'

type Properties = {
  data: Card[]
  loading: boolean
}

function CardList({ data, loading }: Properties) {
  if (data.length === 0 && !loading) {
    return (
      <h2 className='appear'>Oh No Data</h2>
    )
  }
  return (
    <div className='columns-2 md:columns-3 lg:columns-4 gap-6'>
      {data.map(element => (
        <div className='my-10 break-inside-avoid appear relative w-full rounded-md-custom bg-white p-1 shadow-card transition-shadow duration-200 hover:shadow-card-hover cursor-pointer' key={element.systemNumber} title={element._primaryTitle}>
          <div className='flex flex-col gap-1 p-1'>
            <div className='flex justify-center w-full cursor-default'>
              <img className='w-full max-h-60 rounded-xs cursor-zoom-in transition-opacity duration-150 hover:opacity-[0.92]' src={`${element._images._iiif_image_base_url}full/!600,600/0/default.jpg`} />
            </div>
            <div className='flex items-center justify-center p-2'><h2 className='text-silver-font text-base-custom line-clamp-3'>{element._primaryTitle.length > 0 ? element._primaryTitle : element.objectType}</h2></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export { CardList }
