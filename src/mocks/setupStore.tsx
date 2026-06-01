import type { RenderOptions } from '@testing-library/react'

import type { PropsWithChildren, ReactNode } from 'react'
import { Provider } from 'react-redux'

import { render } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import type { AppStore, PreloadedState } from '@/store'

import { setupStore } from '@/store'

type ExtendedRenderOptions = {
  preloadedState?: PreloadedState
  store?: AppStore
} & Omit<RenderOptions, 'queries' | 'wrapper'>

export function renderWithProviders(
  ui: ReactNode,
  extendedRenderOptions: ExtendedRenderOptions = {},
) {
  const {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions

  // eslint-disable-next-line react/component-hook-factories -- a piece from the documentation, for tests - acceptable to disable linter
  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      {children}
    </Provider>
  )

  return {
    store,
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  }
}
