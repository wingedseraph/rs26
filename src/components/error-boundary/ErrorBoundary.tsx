import { PureComponent } from 'react'
import type { ReactNode } from 'react'

import ErrorPage from '@/pages/error-page/ErrorPage'

type Properties = {
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
    this.setState({ errorMessage: error.message })
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
