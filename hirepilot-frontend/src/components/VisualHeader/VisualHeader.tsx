import React from 'react';
import { Box, Typography, keyframes, alpha, useTheme } from '@mui/material';

interface VisualHeaderProps {
    /** Optional badge text displayed above the main title. */
    badge?: string;
    /** Primary title text. */
    title: string;
    /** Title text segment that will be rendered with the brand gradient. */
    gradient_title: string;
    /** Optional detailed description below the title. */
    subtitle?: string;
    /** Text alignment (default: center). */
    align?: React.CSSProperties['textAlign'];
}

const slideDown = keyframes`
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
    0% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.4); }
    70% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 6px rgba(168, 85, 247, 0); }
    100% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 0 rgba(168, 85, 247, 0); }
`;

/**
 * A standard, high-impact header for page sections.
 * 
 * Features an animated badge with a pulse effect, 
 * a bold responsive title with gradient typography, 
 * and consistent entrance animations.
 */
const VisualHeader: React.FC<VisualHeaderProps> = ({ badge, title, gradient_title, subtitle = "", align = "center" }) => {
    const theme = useTheme();

    return (
        <Box sx={{ py: 2, width: '100%', textAlign: align }}>
            {badge && (
                <Box
                    sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1,
                        px: 2.25,
                        py: 1,
                        borderRadius: 99,
                        bgcolor: 'background.paper',
                        border: '1px solid',
                        borderColor: 'divider',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: 'primary.main',
                        mb: 3,
                        animation: `${slideDown} 0.6s ease-out`,
                        boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
                        textTransform: 'uppercase',
                    }}
                >
                    <Box
                        sx={{
                            width: 8,
                            height: 8,
                            bgcolor: 'primary.main',
                            borderRadius: '50%',
                            animation: `${pulse} 2s ease-in-out infinite`,
                            mr: 0.5,
                        }}
                    />
                    {badge}
                </Box>
            )}

            <Typography
                variant="h2"
                sx={{
                    fontWeight: 800,
                    color: 'text.primary',
                    mb: 2,
                    letterSpacing: '-1px',
                    lineHeight: 1.1,
                    fontSize: { xs: '3rem', md: '3.5rem', lg: '4rem' },
                    animation: `${slideDown} 0.6s ease-out`,
                }}
            >
                {title} <Box component="span" sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                }}>{gradient_title}</Box>
            </Typography>

            <Typography
                variant="body1"
                sx={{
                    color: 'text.secondary',
                    fontSize: { xs: '1.2rem', md: '1.1rem', lg: '1rem' },
                    lineHeight: 1.6,
                    maxWidth: 900,
                    mx: align === 'center' ? 'auto' : 0,
                    mb: 2,
                    animation: `${slideDown} 0.6s ease-out`,
                }}
            >
                {subtitle}
            </Typography>
        </Box>
    );
};

export default VisualHeader;
