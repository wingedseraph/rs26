import type { LoaderFunctionArgs } from 'react-router'
import { redirect } from 'react-router'

import { getByIdArtwork, getByQueryArtwork } from '@/api/api'
import { STORAGE } from '@/api/localStorage'

async function loaderGetAllCards({ request }: LoaderFunctionArgs) {
  const query = localStorage.getItem(STORAGE) ?? ''
  const parameters = new URL(request.url.toString()).searchParams
  if (parameters.get('page') === null) {
    return redirect('?page=1')
  }
  const page = Number(parameters.get('page'))
  const nonNegativePage = page > 0 ? page : 1
  const result = await getByQueryArtwork(query, nonNegativePage)
  return result
}
async function loaderGetOneCard({ params }: LoaderFunctionArgs) {
  if (params.id != null) {
    const result = await getByIdArtwork(params.id)
    return result
  }
}

export { loaderGetAllCards, loaderGetOneCard }
