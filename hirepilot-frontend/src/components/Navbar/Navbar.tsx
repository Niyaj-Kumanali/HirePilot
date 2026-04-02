import { useState } from "react";
import {
  Home, Briefcase,
  Menu as MenuIcon, X,
  Zap
} from "lucide-react";
import {
  AppBar, Toolbar, IconButton, Box, Container
} from "@mui/material";
import Logo from "../Logo/Logo";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import MobileDrawer from "./MobileDrawer/MobileDrawer";
import NavLinks from "./NavLinks/NavLinks";
import AuthButtons from "./AuthButtons/AuthButtons";
import NotificationSection from "./NotificationSection/NotificationSection";
import UserProfileSection from "./UserProfileSection/UserProfileSection";

const NAV_ITEMS = [
  { label: "Home", path: "/", icon: Home },
  { label: "Jobs", path: "/jobs", icon: Briefcase },
  { label: "AI Interview", path: "/interview", icon: Zap },
];

/**
 * The main Navigation Bar of the application.
 * 
 * Features:
 * - Responsive design (Desktop links vs. Mobile drawer)
 * - Conditional rendering based on authentication state
 * - Theme toggle integration
 * - Sticky positioning with backdrop blur logic (via MUI AppBar)
 */
export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    setIsMobileOpen(false);
    requestAnimationFrame(() => {
      navigate(path);
    });
  };

  return (
    <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: 70 }}>
          {/* Logo Section */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Logo />
          </Box>

          {/* Desktop Navigation */}
          <NavLinks NAV_ITEMS={NAV_ITEMS} />

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ThemeToggle />

            {isAuthenticated ? (
              <>
                <NotificationSection />
                <UserProfileSection />
              </>
            ) : (
              <AuthButtons />
            )}

            {/* Mobile Menu Toggle */}
            <IconButton
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              sx={{ display: { md: 'none' } }}
            >
              {isMobileOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <MobileDrawer isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} handleNavigation={handleNavigation} isAuthenticated={isAuthenticated} NAV_ITEMS={NAV_ITEMS} />
    </AppBar>
  );
}