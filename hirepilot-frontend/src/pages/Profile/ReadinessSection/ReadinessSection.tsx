import React from 'react';
import { Rocket, Activity, Zap, Shield, Target, type LucideIcon } from 'lucide-react';
import type { ReadinessMetric } from '../../../store/CurrentUser/currentuser.types';
import { Card, Box, Stack, Typography, useTheme, alpha } from '@mui/material';

interface ReadinessSectionProps {
    /** Array of readiness metrics (Zap, technical, etc.) to display. */
    readiness: ReadinessMetric[];
}

const iconMap: Record<string, LucideIcon> = {
    Zap, Activity, Shield, Target
};

/**
 * Visual summary of interview readiness metrics.
 * 
 * Renders a grid of cards, each containing a progress bar and 
 * an icon-labeled score for specific performance categories.
 */
const ReadinessSection: React.FC<ReadinessSectionProps> = ({ readiness }) => {
    const theme = useTheme();

    return (
        <Card
            sx={{
                p: 4,
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Stack spacing={1} sx={{ mb: 4 }}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                    <Rocket size={22} color={theme.palette.primary.main} />
                    <Typography variant="h5" fontWeight={700}>
                        Interview Readiness
                    </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                    Real-time analytics based on your AI interview performance.
                </Typography>
            </Stack>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                    gap: 3,
                }}
            >
                {readiness.map((m, i) => {
                    const Icon = iconMap[m.icon] || Activity;
                    return (
                        <Box
                            key={i}
                            sx={{
                                p: 3,
                                borderRadius: 2,
                                border: `1px solid ${theme.palette.divider}`,
                                bgcolor: alpha(theme.palette.background.default, 0.3),
                            }}
                        >
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Box
                                    sx={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        bgcolor: alpha(m.color, 0.1),
                                        color: m.color,
                                    }}
                                >
                                    <Icon size={24} />
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="body2" color="text.secondary" fontWeight={600}>
                                        {m.label}
                                    </Typography>
                                    <Typography variant="h5" fontWeight={700} color="text.primary">
                                        {m.score}%
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>
                    );
                })}
            </Box>
        </Card>
    );
};

export default ReadinessSection;
