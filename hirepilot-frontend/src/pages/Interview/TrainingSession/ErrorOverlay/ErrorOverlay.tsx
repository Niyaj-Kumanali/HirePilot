import { AlertTriangle } from 'lucide-react';
import { Box, Stack, Typography, Button, useTheme, alpha } from '@mui/material';

interface ErrorOverlayProps {
    error: { title: string; message: string };
    onRetry: () => void;
    onClose: () => void;
}

const ErrorOverlay = ({ error, onRetry, onClose }: ErrorOverlayProps) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: alpha(theme.palette.background.default, 0.9),
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
            }}
        >
            <Box
                sx={{
                    maxWidth: 500,
                    p: 4,
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: theme.shadows[8],
                }}
            >
                <Stack spacing={3} alignItems="center">
                    <Box
                        sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            bgcolor: alpha(theme.palette.error.main, 0.1),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <AlertTriangle size={40} color={theme.palette.error.main} />
                    </Box>
                    <Stack spacing={1} alignItems="center">
                        <Typography variant="h5" fontWeight={700}>
                            {error.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" textAlign="center">
                            {error.message}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
                        <Button
                            variant="contained"
                            onClick={onRetry}
                            fullWidth
                            sx={{
                                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            }}
                        >
                            Try Again
                        </Button>
                        <Button variant="outlined" onClick={onClose} fullWidth>
                            Exit Session
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    );
};

export default ErrorOverlay;
