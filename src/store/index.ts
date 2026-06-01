import { useDispatch, useSelector } from 'react-redux'

import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { artworkApi } from '@/api/services/artwork'
import { selectedCards } from '@/store/slices/selectedCardsSlice'

const rootReducer = combineReducers({
  selectedCards: selectedCards.reducer,
  [artworkApi.reducerPath]: artworkApi.reducer,
})

export function setupStore(preloadedState?: PreloadedState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,

    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(artworkApi.middleware),
  })
}

const store = setupStore()

export type PreloadedState = Parameters<typeof rootReducer>[0]
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export const { toggleOne, removeAll } = selectedCards.actions

export default store
