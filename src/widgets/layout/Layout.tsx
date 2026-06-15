import { Outlet, useLocation, useNavigation } from 'react-router'

import { ErrorBoundary } from '@/components/error-boundary/ErrorBoundary'
import { Spinner } from '@/components/ui/spinner'

const baseStyle = 'mx-auto flex w-screen flex-col items-center justify-center gap-20 md:mx-20 md:flex-row'
export const baseStyleDetailed = 'hidden transition-all duration-300'
export const outletStyleDetailed = 'flex w-full items-center justify-center md:relative md:w-1/2'

function Layout() {
  const navigation = useNavigation()
  const location = useLocation()
  const isNavigating = Boolean(navigation.location)
  return (
    <ErrorBoundary key={location.key}>
      {isNavigating && (<Spinner />)}

      <div className={baseStyle}>
        <Outlet />
      </div>
    </ErrorBoundary>
  )
}

export { Layout }
