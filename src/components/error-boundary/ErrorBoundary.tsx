import { PureComponent } from 'react'
import type { ReactNode } from 'react'

import ErrorPage from '@/components/error-page/ErrorPage'

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
        <ErrorPage />
      )
    }

    return this.props.children
  }
}
