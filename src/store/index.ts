import { useDispatch, useSelector } from 'react-redux'

import { configureStore } from '@reduxjs/toolkit'

import { artworkApi } from '@/api/services/artwork'
import { selectedCards } from '@/store/slices/selectedCardsSlice'

const store = configureStore({
  reducer: {
    selectedCards: selectedCards.reducer,
    [artworkApi.reducerPath]: artworkApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(artworkApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export const { toggleOne, removeAll } = selectedCards.actions

export default store
