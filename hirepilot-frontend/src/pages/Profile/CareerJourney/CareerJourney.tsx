import React from 'react';
import { Briefcase, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Experience } from '../../../store/CurrentUser/currentuser.types';
import { Card, Box, Stack, Typography, Button, useTheme, alpha } from '@mui/material';

interface CareerJourneyProps {
    experience: Experience[];
}

const CareerJourney: React.FC<CareerJourneyProps> = ({ experience }) => {
    const theme = useTheme();

    return (
        <Card
            sx={{
                p: 4,
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                    <Briefcase size={22} color={theme.palette.primary.main} />
                    <Typography variant="h5" fontWeight={700}>
                        Career Journey
                    </Typography>
                </Stack>
                <Button
                    component={Link}
                    to="/jobs"
                    endIcon={<ChevronRight size={16} />}
                    sx={{
                        textTransform: 'none',
                        fontWeight: 600,
                        color: 'primary.main',
                    }}
                >
                    Explore Jobs
                </Button>
            </Stack>

            <Stack spacing={3}>
                {experience.map((exp, i) => (
                    <Box
                        key={i}
                        sx={{
                            position: 'relative',
                            pl: 4,
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                left: 6,
                                top: 8,
                                bottom: i === experience.length - 1 ? 'auto' : -24,
                                width: 2,
                                bgcolor: alpha(theme.palette.primary.main, 0.2),
                            },
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                left: 0,
                                top: 6,
                                width: 14,
                                height: 14,
                                borderRadius: '50%',
                                bgcolor: 'primary.main',
                                border: `3px solid ${theme.palette.background.paper}`,
                                boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
                            }}
                        />
                        <Stack spacing={0.5}>
                            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap">
                                <Typography variant="h6" fontWeight={700}>
                                    {exp.role}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" fontWeight={600}>
                                    {exp.period}
                                </Typography>
                            </Stack>
                            <Typography variant="body1" color="primary.main" fontWeight={600}>
                                {exp.company}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, lineHeight: 1.6 }}>
                                {exp.description}
                            </Typography>
                        </Stack>
                    </Box>
                ))}
            </Stack>
        </Card>
    );
};

export default CareerJourney;
