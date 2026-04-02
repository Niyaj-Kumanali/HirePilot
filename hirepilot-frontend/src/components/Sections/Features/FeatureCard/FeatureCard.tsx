import React from 'react';
import { Box, Typography, alpha, useTheme } from '@mui/material';

interface FeatureCardType {
    title: string,
    desc: string,
    icon: React.ReactNode,
}

const FeatureCard: React.FC<FeatureCardType> = ({ title, desc, icon }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                position: 'relative',
                bgcolor: 'background.paper',
                p: { xs: 3, md: 5 },
                borderRadius: '23px',
                height: '100%',
                zIndex: 2,
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: { xs: 'row', md: 'column' },
                alignItems: { xs: 'center', md: 'flex-start' },
                gap: { xs: 2, md: 0 },
            }}
        >

            <Box
                sx={{
                    width: 64,
                    height: 64,
                    minWidth: 64,
                    borderRadius: 5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                    color: 'secondary.main',
                    mb: { xs: 0, md: 2.5 },
                }}
            >
                {icon}
            </Box>
            <Box>
                <Typography variant="h6" fontWeight={700} gutterBottom color="text.primary">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {desc}
                </Typography>
            </Box>
        </Box>
    );
};

export default FeatureCard;