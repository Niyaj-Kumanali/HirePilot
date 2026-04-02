import { ArrowRight } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Box, Typography, Chip, useTheme, alpha } from '@mui/material';

interface TTCardType {
    id: string,
    color: string,
    tag?: string,
    icon: React.ReactNode,
    title: string,
    desc: string
}

const TTCard: React.FC<TTCardType> = ({ color, tag, icon, title, desc }) => {
    const theme = useTheme();

    // Helper to determine chip color based on tag
    const getTagColor = (tagName: string) => {
        const lowerTag = tagName.toLowerCase();
        if (lowerTag === 'popular') return { bg: '#fef2f2', color: '#ef4444', border: 'transparent' };
        if (lowerTag === 'new') return { bg: '#f0fdf4', color: '#16a34a', border: 'transparent' };
        return {
            bg: alpha(theme.palette.background.paper, 0.6),
            color: theme.palette.text.secondary,
            border: theme.palette.divider
        };
    };

    const tagStyle = tag ? getTagColor(tag) : null;

    return (
        <Card
            component={Link}
            to={`/tracks/${title}`}
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                p: 3.5,
                borderRadius: 6,
                height: '100%',
                textDecoration: 'none',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
                boxShadow: theme.shadows[1],
                cursor: 'pointer',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    borderColor: color, // Dynamic accent color border
                    boxShadow: theme.shadows[4],
                    '& .track-icon-glow': {
                        opacity: 0.15,
                    },
                    '& .track-card-footer': {
                        gap: 2, // 16px (increase gap)
                    }
                }
            }}
        >
            {tag && tagStyle && (
                <Chip
                    label={tag}
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: 24,
                        right: 24,
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        bgcolor: tagStyle.bg,
                        color: tagStyle.color,
                        border: `1px solid ${tagStyle.border}`,
                    }}
                />
            )}

            <Box
                sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    bgcolor: alpha(color, 0.05), // Using accent color with low opacity
                    color: color,
                    position: 'relative',
                    transition: 'all 0.3s ease',
                }}
            >
                <Box
                    className="track-icon-glow"
                    sx={{
                        position: 'absolute',
                        inset: -5,
                        bgcolor: color,
                        filter: 'blur(15px)',
                        opacity: 0,
                        transition: 'opacity 0.4s ease',
                        zIndex: -1,
                        borderRadius: 'inherit',
                    }}
                />
                {icon}
            </Box>

            <Box sx={{ mb: 3 }}>
                <Typography variant="h5" fontWeight={700} gutterBottom color="text.primary">
                    {title}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        lineHeight: 1.6,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {desc}
                </Typography>
            </Box>

            <Box
                className="track-card-footer"
                sx={{
                    marginTop: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: color,
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    transition: 'gap 0.3s ease',
                }}
            >
                <Box component="span">View Track</Box>
                <ArrowRight size={18} />
            </Box>
        </Card>
    );
};

export default TTCard;