import { PureComponent } from 'react'
import type { ChangeEvent, SyntheticEvent } from 'react'

import type { Card as CardType } from '@/api/api'

import { getQueryImages } from '@/api/api'
import { CardList } from '@/components/card-list/CardList'
import { Header } from '@/components/header/Header'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

type State = {
  loading: boolean
  query: string
  error: string
  res: CardType[]
  throwError: boolean
}

const STORAGE = 'wingedquery' as const

export class App extends PureComponent<unknown, State> {
  state: State = {
    loading: false,
    error: '',
    query: localStorage.getItem(STORAGE) ?? '',
    res: [],
    throwError: false,
  }

  componentDidMount() { this.getImages(null) }

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      query: e.target.value,
    })
  }

  getImages = async (e: SyntheticEvent | null) => {
    if (e !== null) {
      e.preventDefault()

      if (localStorage.getItem(STORAGE) === this.state.query) {
        return
      }
    }

    try {
      localStorage.setItem(STORAGE, this.state.query)
      this.setState({ loading: true })
      const r = await getQueryImages(this.state.query.trim())

      this.setState({ res: r })
      this.setState({ error: '' })
    }
    catch (e) {
      if (e instanceof Error) {
        this.setState({
          error: e.message,
        })
      }
      console.warn(e)
    }
    finally {
      setTimeout(() => this.setState({ loading: false }), 500)
    }
  }

  simulateError = () => { this.setState({ throwError: true }) }

  render() {
    if (this.state.throwError) {
      throw new Error('ErrorBoundary')
    }

    return (
      <div id="center" className="p-20">

        <Header getImages={this.getImages} onChange={this.onChange} query={this.state.query} loading={this.state.loading} />
        <Button onClick={this.simulateError}>Simulate Error</Button>
        <CardList data={this.state.res} loading={this.state.loading} />
        {this.state.loading && <Spinner> Loading... </Spinner>}
        {this.state.error && (
          <p>
            Issue:
            {this.state.error}
          </p>
        )}

      </div>
    )
  }
}
