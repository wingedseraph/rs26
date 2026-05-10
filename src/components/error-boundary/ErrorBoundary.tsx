import { PureComponent } from 'react'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

type State = {
  hasError: boolean
}

export class ErrorBoundary extends PureComponent<
  Props,
  State
> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.warn(error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='p-4 flex items-center justify-center min-h-screen '>
          <h1>Something went wrong</h1>
        </div>
      )
    }

    return this.props.children
  }
}
