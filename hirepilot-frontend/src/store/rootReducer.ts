import { combineReducers } from "@reduxjs/toolkit";
import authReducer from './auth/auth.slice'
import userMenuReducer from './UserMenu/usermenu.slice'
import currentUserReducer from './CurrentUser/currentuser.slice'
import themeReducer from './theme/themeSlice'
import notificationReducer from "./Notification/notification.slice";
import interviewReducer from "./Interview/interview.slice";

export const rootReducer = combineReducers({
    auth: authReducer,
    userMenu: userMenuReducer,
    currentUser: currentUserReducer,
    theme: themeReducer,
    notification: notificationReducer,
    interview: interviewReducer,
})

export type RootState = ReturnType<typeof rootReducer>