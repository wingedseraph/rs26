import { describe, expect, it } from 'vitest'

import { toBase64 } from '@/lib/base64'

describe('toBase64', () => {
  it('должен вернуть строку начинающуюся с data:image/', async () => {
    const file = new File(['image'], 'test.png', { type: 'image/png' })

    const result = await toBase64(file)

    expect(result).toMatch(/^data:image\//)
  })
})
