import { PureComponent } from 'react'
import type { ChangeEvent, SyntheticEvent } from 'react'

import { getQueryImages } from '@/api/api'
import { Card } from '@/components/card-list/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type State = {
  loading: boolean
  query: string
  error: string
  res: {
    title: string
    img: string
  }
}

export class App extends PureComponent<unknown, State> {
  state: State = {
    loading: false,
    error: '',
    query: '',
    res: { title: '', img: '' },
  }

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      query: e.target.value,
    })
  }

  getImages = async (e: SyntheticEvent) => {
    e.preventDefault()

    try {
      this.setState({ loading: true })
      const r = await getQueryImages(this.state.query.trim())
      console.log(r)
      this.setState({
        res: { title: r.records[0]._primaryTitle, img: r.records[0]._images._iiif_image_base_url },
      })
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
      this.setState({ loading: false })
    }
  }

  render() {
    // fix: decomposition to use header(widget?), card-list
    return (
      <div id="center">
        <form onSubmit={this.getImages}>
          <Input type="text" className="text-2xl max-w-100" value={this.state.query} onChange={this.onChange} />
          <Button type="submit" disabled={this.state.loading}>Submit</Button>
        </form>
        {this.state.res.title && <Card title={this.state.res.title} img={`${this.state.res.img}full/!600,600/0/default.jpg`} />}
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
