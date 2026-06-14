import React from "react";
import { Link } from "react-router-dom";

import type { LucideIcon } from "lucide-react";

interface MobileDrawerProps {
    /** Whether the drawer is currently open. */
    isMobileOpen: boolean;
    /** Callback to change the open state of the drawer. */
    setIsMobileOpen: (open: boolean) => void;
    /** Navigation handler that also closes the drawer. */
    handleNavigation: (path: string) => void;
    /** Authentication status of the current user. */
    isAuthenticated: boolean;
    /** List of navigation items to display in the drawer. */
    NAV_ITEMS: { label: string; path: string; icon: LucideIcon }[];
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ isMobileOpen, setIsMobileOpen, handleNavigation, isAuthenticated, NAV_ITEMS }) => {
    return (
        <div
            className={`fixed inset-0 z-50 transition-opacity duration-300 ${
                isMobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
        >
            <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setIsMobileOpen(false)}
            />
            <div
                className={`absolute top-0 right-0 h-full w-[250px] bg-white shadow-xl transition-transform duration-300 ease-in-out ${
                    isMobileOpen ? "translate-x-0" : "translate-x-full"
                }`}
                role="presentation"
            >
                <ul className="py-2">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.label}>
                                <button
                                    className="w-full flex items-center justify-start px-6 py-3 text-gray-800 hover:bg-gray-100 transition-colors uppercase font-medium text-sm"
                                    onClick={() => handleNavigation(item.path)}
                                >
                                    <span className="mr-3 flex items-center justify-center">
                                        <Icon size={20} />
                                    </span>
                                    {item.label}
                                </button>
                            </li>
                        )
                    })}
                </ul>
                <hr className="border-t border-gray-200" />
                {!isAuthenticated && (
                    <div className="p-4 flex flex-col gap-2">
                        <Link
                            to="/signin"
                            className="w-full flex items-center justify-center py-1.5 px-4 border border-primary text-primary rounded hover:bg-primary/10 transition-colors uppercase font-medium text-sm"
                            onClick={() => setIsMobileOpen(false)}
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/signup"
                            className="w-full flex items-center justify-center py-1.5 px-4 bg-primary text-white rounded hover:bg-primary/90 transition-colors shadow uppercase font-medium text-sm"
                            onClick={() => setIsMobileOpen(false)}
                        >
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MobileDrawer
