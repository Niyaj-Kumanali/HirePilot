import { combineReducers } from "@reduxjs/toolkit";
import authReducer from './auth/auth.slice'
import userMenuReducer from './UserMenu/usermenu.slice'
import currentUserReducer from './CurrentUser/currentuser.slice'
import themeReducer from './theme/themeSlice'

export const rootReducer = combineReducers({
    auth: authReducer,
    userMenu: userMenuReducer,
    currentUser: currentUserReducer,
    theme: themeReducer
})

export type RootState = ReturnType<typeof rootReducer>