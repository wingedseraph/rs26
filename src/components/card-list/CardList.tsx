import type { Card } from '@/api/api'

type Props = {
  data: Card[]
  loading: boolean
}

function CardList({ data, loading }: Props) {
  if (data.length === 0 && !loading) {
    return (
      <h2 className="appear">Oh No Data</h2>
    )
  }
  return (

    <div className="columns-2 md:columns-3 lg:columns-4 gap-6">
      {data.map(e => (
        <div className="break-inside-avoid appear" key={e.systemNumber} title={e._primaryTitle}>
          <p>
            {e._primaryTitle.length > 0 ? e._primaryTitle : e.objectType}
          </p>
          <img src={`${e._images._iiif_image_base_url}full/!600,600/0/default.jpg`} />
        </div>
      ))}
    </div>
  )
}

export { CardList }
