import React from 'react';
import { Box, Typography, alpha, useTheme } from '@mui/material';

interface HIWCardType {
    step: string,
    Icon: React.ReactNode,
    title: string,
    desc: string
}

const HIWCard: React.FC<HIWCardType> = ({ step, Icon, title, desc }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                position: 'relative',
                p: { xs: 3, md: 3 },
                borderRadius: 7,
                width: '100%',
                height: '100%',
                mx: 'auto',
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',

                display: 'flex',
                flexDirection: { xs: 'row', md: 'column' },
                alignItems: { xs: 'center', md: 'center' },
                textAlign: { xs: 'left', md: 'center' },
                gap: { xs: 2, md: 0 },
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: -14,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    color: 'common.white',
                    px: 2.5,
                    py: 0.75,
                    borderRadius: 50,
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    boxShadow: theme.shadows[4],
                    whiteSpace: 'nowrap',
                    zIndex: 2,
                }}
            >
                Step {step}
            </Box>

            <Box
                sx={{
                    width: 64,
                    height: 64,
                    minWidth: 64,
                    borderRadius: 5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: { xs: 0, md: 2.5 },
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                    color: 'secondary.main',
                }}
            >
                {Icon}
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

export default HIWCard;