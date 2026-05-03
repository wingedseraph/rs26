import { PureComponent } from 'react'
import type { ChangeEvent } from 'react'

import { getQueryImages } from '@/api/api'
import { Card } from '@/components/card-list/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type State = {
  loading: boolean
  query: string
  res: {
    title: string
    img: string
  }
}

export class App extends PureComponent<unknown, State> {
  state: State = {
    loading: false,
    query: '',
    res: { title: '', img: '' },
  }

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      query: e.target.value,
    })
  }

  getImages = async () => {
    // todo: try/catch, finnally - loading false

    this.setState({ loading: true })
    const r = await getQueryImages(this.state.query.trim())
    this.setState({ loading: false })
    console.log(r.records[0])
    this.setState({
      res: { title: r.records[0]._primaryTitle, img: r.records[0]._images._iiif_image_base_url },
    })
  }

  render() {
    return (
      <div id="center">
        <Input type="text" className="text-2xl max-w-100" value={this.state.query} onChange={this.onChange} />
        <Button disabled={this.state.loading} onClick={this.getImages}>Submit</Button>
        {this.state.res.title && <Card title={this.state.res.title} img={`${this.state.res.img}full/!600,600/0/default.jpg`} />}
      </div>
    )
  }
}
