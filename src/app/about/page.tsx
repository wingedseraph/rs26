import { BackLink } from '@/components/ui/back-link'
import { baseStyleLink } from '@/styles/styles'

const COURSE_LINK = 'https://rs.school/courses/reactjs'

export default function AboutPage() {
  return (
    <>
      <BackLink />

      <div id='center' className='appear p-2 md:px-8 md:pt-6'>
        <h1 className='sm:text-8xl/30'>Art enriches the soul, and that is what this project is all about</h1>

        <a
          className={baseStyleLink}
          href={COURSE_LINK}
          target='_blank'
          rel='noopener noreferrer'
        >
          try the course
        </a>
      </div>
    </>
  )
}
