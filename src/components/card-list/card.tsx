import { PureComponent } from 'react'

type Props = {
  title: string
  img: string
}

class Card extends PureComponent<Props, unknown> {
  render() {
    const { title, img } = this.props

    return (
      // todo style: div, p, img
      <div>
        <p>
          {title}
        </p>
        <img src={img} />
      </div>
    )
  }
}

export { Card }
