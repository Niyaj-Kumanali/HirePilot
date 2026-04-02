import { Link } from 'react-router-dom';
import { Rocket } from "lucide-react";
import { Box, Typography, useTheme } from '@mui/material';

/**
 * The standard brand Logo component.
 * 
 * Features a Rocket icon and the "HirePilot." brand text with 
 * a theme-aware gradient. Navigates to the home page on click.
 */
const Logo = () => {
    const theme = useTheme();

    return (
        <Box
            component={Link}
            to="/"

            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                padding: '8px 16px',
                bgcolor: 'background.paper',
                textDecoration: 'none',
                '&:hover': {
                    bgcolor: 'background.paper',
                }
            }}
        >
            <Rocket size={24} color={theme.palette.primary.main} />
            <Typography
                variant="h6"
                component="span"
                sx={{
                    fontWeight: 900,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '-0.02em',
                }}
            >
                HirePilot.
            </Typography>
        </Box>
    );
};

export default Logo;