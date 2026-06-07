import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'

import type { Countries } from '@/store/slices/countriesSlice'

export type UserProfile = {
  name: string
  password: string
  age: number
  country: Countries[number]
  email: string
  file: string
  gender: 'male' | 'female' | 'other'
}

export type Submissions = UserProfile[]

const initialState: Submissions = []

export const submissions = createSlice({
  name: 'submissions',
  initialState,
  reducers: {
    addOne(state, action: PayloadAction<UserProfile>) {
      state.push(action.payload)
    },
  },
})

export const { addOne } = submissions.actions
