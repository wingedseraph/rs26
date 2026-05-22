import type { ComponentProps } from 'react'

type CardListFooterProperties = {
  isSelected?: boolean
} & ComponentProps<'button'>

function CardListFooter({ onClick, isSelected, ...properties }: CardListFooterProperties) {
  if (isSelected) {
    return (
      <div className='flex-1'>
        <button
          type='button'
          onClick={onClick}
          className='
            button-animation relative w-full cursor-default justify-between
            overflow-hidden rounded-full border-silver-lighter-cloud
            bg-silver-lighter-cloud p-1 py-0.5 pl-2 text-sm font-medium
            text-stone-3 transition-transform
            hover:bg-stone-6
            active:bg-silver-lighter-cloud
          '
          aria-haspopup='dialog'
          aria-expanded='false'
          {...properties}
        >
          <span className='
            flex scale-100 flex-row items-center justify-between gap-1
            opacity-100 transition-[transform,opacity]
          '
          >
            Saved
            <svg
              width='30'
              height='30'
              fill='currentColor'
              stroke='currentColor'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 30 30'
              className='h-5 w-5 p-0.5 text-[#B1B1B0]'
            >
              <path stroke-width='.2' d='M18.3571 19.1987c1.0989-1.9278 3.9581-6.7302 5.1364-8.6129l.0426-.0773c.198-.3583.422-.7637.443-1.1716l-5.622 9.8618Zm0 0a158.273 158.273 0 0 0-.2047.3587m.2047-.3587-.2047.3587m0 0c-.46.8078-.928 1.6297-1.4935 2.3609l1.4935-2.3609ZM24.079 9.342v-.0003c.002-.0411.0042-.0823.0064-.1234.0272-.5096.0541-1.0147-.2817-1.495-.3103-.5422-.8553-.7984-1.4529-.8194-.5353-.037-.9603.1947-1.3777.439-.439.2487-.7524.7135-1.0119 1.0986l-.0051.0075-.002.003c-.8091 1.2998-2.0826 3.5543-3.3155 5.7369-.8316 1.4724-1.6448 2.912-2.2845 4.0038-.0807.1377-.1379.2351-.1887.306-.0502.0702-.0875.1047-.1241.1239a.3507.3507 0 0 1-.2505.0284c-.0398-.0105-.0842-.036-.1497-.094-.0661-.0585-.1447-.1418-.2555-.2595-.9711-1.0305-2.4572-2.5985-3.1251-3.2693-.8307-.8344-1.5266-1.2051-2.077-1.22-.2785-.0075-.517.0764-.7098.2333-.1913.1557-.3324.379-.4266.6438-.188.5282-.1954 1.2386-.0246 1.9769.1711.74.5233 1.5171 1.0657 2.1809l.0004.0004c.4266.5156 1.2026 1.3343 2.0082 2.1199.8048.7849 1.6459 1.5433 2.2024 1.9354l-.0001.0001.0041.0026c.4132.2619.9361.5847 1.4748.5973h.0008l.1145.0021c.4022.0078.8123.0158 1.216-.1595l.0012-.0005c.6747-.3035 1.1851-.7948 1.6272-1.361l.0003-.0004c.5701-.7372 1.042-1.5659 1.5016-2.3731.0683-.1199.1363-.2393.2043-.3579l.0001-.0002c1.0982-1.9268 3.9567-6.728 5.1342-8.6095l.0002.0001.0027-.005.0447-.081c.1956-.3534.4309-.7787.4532-1.2109Z'></path>
            </svg>
          </span>

          <span className='
            absolute inset-0 flex scale-60 items-center justify-center opacity-0
            transition-[transform,opacity]
          '
          >
            <svg
              width='30'
              height='30'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 36 36'
              className='h-3 w-3 animate-spin'
            >
              <circle
                cx='18'
                cy='18'
                r='15'
                strokeWidth='5'
                className='text-silver-font/25'
                stroke='currentColor'
              >
              </circle>

              <path
                strokeLinecap='round'
                strokeWidth='5'
                d='M3 18A15 15 0 0 1 18 3'
                className='text-silver-font'
                stroke='currentColor'
              >
              </path>
            </svg>
          </span>
        </button>
      </div>

    )
  }
  return (
    <div className='flex-1'>
      <button
        type='button'
        onClick={onClick}
        className='
          relative w-full cursor-default justify-between overflow-hidden
          rounded-full border-silver-lighter-cloud bg-silver-frost p-1 py-0.5
          pl-2 text-sm font-medium text-stone-3 transition-transform
          hover:bg-stone-6
          active:bg-silver-lighter-cloud
        '
        aria-haspopup='dialog'
        aria-expanded='false'
        {...properties}
      >
        <span className='
          flex scale-100 flex-row items-center justify-between gap-1 opacity-100
          transition-[transform,opacity]
        '
        >
          Save
          <svg
            width='30'
            height='30'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 30 30'
            className='h-5 w-5 p-0.5 text-[#B1B1B0]'
          >
            <path d='M14.6 2.67c1.08-.2 1.98 1.08 2.11 2.03.16 2.38-.37 5 .09 7.36.02.11.03.17.07.24.03.05.09.12.13.15.07.05.11.06.2.09.4.13.81.14 1.24.15 2.22.04 4.45-.1 6.66 0 .73.02 1.36.33 1.7 1 .51 1 .02 2.31-1.1 2.62-2.64.72-5.6.05-8.26.56a.7.7 0 0 0-.18.05.6.6 0 0 0-.13.1l-.1.11c-.55.88-.4 2.2-.38 3.17.04 1.9.4 3.96.04 5.83l-.02.06-.01.04-.02.04c-.7 1.55-3.08 1.42-3.5-.29-.37-2.56-.3-5.21-.45-7.8-.01-.76-.5-1.48-1.3-1.53-2.32-.12-4.84.41-7.15.04a.66.66 0 0 1-.1-.02l-.03-.01c-1.59-.62-1.44-3.02.25-3.42 2.41-.41 4.94-.31 7.38-.53.29-.05.83-.21.88-.56l-.04.3c0-.02 0 0 0 0l.06-.43c.32-2.43-.08-4.98.28-7.42.17-.93.65-1.8 1.67-1.93Z'></path>
          </svg>
        </span>

        <span className='
          absolute inset-0 flex scale-60 items-center justify-center opacity-0
          transition-[transform,opacity]
        '
        >
          <svg
            width='30'
            height='30'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 36 36'
            className='h-3 w-3 animate-spin'
          >
            <circle
              cx='18'
              cy='18'
              r='15'
              strokeWidth='5'
              className='text-silver-font/25'
              stroke='currentColor'
            >
            </circle>

            <path
              strokeLinecap='round'
              strokeWidth='5'
              d='M3 18A15 15 0 0 1 18 3'
              className='text-silver-font'
              stroke='currentColor'
            >
            </path>
          </svg>
        </span>
      </button>
    </div>
  )
}
export { CardListFooter }
