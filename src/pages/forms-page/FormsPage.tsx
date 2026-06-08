import { useState } from 'react'

import { BackLink } from '@/components/ui/back-link'
import { Button } from '@/components/ui/button'
import { RHFForm } from '@/pages/forms-page/forms/RHFForm'
import { UncontrolledForm } from '@/pages/forms-page/forms/UncontrolledForm'
import { Modal } from '@/pages/forms-page/Modal'
import { SubmissionCard } from '@/pages/forms-page/SubmissionCard'
import { useAppSelector } from '@/store'

function FormsPage() {
  const [show, setShow] = useState<null | 'uncontrolled' | 'rhf'>(null)
  const submissions = useAppSelector(state => state.submissions)

  return (
    <>
      <BackLink />

      <div className='flex flex-col gap-4'>
        <div className='flex flex-row gap-40'>
          <Button
            className='text-2xl'
            onClick={() => {
              setShow('uncontrolled')
            }}
          >
            open modal uncontrolled
          </Button>

          <Button
            className='text-2xl'
            onClick={() => {
              setShow('rhf')
            }}
          >
            open modal rhf
          </Button>
        </div>

        <Modal isOpen={!!show} onClose={() => setShow(null)}>
          {show === 'uncontrolled' && <UncontrolledForm onSuccess={() => setShow(null)} />}
          {show === 'rhf' && <RHFForm onSuccess={() => setShow(null)} />}
        </Modal>

        {submissions.length > 0 && (
          <div className='mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {submissions.map(sub => (
              <SubmissionCard key={sub.id} {...sub} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export { FormsPage }
