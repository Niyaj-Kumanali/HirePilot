import { Link } from "react-router-dom";
import { Home, LogOut } from "lucide-react";
import type { CurrentUserState } from "../../../store/CurrentUser/currentuser.types";

interface UserMenuProps {
    currentUser: CurrentUserState;
    handleLogout: () => void;
    handleUserMenuStatus: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({currentUser, handleLogout, handleUserMenuStatus}) => {
    return (
        <div className="absolute top-[50px] right-0 w-[260px] p-3 z-10 rounded-2xl border border-black/[0.04] dark:border-white/[0.06] bg-white/95 dark:bg-[#1a1d23]/95 backdrop-blur-xl shadow-xl shadow-black/[0.02] dark:shadow-black/[0.2]">
            <div className="flex items-center gap-3 px-2 py-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shadow-sm shrink-0">
                    {currentUser.firstName?.charAt(0)}{currentUser.lastName?.charAt(0)}
                </div>
                <div className="min-w-0">
                    <p className="text-sm font-bold text-[#202124] dark:text-[#e8eaed] truncate">
                        {currentUser.firstName + " " + currentUser.lastName}
                    </p>
                    <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6] truncate">
                        {currentUser.email}
                    </p>
                </div>
            </div>
            <hr className="my-1.5 border-black/[0.04] dark:border-white/[0.06]" />
            <div className="flex flex-col gap-0.5">
                <Link
                    to="/profile"
                    onClick={handleUserMenuStatus}
                    className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold text-[#202124] dark:text-[#e8eaed] rounded-xl hover:bg-primary/5 hover:text-primary transition-all duration-200 no-underline"
                >
                    <Home size={16} className="text-[#5f6368] dark:text-[#9aa0a6]" />
                    My Profile
                </Link>
                <hr className="my-0.5 border-black/[0.04] dark:border-white/[0.06]" />
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold text-red-500 rounded-xl hover:bg-red-500/10 transition-all duration-200 w-full text-left"
                >
                    <LogOut size={16} />
                    Sign Out
                </button>
            </div>
        </div>
    )
}

export default UserMenu
