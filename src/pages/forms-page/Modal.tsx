import { useEffect, useRef } from 'react'
import type { ComponentProps, ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { cn } from '@/lib/utilities'

type ModalProperties = {
  isOpen: boolean
  children: ReactNode
} & ComponentProps<'dialog'>

function Modal({ isOpen, children, className, ...properties }: ModalProperties) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (dialogRef.current) {
      if (isOpen) {
        dialogRef.current.showModal()
      }
      if (!isOpen) {
        dialogRef.current.close()
      }
    }
  }, [isOpen])

  return (
    <>
      {createPortal(
        <dialog
          className={cn('m-auto appear rounded-3xl bg-silver-frost p-10 shadow-card xl:p-10 xl:px-8 xl:pb-20', className)}
          ref={dialogRef}
          closedby='any'
          {...properties}
        >
          {children}
        </dialog>,
        document.body,
      )}
    </>
  )
}
export { Modal }
