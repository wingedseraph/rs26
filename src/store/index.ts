import { useDispatch, useSelector } from 'react-redux'

import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { artworkApi } from '@/api/artwork'
import { countries } from '@/store/slices/countriesSlice'
import { selectedCards } from '@/store/slices/selectedCardsSlice'
import { submissions } from '@/store/slices/submissionsSlice'

const rootReducer = combineReducers({
  submissions: submissions.reducer,
  selectedCards: selectedCards.reducer,
  countries: countries.reducer,
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
type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export default store
