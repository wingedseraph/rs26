import { useSearchParams } from 'react-router'

export function usePage() {
  const [searchParameters] = useSearchParams()
  const pageParameters = searchParameters.get('page') ?? '1'
  const page = Number(pageParameters) > 0 ? pageParameters : '1'

  return page
}
