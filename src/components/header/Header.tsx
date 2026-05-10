import type { ChangeEvent, SyntheticEvent } from 'react'

import { Input } from '@/components/ui/input'

type Props = {
  getImages: (e: SyntheticEvent | null) => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  query: string
  loading: boolean
}

function Header({ getImages, onChange, query, loading }: Props) {
  return (
    <form onSubmit={getImages} className="flex items-center flex-row justify-between w-full gap-10">
      <h1>
        Hello!
      </h1>
      <div className="flex flex-row justify-between items-center w-full">
        <Input type="text" value={query} placeholder="Search..." onChange={onChange} disabled={loading} />
      </div>
    </form>

  )
}

export { Header }
