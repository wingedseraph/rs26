import type { ComponentProps } from 'react'

import { Button } from '@/components/ui/button'
import { IconCheck } from '@/components/ui/icon-check'
import { IconPlus } from '@/components/ui/icon-plus'
import { cn } from '@/lib/utilities'

type CardListFooterProperties = {
  isSelected?: boolean
} & ComponentProps<'button'>

const baseStyle = 'h-7 hover:no-underline block relative w-full cursor-default justify-between overflow-hidden rounded-full border-silver-lighter-cloud bg-silver-lighter-cloud p-1 py-0.5 pl-2 text-sm font-medium text-stone-3 transition-transform hover:bg-stone-6 bg-silver-frost active:bg-silver-lighter-cloud'
const selectedStyle = ' button-animation active:bg-stone-5'

function CardListFooter({ onClick, isSelected, ...properties }: CardListFooterProperties) {
  return (
    <div className='flex-1'>
      <Button
        type='button'
        onClick={onClick}
        className={cn(baseStyle, {
          [selectedStyle]: isSelected,
        })}
        {...properties}
      >
        <span className='flex flex-row items-center justify-between gap-1'>
          {isSelected ? 'Saved' : 'Save'}
          {isSelected ? <IconCheck /> : <IconPlus /> }
        </span>
      </Button>
    </div>
  )
}
export { CardListFooter }
