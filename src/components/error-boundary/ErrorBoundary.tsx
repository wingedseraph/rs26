import { PureComponent } from 'react'
import type { ReactNode } from 'react'

import ErrorPage from '@/components/error-page/ErrorPage'

type Properties = {
  key: string
  children: ReactNode
}

type State = {
  errorMessage: string
  hasError: boolean
}

export class ErrorBoundary extends PureComponent<
  Properties,
  State
> {
  constructor(properties: Properties) {
    super(properties)
    this.state = { errorMessage: '', hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.warn(error)
    this.setState({ errorMessage: error.stack ?? error.message })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <ErrorPage errorMessage={this.state.errorMessage} />
      )
    }

    return this.props.children
  }
}
