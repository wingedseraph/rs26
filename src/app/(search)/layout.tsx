import type { ReactNode } from 'react'

export default async function Layout({
  list,
  details,
}: {
  list: ReactNode
  details: ReactNode
}) {
  return (
    <>
      {list}
      {details}
    </>
  )
}
