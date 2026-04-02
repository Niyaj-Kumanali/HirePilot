import { createSlice } from "@reduxjs/toolkit";
import type { UserMenuState } from "./usermenu.types";

const initialState: UserMenuState = {
    isUserMenuOpen: false
}

const userMenuSlice = createSlice({
    name: "user-menu",
    initialState,
    reducers: {
        openUserMenu(state) {
            state.isUserMenuOpen = true
        },
        closeUserMenu(state) {
            state.isUserMenuOpen = false
        },
        toggleUserMenu(state){
            state.isUserMenuOpen = !state.isUserMenuOpen
        }
    }
})

export const userMenuActions = userMenuSlice.actions;
export default userMenuSlice.reducer;