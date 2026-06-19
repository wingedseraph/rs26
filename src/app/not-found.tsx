import { BackLink } from '@/components/ui/back-link'

export default function ErrorPage() {
  return (
    <>
      <BackLink />

      <div
        id='center'
        className='appear p-2 md:px-8 md:pt-6'
      >
        <h1 className='sm:text-8xl/30'>Oops! We can't find that page</h1>
      </div>
    </>
  )
}
