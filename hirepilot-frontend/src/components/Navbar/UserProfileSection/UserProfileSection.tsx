import { useRef, useEffect } from "react";
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

    return (
        <div className="relative flex items-center" ref={userMenuRef}>
            <button onClick={handleUserMenuStatus} className="p-0 rounded-full focus:outline-none">
                <img src={profileImg} alt="Profile" className="w-9 h-9 rounded-full object-cover" />
            </button>

            {isUserMenuOpen && (
                <UserMenu
                    currentUser={currentUser}
                    handleLogout={handleLogout}
                    handleUserMenuStatus={handleUserMenuStatus}
                />
            )}
        </div>
    );
};

export default UserProfileSection;
