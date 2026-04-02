import { createSlice } from "@reduxjs/toolkit"
import { type Notification } from "../../data/notificationsData"

interface NotificationState {
    notifications: Notification[];
    unreadNotificationCount: number;
    loading: boolean;
    error: string | null;
    hasFetched: boolean;
}

const initialState: NotificationState = {
    notifications: [],
    unreadNotificationCount: 0,
    loading: false,
    error: null,
    hasFetched: false,
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotifications: (state, action) => {
            state.notifications = action.payload;
            state.unreadNotificationCount = action.payload.filter((n: Notification) => !n.isRead).length;
            state.hasFetched = true;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        markAsRead: (state, action) => {
            state.notifications = state.notifications.map(n =>
                n.id === action.payload ? { ...n, isRead: true } : n
            );
            state.unreadNotificationCount = state.notifications.filter(n => !n.isRead).length;
        },
        markAllAsRead: (state) => {
            state.notifications = state.notifications.map(n => ({ ...n, isRead: true }));
            state.unreadNotificationCount = 0;
        },
        deleteNotification: (state, action) => {
            state.notifications = state.notifications.filter(n => n.id !== action.payload);
            state.unreadNotificationCount = state.notifications.filter(n => !n.isRead).length;
        },
        clearNotification: (state) => {
            state.notifications = [];
            state.unreadNotificationCount = 0;
        },
        addNotification: (state, action) => {
            state.notifications = [action.payload, ...state.notifications]
            state.unreadNotificationCount = state.unreadNotificationCount + (action.payload.isRead ? 0 : 1)
        }
    }
})

export const notificationActions = notificationSlice.actions
export default notificationSlice.reducer
