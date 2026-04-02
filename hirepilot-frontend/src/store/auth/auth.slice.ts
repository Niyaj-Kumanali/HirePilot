import { createSlice } from '@reduxjs/toolkit'
import type { AuthState } from './auth.types'


const initialState: AuthState = {
  isAuthenticated: Boolean(localStorage.getItem('auth')),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true
      localStorage.setItem('auth', 'true')
    },
    logout(state) {
      state.isAuthenticated = false
      localStorage.removeItem('auth')
    },
  },
})

export const authActions = authSlice.actions
export default authSlice.reducer
