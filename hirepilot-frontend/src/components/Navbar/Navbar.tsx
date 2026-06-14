import { useState } from "react";
import {
  Home, Briefcase,
  Menu as MenuIcon, X,
  Zap,
  Sun,
  Moon
} from "lucide-react";
import Logo from "../Logo/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import MobileDrawer from "./MobileDrawer/MobileDrawer";
import NotificationSection from "./NotificationSection/NotificationSection";
import UserProfileSection from "./UserProfileSection/UserProfileSection";
import { toggleTheme } from "../../store/theme/themeSlice";

const NAV_ITEMS = [
  { label: "Home", path: "/", icon: Home },
  { label: "Jobs", path: "/jobs", icon: Briefcase },
  { label: "AI Interview", path: "/interview", icon: Zap },
];

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const themeMode = useAppSelector(state => state.theme.mode);
  const dispatch = useAppDispatch();

  const isDark = themeMode === 'dark';

  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    setIsMobileOpen(false);
    requestAnimationFrame(() => {
      navigate(path);
    });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="flex h-17.5 items-center justify-between">
          <div className="flex items-center">
            <Logo />
          </div>

          <div className="hidden md:flex flex-row items-center gap-3">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center gap-2 px-5 min-h-8 text-sm font-semibold transition-all duration-300 ease-in-out ${isActive
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-600 dark:text-gray-300 hover:text-primary border-b-2 border-transparent"
                    }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch(toggleTheme())}
              aria-label={`Cycle theme. Current: ${themeMode}.`}
              title={`Theme: ${themeMode.charAt(0).toUpperCase() + themeMode.slice(1)}`}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-sm border-none text-gray-500 dark:text-gray-400 transition-all duration-300 hover:bg-white/10 hover:text-primary hover:shadow-[0_4px_12px_rgba(168,85,247,0.15)] active:translate-y-0"
            >
              {isDark ? (
                <Sun size={20} className="text-amber-400" style={{ filter: 'drop-shadow(0 0 4px rgba(251,191,36,0.4))' }} />
              ) : (
                <Moon size={20} className="text-primary" style={{ filter: 'drop-shadow(0 0 4px rgba(168,85,247,0.4))' }} />
              )}
            </button>

            {isAuthenticated ? (
              <>
                <NotificationSection />
                <UserProfileSection />
              </>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <Link to="/signin" className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-full hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200">
                  Sign In
                </Link>

                <Link to="/signup" className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-primary rounded-full shadow-lg shadow-primary/20 hover:bg-primary/90 hover:scale-105 transition-all duration-200">
                  Get Started
                </Link>
              </div>
            )}

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden flex items-center justify-center min-h-10 min-w-10 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>

      <MobileDrawer isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} handleNavigation={handleNavigation} isAuthenticated={isAuthenticated} NAV_ITEMS={NAV_ITEMS} />
    </header>
  );
}
