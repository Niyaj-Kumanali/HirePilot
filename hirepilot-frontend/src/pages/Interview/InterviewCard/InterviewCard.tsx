import {ArrowRight, Gauge } from 'lucide-react';
import type { PrepTopic } from '../../../types/interview';
import { Box, Typography, Button, Stack, useTheme, alpha } from '@mui/material';
import Card from '../../../components/Card/Card';

interface InterviewCardProps {
    /** The interview data to display. */
    interview: PrepTopic;
    /** Callback to start the training simulation. */
    onStartTraining: (interview: PrepTopic) => void;
}

/**
 * A detailed card representing an individual interview round.
 * 
 * Displays company info, position, status badges (upcoming/completed), 
 * date/time, and targeted topics. Provides a direct action link 
 * to start/resume training.
 */
const InterviewCard = ({ interview, onStartTraining }: InterviewCardProps) => {
    const { id, title, difficulty, category } = interview;
    const theme = useTheme();

    return (
        <Card
            sx={{
                p: 2.5,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    opacity: 0,
                    transition: 'opacity 0.3s',
                },
                '&:hover': {
                    '&::before': {
                        opacity: 1,
                    }
                }
            }}
        >
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                <Typography
                    variant="h6"
                    fontWeight={800}
                    sx={{
                        fontSize: '1rem',
                        lineHeight: 1.3,
                        flex: 1,
                        mr: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        minHeight: '2.6rem' // Exactly 2 lines
                    }}
                >
                    {title}
                </Typography>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ mb: 2, pb: 1.5, borderBottom: '1px solid', borderColor: alpha(theme.palette.divider, 0.05) }}>
                <Stack direction="row" alignItems="center" spacing={0.75} sx={{ fontSize: '0.75rem', color: 'text.secondary', fontWeight: 600 }}>
                    <Gauge size={14} color={theme.palette.primary.main} />
                    <span>{difficulty}</span>
                </Stack>

            </Stack>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 0.75,
                    height: '52px', // Consistency for topics section (approx 2 rows)
                    overflow: 'hidden',
                    alignContent: 'flex-start'
                }}
            >
                <Box
                    key={id}
                    sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                        color: 'primary.main',
                        px: 1,
                        py: 0.4,
                        borderRadius: 4,
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    }}
                >
                    {category}
                </Box>
            </Box>

            <Button
                fullWidth
                variant="contained"
                onClick={() => onStartTraining(interview)}
                endIcon={<ArrowRight size={16} />}
                sx={{
                    mt: 'auto',
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    color: 'common.white',
                    py: 1.25,
                    borderRadius: 2.5,
                    fontWeight: 700,
                    textTransform: 'none',
                    fontSize: '0.85rem',
                    boxShadow: 'none',
                    '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
                    }
                }}
            >
                Start Training
            </Button>
        </Card>
    );
};

export default InterviewCard;
