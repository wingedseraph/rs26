import { PureComponent } from 'react'
import type { ChangeEvent, SyntheticEvent } from 'react'

import { Input } from '@/components/ui/input'

type Props = {
  getImages: (e: SyntheticEvent | null) => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  query: string
  loading: boolean
}

class Header extends PureComponent<Props, unknown> {
  render() {
    return (
      <form onSubmit={this.props.getImages} className="flex items-center flex-row justify-between w-full gap-10">
        <h1>
          Hello!
        </h1>
        <div className="flex flex-row justify-between items-center w-full">
          <Input type="text" value={this.props.query} placeholder="Search..." onChange={this.props.onChange} disabled={this.props.loading} />
        </div>
      </form>

    )
  }
}

export { Header }
