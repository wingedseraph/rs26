import { Outlet, useLocation, useNavigation, useOutlet } from 'react-router'

import { ErrorBoundary } from '@/components/error-boundary/ErrorBoundary'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utilities'

const baseStyle = 'mx-auto flex items-center justify-center gap-20'
const outletStyle = 'mx-0 w-screen flex-col md:mx-20 md:flex-row'
export const baseStyleDetailed = 'hidden transition-all duration-300'
export const outletStyleDetailed = 'flex w-full items-center justify-center md:relative md:w-1/2'

function Layout() {
  const outlet = useOutlet()
  const navigation = useNavigation()
  const location = useLocation()
  const isNavigating = Boolean(navigation.location)
  return (
    <ErrorBoundary key={location.key}>
      {isNavigating && (<Spinner />)}

      <div className={cn(baseStyle, { [outletStyle]: outlet })}>
        <Outlet />
      </div>
    </ErrorBoundary>
  )
}

export { Layout }
