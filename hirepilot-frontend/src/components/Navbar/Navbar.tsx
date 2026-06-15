import { useState } from "react";
import {
  Home, Briefcase,
  Menu as MenuIcon, X,
  Zap, Mail,
} from "lucide-react";
import Logo from "../Logo/Logo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import MobileDrawer from "./MobileDrawer/MobileDrawer";
import NotificationSection from "./NotificationSection/NotificationSection";
import UserProfileSection from "./UserProfileSection/UserProfileSection";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const NAV_ITEMS = [
  { label: "Home", path: "/", icon: Home },
  { label: "Jobs", path: "/jobs", icon: Briefcase },
  { label: "AI Interview", path: "/interview", icon: Zap },
  { label: "Cold Email", path: "/cold-email", icon: Mail },
];

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    setIsMobileOpen(false);
    requestAnimationFrame(() => {
      navigate(path);
    });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-black/[0.04] dark:border-white/[0.06] bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Logo />

          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-primary/10 text-primary shadow-sm"
                      : "text-[#5f6368] dark:text-[#9aa0a6] hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <ThemeToggle />

            {isAuthenticated ? (
              <>
                <NotificationSection />
                <UserProfileSection />
              </>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/signin"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-[#5f6368] dark:text-[#9aa0a6] rounded-xl hover:text-primary hover:bg-primary/5 transition-all duration-200"
                >
                  Sign In
                </Link>

                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center px-5 py-2 text-sm font-bold rounded-xl bg-gradient-to-br from-[#a855f7] to-[#7e22ce] text-white shadow-button hover:shadow-button-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            )}

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl hover:bg-primary/5 text-[#5f6368] dark:text-[#9aa0a6] transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileOpen ? <X size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>
      </div>

      <MobileDrawer isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} handleNavigation={handleNavigation} isAuthenticated={isAuthenticated} NAV_ITEMS={NAV_ITEMS} />
    </header>
  );
}
