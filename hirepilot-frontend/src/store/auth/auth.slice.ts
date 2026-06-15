import { createSlice } from '@reduxjs/toolkit'
import type { AuthState } from './auth.types'


const initialState: AuthState = {
  isAuthenticated: Boolean(localStorage.getItem('auth')),
  token: localStorage.getItem('auth_token'),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true
      state.token = action.payload?.token || null
      localStorage.setItem('auth', 'true')
      if (action.payload?.token) {
        localStorage.setItem('auth_token', action.payload.token)
      }
    },
    logout(state) {
      state.isAuthenticated = false
      state.token = null
      localStorage.removeItem('auth')
      localStorage.removeItem('auth_token')
    },
  },
})

export const authActions = authSlice.actions
export default authSlice.reducer
