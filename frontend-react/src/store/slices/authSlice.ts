import { User } from './../models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../'

// Define a type for the slice state
interface AuthState {
  authLoading: boolean
  user?: User
}

// Define the initial state using that type
const initialState: AuthState = {
  authLoading: false,
  user: undefined
}

export const counterSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAuthLoading: (state) => {
      state.authLoading = true
    },
    setAuthRejected: (state) => {
      state.authLoading = false
    },
    setAuthResolved: (state, action: PayloadAction<User>) => {
      state.authLoading = false
      state.user = action.payload
    },
    logout: (state) => {
      state.user = undefined
    }
    
    // setToken: (state, action: PayloadAction<string>) => {
    //   state.token = action.payload
    // },
  },
})

export const { setAuthLoading, setAuthRejected, setAuthResolved } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.auth.user

export default counterSlice.reducer