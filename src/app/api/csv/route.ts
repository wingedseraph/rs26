import type { NextRequest } from 'next/server'

import { NextResponse } from 'next/server'

import { isArray, isValidCard } from '@/api/typeguard'
import { cardToCsv } from '@/lib/cardToCsv'
import { syncTryCatch, tryCatch } from '@/lib/tryCatch'

function buildCsvHeaders(length: number) {
  return { 'Content-Type': 'text/csv;charset=utf-8', 'Content-Disposition': `attachment;filename="${length}_cards.csv"` } as const
}

export async function POST(request: NextRequest) {
  const formData = await tryCatch(() => request.formData().then(data => data.get('csv')))
  if (!formData.ok || typeof formData.data !== 'string') {
    return NextResponse.json({ message: 'Invalid data' }, { status: 400 })
  }
  const csv = formData.data

  const parsed = syncTryCatch<unknown>(() => JSON.parse(csv))
  if (!parsed.ok || !isArray(parsed.data, isValidCard)) {
    return NextResponse.json({ message: 'Unable to parse the data' }, { status: 400 })
  }

  const toCsv = cardToCsv(parsed.data, request.nextUrl.origin)

  return new Response(toCsv, {
    headers: buildCsvHeaders(parsed.data.length),
  })
}
