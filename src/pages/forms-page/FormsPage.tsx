import { useState } from 'react'

import { BackLink } from '@/components/ui/back-link'
import { RHFForm } from '@/pages/forms-page/forms/RHFForm'
import { UncontrolledForm } from '@/pages/forms-page/forms/UncontrolledForm'
import { Modal } from '@/pages/forms-page/Modal'
import { useAppSelector } from '@/store'

function FormsPage() {
  const [show, setShow] = useState<null | 'uncontrolled' | 'rhf'>(null)
  const submissions = useAppSelector(state => state.submissions)

  return (
    <>
      <p className='absolute top-0 left-0'>{JSON.stringify(submissions)}</p>
      <BackLink />

      <button onClick={() => {
        setShow('uncontrolled')
      }}
      >
        open modal uncontrolled
      </button>

      <button onClick={() => {
        setShow('rhf')
      }}
      >
        open modal rhf
      </button>

      <Modal isOpen={!!show} onClose={() => setShow(null)}>
        { show === 'uncontrolled' && <UncontrolledForm onClick={() => setShow(null)} /> }
        { show === 'rhf' && <RHFForm onClick={() => setShow(null)} /> }
        {/* todo rhf form */}
      </Modal>

      {/* todo: there will be profile submissions list */}
    </>
  )
}

export { FormsPage }
