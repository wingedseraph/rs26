import type { PayloadAction } from '@reduxjs/toolkit'

import { useDispatch, useSelector } from 'react-redux'

import { configureStore, createSlice } from '@reduxjs/toolkit'

import type { Card } from '@/api/typeguard'

type selectedCardsStore = Record<number, Card>

const initialState: selectedCardsStore = {}

const selectedCards = createSlice({
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

const store = configureStore({
  reducer: {
    selectedCards: selectedCards.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export const { toggleOne, removeAll } = selectedCards.actions

export default store
