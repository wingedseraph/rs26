import { Outlet, useNavigation } from 'react-router'

import { ErrorBoundary } from '@/components/error-boundary/ErrorBoundary'
import { Spinner } from '@/components/ui/spinner'

function Layout() {
  const navigation = useNavigation()
  const isNavigating = Boolean(navigation.location)
  return (
    <ErrorBoundary>
      {isNavigating && (
        <div className='appear fixed inset-0 z-50 backdrop-blur-md'>
          <div className='
            absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2
          '
          >
            <Spinner> Loading... </Spinner>
          </div>
        </div>
      )}

      <Outlet />
    </ErrorBoundary>
  )
}

export { Layout }
