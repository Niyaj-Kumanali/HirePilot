import { Timer, Loader, X } from 'lucide-react';
import { Box, Stack, Typography, Button, IconButton, Chip, useTheme, alpha, keyframes } from '@mui/material';

interface SessionHeaderProps {
    position: string;
    company: string;
    timeLeft: number;
    formatTime: (seconds: number) => string;
    onFinish: () => void;
    onClose: () => void;
    isFinishing: boolean;
    canFinish: boolean;
}

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const SessionHeader = ({
    position,
    company,
    timeLeft,
    formatTime,
    onFinish,
    onClose,
    isFinishing,
    canFinish
}: SessionHeaderProps) => {
    const theme = useTheme();
    const isWarning = timeLeft < 60;

    return (
        <Box
            component="header"
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 3,
                bgcolor: alpha(theme.palette.background.paper, 0.8),
                backdropFilter: 'blur(12px)',
                borderBottom: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Stack spacing={1}>
                <Chip
                    label={
                        <Stack direction="row" spacing={0.5} alignItems="center">
                            <Box
                                sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    bgcolor: 'error.main',
                                    animation: `${pulse} 2s ease-in-out infinite`,
                                }}
                            />
                            LIVE INTERVIEW
                        </Stack>
                    }
                    size="small"
                    sx={{
                        bgcolor: alpha(theme.palette.error.main, 0.1),
                        color: 'error.main',
                        fontWeight: 700,
                        width: 'fit-content',
                    }}
                />
                <Typography variant="h5" fontWeight={700}>
                    {position}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {company}
                </Typography>
            </Stack>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    px: 3,
                    py: 1.5,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.background.paper, 0.8),
                    border: `1px solid ${theme.palette.divider}`,
                }}
            >
                <Timer size={18} color={isWarning ? theme.palette.warning.main : theme.palette.primary.main} />
                <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{
                        color: isWarning ? 'warning.main' : 'text.primary',
                        fontVariantNumeric: 'tabular-nums',
                    }}
                >
                    {formatTime(timeLeft)}
                </Typography>
            </Box>

            <Stack direction="row" spacing={2}>
                {canFinish && (
                    <Button
                        variant="contained"
                        onClick={onFinish}
                        disabled={isFinishing}
                        startIcon={isFinishing ? <Loader size={18} /> : null}
                        sx={{
                            background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
                        }}
                    >
                        {isFinishing ? 'Finishing...' : 'Finish Now'}
                    </Button>
                )}
                <IconButton
                    onClick={onClose}
                    sx={{
                        bgcolor: alpha(theme.palette.error.main, 0.1),
                        color: 'error.main',
                        '&:hover': {
                            bgcolor: 'error.main',
                            color: 'white',
                        },
                    }}
                >
                    <X size={20} />
                </IconButton>
            </Stack>
        </Box>
    );
};

export default SessionHeader;
