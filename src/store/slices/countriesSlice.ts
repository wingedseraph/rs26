import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  'United States',
  'United Kingdom',
  'Germany',
  'France',
  'Japan',
  'Brazil',
  'Australia',
] as const
export type Countries = typeof initialState

export const countries = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
})
