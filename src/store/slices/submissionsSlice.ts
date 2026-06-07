import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'

import type { FormSchema } from '@/pages/forms-page/FormsPage'

// fix image should be base64 string
type UserProfile = Omit<FormSchema, 'passwordConfirm' | 'terms' | 'file'> & { file: string }
type Submissions = UserProfile[]

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
