import { describe, expect, it } from 'vitest'

import type { UserProfile } from '@/store/slices/submissionsSlice'

import { setupStore } from '@/store'
import { addOne } from '@/store/slices/submissionsSlice'

const mockProfile: Omit<UserProfile, 'id'> = {
  name: 'user1',
  password: 'pass1',
  age: 25,
  country: 'Germany',
  email: 'user1@example.com',
  file: 'data:image/png;base64,abc',
  gender: 'female',
}

const mockProfile2: Omit<UserProfile, 'id'> = {
  name: 'user2',
  password: 'pass2',
  age: 30,
  country: 'France',
  email: 'user2@example.com',
  file: 'data:image/jpeg;base64,xyz',
  gender: 'male',
}

describe('submissionsSlice', () => {
  it('addOne должен добавить submission в массив', () => {
    const store = setupStore()

    store.dispatch(addOne(mockProfile))

    expect(store.getState().submissions).toHaveLength(1)
  })

  it('добавленный submission должен содержать корректные поля', () => {
    const store = setupStore()

    store.dispatch(addOne(mockProfile))

    const submission = store.getState().submissions[0]
    expect(submission).toMatchObject(mockProfile)
  })

  it('множественные addOne должны накапливать submissions', () => {
    const store = setupStore()

    store.dispatch(addOne(mockProfile))
    store.dispatch(addOne(mockProfile2))

    expect(store.getState().submissions).toHaveLength(2)
    expect(store.getState().submissions[0].name).toBe('user1')
    expect(store.getState().submissions[1].name).toBe('user2')
  })

  it('submissions должен начинаться как пустой массив', () => {
    const store = setupStore()

    expect(store.getState().submissions).toEqual([])
  })
})

describe('countriesSlice', () => {
  it('начальное состояние должно содержать ожидаемые страны', () => {
    const store = setupStore()
    const countriesList = store.getState().countries

    expect(countriesList.length).toBeGreaterThan(0)
    expect(countriesList).toContain('Germany')
    expect(countriesList).toContain('United States')
    expect(countriesList).toContain('Japan')
  })
})

describe('store shape', () => {
  it('должен иметь ожидаемые ключи верхнего уровня', () => {
    const store = setupStore()
    const state = store.getState()

    expect(state).toHaveProperty('submissions')
    expect(state).toHaveProperty('countries')
    expect(state).toHaveProperty('selectedCards')
  })
})
