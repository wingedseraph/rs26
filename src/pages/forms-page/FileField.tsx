import { useRef, useState } from 'react'
import type { ChangeEvent, ComponentProps } from 'react'

import { toBase64 } from '@/lib/base64'
import { cn } from '@/lib/utilities'

type FileFieldProperties = {
  hint?: string[] | string
} & ComponentProps<'input'>

function FileField({ hint, ...properties }: FileFieldProperties) {
  const { onChange: rhfOnChange, ref: rhfRef, ...rest } = properties

  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<{ name: string, size: number, source: string } | null>(null)

  const callbackRef = (node: HTMLInputElement) => {
    inputRef.current = node

    if (typeof rhfRef === 'function') {
      rhfRef(node)
    }
  }

  const onChange = async (event_: ChangeEvent<HTMLInputElement>) => {
    if (rhfOnChange) {
      rhfOnChange(event_)
    }

    const fileList = event_.target.files
    if (fileList) {
      const firstFile = fileList[0]
      const base64 = await toBase64(firstFile)
      setFile({
        name: firstFile.name,
        size: firstFile.size,
        source: String(base64),
      })
    }
  }

  return (
    <div className='form-card shadow-card'>
      <span className='form-card-label'>Profile Picture</span>

      <label className='file-btn'>
        <svg width='16' height='16' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
          <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
          <polyline points='17 8 12 3 7 8' />
          <line x1='12' y1='3' x2='12' y2='15' />
        </svg>
        Choose File

        <input
          type='file'
          id='profileImage'
          accept='.png,.jpg,.jpeg'
          className='invisible'
          onChange={onChange}
          ref={callbackRef}
          {...rest}
        />

      </label>

      {/* todo: display image there */}
      {file && (
        <div className='file-preview'>
          <img
            className='h-12 w-12 rounded-lg bg-stone-6 object-cover'
            src={file.source}
            alt='Preview'
          />

          <div className='min-w-0 flex-1'>
            <span className='block truncate text-[13px] font-medium text-stone-2'>{file.name}</span>

            <span className='text-[11px] text-stone-4'>
              {file.size}
              {' '}
              Bytes
            </span>
          </div>

          <button
            onClick={() => {
              setFile(null)
              if (inputRef.current) {
                inputRef.current.value = ''
              }
            }}
            type='button'
            aria-label='Remove'
            className='file-remove'
          >
            {/* todo as icon component */}
            <svg width='16' height='16' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
              <line x1='18' y1='6' x2='6' y2='18' />
              <line x1='6' y1='6' x2='18' y2='18' />
            </svg>
          </button>
        </div>
      )}

      <div className={cn('collapsible', { collapsed: !hint })}>
        <span className='form-card-hint'>{hint}</span>
      </div>

    </div>
  )
}

export { FileField }
