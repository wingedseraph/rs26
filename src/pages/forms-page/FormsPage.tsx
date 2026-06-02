import { BackLink } from '@/components/ui/back-link'

export const baseStyleLink = `
  group relative overflow-hidden rounded-md bg-stone-6 pt-4 pr-7 pb-5 pl-8 text-cta-about outline-hidden
  transition-colors
  hover:bg-stone-1 hover:text-stone-6
  focus-visible:ring-1 focus-visible:ring-black
  lg:rounded-lg lg:px-14 lg:pt-6 lg:pb-7
`

function FormsPage() {
  return (
    <>
      <BackLink />

      <div id='center' className='appear p-2 md:px-8 md:pt-6'>
        <h1 className='sm:text-8xl/30'>Forms</h1>

      </div>
    </>
  )
}

export { FormsPage }
