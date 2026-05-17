import { PureComponent } from 'react'
import type { ReactNode } from 'react'

type Properties = {
  children: ReactNode
}

type State = {
  hasError: boolean
}

export class ErrorBoundary extends PureComponent<
  Properties,
  State
> {
  constructor(properties: Properties) {
    super(properties)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.warn(error)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className='flex min-h-screen items-center justify-center p-4'>
          <h1>Something went wrong</h1>
        </div>
      )
    }

    return this.props.children
  }
}
