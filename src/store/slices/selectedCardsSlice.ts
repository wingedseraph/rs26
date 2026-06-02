import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'

import type { Card } from '@/api/types'

type selectedCardsStore = Record<number, Card>

const initialState: selectedCardsStore = {}

export const selectedCards = createSlice({
  name: 'selectedCards',
  initialState,
  reducers: {
    toggleOne(state, action: PayloadAction<{ id: number, card: Card }>) {
      const { id, card } = action.payload
      if (!state[id]) {
        return { ...state, [id]: card }
      }
      else {
        const { [id]: _, ...rest } = state
        return rest
      }
    },
    removeAll() { return initialState },
  },
})
