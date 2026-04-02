import { Button, Stack } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface NAV_ITEM {
    label: string;
    path: string;
    icon: LucideIcon
}

interface NavLinksProps {
    NAV_ITEMS: NAV_ITEM[];
}

/**
 * Desktop navigation links for the Navbar.
 * 
 * Renders a horizontal list of buttons with active state styling 
 * based on the current browser location.
 * 
 * @param {NavLinksProps} props - Component props.
 */
const NavLinks: React.FC<NavLinksProps> = ({ NAV_ITEMS }) => {
    const location = useLocation();
    return (
        <Stack direction="row" spacing={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
            {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                    <Button
                        key={item.label}
                        component={Link}
                        to={item.path}
                        startIcon={<Icon size={18} />}
                        color={location.pathname === item.path ? "primary" : "inherit"}
                        disableRipple
                        sx={{
                            textTransform: "none",
                            fontWeight: 500,
                            borderRadius: "0px",
                            borderBottom: location.pathname === item.path ? "2px solid" : "none",

                            '&:hover': {
                                backgroundColor: 'transparent'
                            }
                        }}
                    >
                        {item.label}
                    </Button>
                );
            })}
        </Stack>
    )
}

export default NavLinks