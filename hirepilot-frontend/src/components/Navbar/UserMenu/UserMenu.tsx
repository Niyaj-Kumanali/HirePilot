import { Link } from "react-router-dom";
import { Home, LogOut } from "lucide-react";
import profileImg from '../../../assets/Nawaz_profile_IMG.jpg'
import type { CurrentUserState } from "../../../store/CurrentUser/currentuser.types";



interface UserMenuProps {
    currentUser: CurrentUserState;
    handleLogout: () => void;
    handleUserMenuStatus: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({currentUser, handleLogout, handleUserMenuStatus}) => {
    return (
        <div className="absolute top-[50px] right-0 w-[250px] p-4 z-10 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95 backdrop-blur-[20px]">
            <div className="flex items-center mb-3">
                <img src={profileImg} alt="Profile" className="w-10 h-10 rounded-full object-cover mr-3" />
                <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {currentUser.firstName + " " + currentUser.lastName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {currentUser.email}
                    </p>
                </div>
            </div>
            <hr className="my-2 border-gray-200 dark:border-gray-700" />
            <div className="flex flex-col gap-1">
                <Link
                    to="/profile"
                    onClick={handleUserMenuStatus}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors no-underline"
                >
                    <Home size={16} />
                    My Profile
                </Link>
                <hr className="my-2 border-gray-200 dark:border-gray-700" />
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full text-left"
                >
                    <LogOut size={16} />
                    Sign Out
                </button>
            </div>
        </div>
    )
}

export default UserMenu
