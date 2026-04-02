import { useAppSelector } from "../store/hooks"

export function useUserMenuState() {
    const isUserMenuOpen = useAppSelector(state => state.userMenu.isUserMenuOpen);
    return isUserMenuOpen
}

