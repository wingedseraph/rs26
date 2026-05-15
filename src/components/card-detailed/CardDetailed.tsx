import { useParams } from 'react-router'

function CardDetailed() {
  const parameters = useParams()
  return (
    <h2>
      hey
      <pre>{JSON.stringify(parameters)}</pre>
    </h2>
  )
}

export { CardDetailed }
