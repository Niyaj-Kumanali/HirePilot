import { useEffect, useRef, useState } from "react";
import {
  Home, Briefcase, BookOpen, BarChart3,
  LogOut, Menu, X, Bell,
  MessageSquare, Zap, Sun, Moon
} from "lucide-react";
import Logo from "../Logo/Logo";
import './navbar.scss'
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../api/auth";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { authActions } from "../../store/auth/auth.slice";
import { getUserMenuState } from "../../utility/userMenu";
import { userMenuActions } from "../../store/UserMenu/usermenu.slice";
import profileImg from '../../assets/Nawaz_profile_IMG.jpg'
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const NAV_ITEMS = [
  { label: "Home", path: "/", icon: Home },
  { label: "Jobs", path: "/jobs", icon: Briefcase },
  { label: "Courses", path: "/courses", icon: BookOpen },
  { label: "AI Interview", path: "/interview", icon: Zap },
];

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const isUserMenuOpen = getUserMenuState();
  const isAuthenticated = AuthService.getAuthenticationState();

  const currentUser = useAppSelector(state => state.currentUser);
  const notifications = 3;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    setIsMobileOpen(false);


    requestAnimationFrame(() => {
      navigate(path);
    });
  };

  const handleUserMenuStatus = () => {
    dispatch(userMenuActions.toggleUserMenu())
  }

  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isUserMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        dispatch(userMenuActions.closeUserMenu())
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isUserMenuOpen, dispatch])

  const userInitials = (currentUser.firstName + " " + currentUser.lastName)
    .split(" ")
    .map(n => n.charAt(0))
    .join("");

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <nav className="navbar-nav-desktop">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.label} to={item.path} className="nav-link">
                <Icon size={18} className="nav-icon" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>


        {/* Action Buttons */}
        <div className="navbar-actions">
          {/* Notifications */}
          {isAuthenticated ?
            <>
              <div className="notification-wrapper desktop-only">
                <button
                  className="notification-btn"
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                >
                  <Bell size={20} />
                  {notifications > 0 && <span className="notification-badge">{notifications}</span>}
                </button>

                {isNotificationOpen && (
                  <div className="notification-dropdown">
                    <div className="dropdown-header">
                      <h3>Notifications</h3>
                      <button className="close-btn" onClick={() => setIsNotificationOpen(false)}>
                        <X size={18} />
                      </button>
                    </div>
                    <div className="notification-item">
                      <div className="notification-dot"></div>
                      <div>
                        <p className="notification-title">New job matching your profile!</p>
                        <p className="notification-time">5 minutes ago</p>
                      </div>
                    </div>
                    <div className="notification-item">
                      <div className="notification-dot"></div>
                      <div>
                        <p className="notification-title">You have a new message</p>
                        <p className="notification-time">2 hours ago</p>
                      </div>
                    </div>
                    <div className="notification-item">
                      <div className="notification-dot"></div>
                      <div>
                        <p className="notification-title">Course recommendation for you</p>
                        <p className="notification-time">1 day ago</p>
                      </div>
                    </div>
                    <div className="notification-footer">
                      <Link to="/notifications" className="view-all">View All</Link>
                    </div>
                  </div>
                )}
              </div>
              <div className="user-profile-wrapper">
                  <ThemeToggle />


                {/* User Avatar & Dropdown */}
                <div className="user-menu" ref={menuRef}>
                  <button
                    className="avatar-btn"
                    onClick={handleUserMenuStatus}
                    title={currentUser.firstName + " " + currentUser.lastName}
                  >
                    <div className="avatar-content">
                      {profileImg ? <img src={profileImg} alt="profile Img" /> : userInitials}
                    </div>
                    {/* <ChevronDown size={14} className={`chevron ${isUserMenuOpen ? 'open' : ''}`} /> */}
                  </button>

                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <div className="user-dropdown">
                      <div className="dropdown-header">
                        <div className="user-info">
                          <div className="user-avatar-large">{profileImg ? <img src={profileImg} alt="profile Img" /> : userInitials}</div>
                          <div>
                            <p className="user-name">{currentUser.firstName + " " + currentUser.lastName}</p>
                            <p className="user-email">{currentUser.email}</p>
                          </div>
                        </div>
                      </div>
                      <hr className="dropdown-divider" />
                      <Link to="/profile" className="dropdown-item" onClick={handleUserMenuStatus}>
                        <Home size={16} />
                        <span>My Profile</span>
                      </Link>
                      <Link to="/training" className="dropdown-item" onClick={handleUserMenuStatus}>
                        <BookOpen size={16} />
                        <span>My Training</span>
                      </Link>
                      <Link to="/interview" className="dropdown-item" onClick={handleUserMenuStatus}>
                        <Zap size={16} />
                        <span>My Interviews</span>
                      </Link>
                      <Link to="/dashboard" className="dropdown-item" onClick={handleUserMenuStatus}>
                        <BarChart3 size={16} />
                        <span>My Dashboard</span>
                      </Link>

                      <Link to="/messages" className="dropdown-item" onClick={handleUserMenuStatus}>
                        <MessageSquare size={16} />
                        <span>Messages</span>
                      </Link>
                      <hr className="dropdown-divider" />
                      <button className="dropdown-item logout-item" onClick={() => {
                        setTimeout(() => {
                          dispatch(authActions.logout());
                          handleUserMenuStatus()
                          navigate("/")
                        }, 1000);
                      }}>
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </>
            :
            <>
              <div className="auth-buttons desktop-only">
                <Link to="/signin" className="btn-signin">Sign In</Link>
                <Link to="/signup" className="btn-signup">Sign Up</Link>
              </div>
            </>
          }

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div >

      {/* Mobile Sidebar Overlay */}
      {
        isMobileOpen && (
          <div className="mobile-overlay" onClick={() => setIsMobileOpen(false)} ref={menuRef}>
            <aside className="mobile-sidebar" onClick={(e) => e.stopPropagation()}>
              {/* Mobile Nav */}
              <ul className="mobile-nav-list">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label} onClick={() => handleNavigation(item.path)}>
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </li>
                  );
                })}
              </ul>

              {/* Sidebar Footer */}
              <div className="sidebar-footer">
                {!isAuthenticated && (
                  <>
                    <Link to="/signin" className="btn-signin sidebar-link" onClick={() => setIsMobileOpen(false)}>Sign In</Link>
                    <Link to="/signup" className="btn-signup sidebar-link" onClick={() => setIsMobileOpen(false)}>Sign Up</Link>
                  </>
                )}
              </div>


            </aside>
          </div>
        )
      }
    </header >
  );
}