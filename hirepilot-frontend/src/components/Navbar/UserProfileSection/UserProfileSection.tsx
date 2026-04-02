import { useRef, useEffect } from "react";
import { IconButton, Avatar, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { authActions } from "../../../store/auth/auth.slice";
import { userMenuActions } from "../../../store/UserMenu/usermenu.slice";
import profileImg from '../../../assets/Nawaz_profile_IMG.jpg';
import UserMenu from "../UserMenu/UserMenu";

const UserProfileSection = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isUserMenuOpen = useAppSelector(state => state.userMenu.isUserMenuOpen);
    const currentUser = useAppSelector(state => state.currentUser);
    const userMenuRef = useRef<HTMLDivElement>(null);

    const handleUserMenuStatus = () => {
        dispatch(userMenuActions.toggleUserMenu());
    };

    const handleLogout = () => {
        dispatch(authActions.logout());
        dispatch(userMenuActions.closeUserMenu());
        navigate("/");
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isUserMenuOpen &&
                userMenuRef.current &&
                !userMenuRef.current.contains(event.target as Node)
            ) {
                dispatch(userMenuActions.closeUserMenu());
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isUserMenuOpen, dispatch]);

    const userInitials = currentUser ? `${currentUser.firstName[0]}${currentUser.lastName[0]}` : "";

    return (
        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }} ref={userMenuRef}>
            <IconButton onClick={handleUserMenuStatus} sx={{ p: 0 }}>
                <Avatar src={profileImg} alt="Profile">
                    {userInitials}
                </Avatar>
            </IconButton>

            {isUserMenuOpen && (
                <UserMenu
                    currentUser={currentUser}
                    handleLogout={handleLogout}
                    handleUserMenuStatus={handleUserMenuStatus}
                />
            )}
        </Box>
    );
};

export default UserProfileSection;
