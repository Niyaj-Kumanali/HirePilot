import React from "react";
import { Link } from "react-router-dom";

import type { LucideIcon } from "lucide-react";

interface MobileDrawerProps {
    isMobileOpen: boolean;
    setIsMobileOpen: (open: boolean) => void;
    handleNavigation: (path: string) => void;
    isAuthenticated: boolean;
    NAV_ITEMS: { label: string; path: string; icon: LucideIcon }[];
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ isMobileOpen, setIsMobileOpen, handleNavigation, isAuthenticated, NAV_ITEMS }) => {
    return (
        <div
            className={`fixed inset-0 z-50 transition-opacity duration-300 ${
                isMobileOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
            }`}
        >
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                onClick={() => setIsMobileOpen(false)}
            />
            <div
                className={`absolute top-0 right-0 h-full w-[280px] bg-white/90 dark:bg-[#1a1d23]/90 backdrop-blur-xl border-l border-black/[0.04] dark:border-white/[0.06] shadow-xl transition-transform duration-300 ease-out-expo ${
                    isMobileOpen ? "translate-x-0" : "translate-x-full"
                }`}
                role="presentation"
            >
                <div className="p-4 border-b border-black/[0.04] dark:border-white/[0.06]">
                    <span className="text-xs font-bold tracking-widest text-[#5f6368] dark:text-[#9aa0a6] uppercase">Navigation</span>
                </div>
                <ul className="py-2 px-2 space-y-0.5">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.label}>
                                <button
                                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#202124] dark:text-[#e8eaed] hover:bg-primary/5 hover:text-primary transition-all duration-200 font-semibold text-sm"
                                    onClick={() => handleNavigation(item.path)}
                                >
                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/5 text-secondary">
                                        <Icon size={18} />
                                    </span>
                                    {item.label}
                                </button>
                            </li>
                        )
                    })}
                </ul>
                {!isAuthenticated && (
                    <div className="p-4 border-t border-black/[0.04] dark:border-white/[0.06] flex flex-col gap-2">
                        <Link
                            to="/signin"
                            className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl border border-primary/30 text-primary font-bold text-sm hover:bg-primary/5 transition-all duration-200"
                            onClick={() => setIsMobileOpen(false)}
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/signup"
                            className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl bg-gradient-to-br from-[#a855f7] to-[#7e22ce] text-white font-bold text-sm shadow-button hover:shadow-button-hover transition-all duration-200"
                            onClick={() => setIsMobileOpen(false)}
                        >
                            Get Started
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MobileDrawer
