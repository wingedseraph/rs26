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
    <div className='
      columns-2 gap-6
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
          <div className='flex flex-col gap-1 p-1'>
            <div className='flex w-full cursor-default justify-center'>
              <img
                className='
                  max-h-60 w-full cursor-zoom-in rounded-xs transition-opacity
                  duration-150
                  hover:opacity-[0.92]
                '
                src={`${element._images._iiif_image_base_url}full/!600,600/0/default.jpg`}
              />
            </div>

            <div className='flex items-center justify-center p-2'>
              <h2 className='line-clamp-3 text-base-custom text-silver-font'>
                {element._primaryTitle.length > 0 ? element._primaryTitle : element.objectType}
              </h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export { CardList }
