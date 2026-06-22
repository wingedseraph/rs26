import type { ComponentProps } from 'react'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { IconCheck } from '@/components/ui/icon-check'
import { IconPlus } from '@/components/ui/icon-plus'
import { cn } from '@/lib/utilities'

type CardListFooterProperties = {
  isSelected?: boolean
} & ComponentProps<'button'>

const baseStyle = `
  relative block h-7 w-full cursor-pointer justify-between overflow-hidden rounded-full border-silver-lighter-cloud
  bg-silver-frost p-1 py-0.5 pl-2 text-sm font-medium text-stone-3 transition-transform
  hover:bg-stone-6 hover:no-underline
  active:bg-silver-lighter-cloud
`
const selectedStyle = 'button-animation active:bg-silver-lighter-cloud'

function CardListFooter({ onClick, isSelected, ...properties }: CardListFooterProperties) {
  const t = useTranslations('CardList')

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
        <span className='flex flex-row items-center justify-between gap-1 text-stone-3'>
          {isSelected ? t('saved') : t('save')}
          {isSelected ? <IconCheck /> : <IconPlus />}
        </span>
      </Button>
    </div>
  )
}
export { CardListFooter }
