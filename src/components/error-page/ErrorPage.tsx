import { BackLink } from '@/components/back-link/BackLink'

type ErrorPageProperties = {
  errorMessage?: string
}

export default function ErrorPage({ errorMessage }: ErrorPageProperties) {
  return (
    <>
      <BackLink />

      <div
        id='center'
        className='appear p-2 md:px-8 md:pt-6'
      >
        <h1 className='sm:text-8xl/30'>Something went wrong</h1>
        {errorMessage && <span>{errorMessage}</span>}
      </div>
    </>
  )
}
