import { Box, Typography, keyframes, alpha, useTheme } from '@mui/material';

const scanAnimation = keyframes`
  0% { top: -80px; opacity: 0; }
  50% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
`;

const progressAnimation = keyframes`
  from { stroke-dasharray: 0, 100; }
  to { stroke-dasharray: 85, 100; }
`;

const Scanner = () => {
    const theme = useTheme();

    const cardStyle = {
        position: 'absolute',
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 4,
        boxShadow: theme.shadows[3],
        p: 2,
        zIndex: 2,
        animation: `${floatAnimation} 6s ease-in-out infinite`,
    };

    const skeletonStyle = {
        height: 8,
        bgcolor: alpha(theme.palette.text.primary, 0.1),
        borderRadius: 1,
        mb: 1,
    };

    return (
        <Box sx={{ position: 'relative', height: 400, width: 400, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{
                width: '100%',
                height: '100%',
                borderRadius: 8,
                border: '1px solid',
                borderColor: 'divider',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: `inset 0 2px 10px ${alpha(theme.palette.common.black, 0.02)}`
            }}>
                {/* Scanning Line Effect */}
                <Box sx={{
                    position: 'absolute',
                    width: '100%',
                    height: 80,
                    background: `linear-gradient(to bottom, transparent, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.primary.main, 0.2)}, transparent)`,
                    top: -80,
                    zIndex: 5,
                    animation: `${scanAnimation} 4s ease-in-out infinite`
                }} />

                {/* Feedback Card */}
                <Box sx={{
                    ...cardStyle,
                    width: 200,
                    top: 40,
                    left: 30,
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                        <Box sx={{
                            width: 8,
                            height: 8,
                            bgcolor: 'success.main',
                            borderRadius: '50%',
                            boxShadow: `0 0 8px ${alpha(theme.palette.success.main, 0.5)}`
                        }} />
                        <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ textTransform: 'uppercase' }}>
                            AI Analysis
                        </Typography>
                    </Box>
                    <Box sx={{ ...skeletonStyle, width: '100%' }} />
                    <Box sx={{ ...skeletonStyle, width: '70%' }} />
                </Box>

                {/* Score Card */}
                <Box sx={{
                    ...cardStyle,
                    width: 120,
                    bottom: 40,
                    right: 30,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    animationDelay: '-2s'
                }}>
                    <Box sx={{ width: 60, height: 60, position: 'relative', mb: 1 }}>
                        <svg viewBox="0 0 36 36">
                            <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke={theme.palette.divider}
                                strokeWidth="3.8"
                            />
                            <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke={theme.palette.primary.main}
                                strokeWidth="3.8"
                                strokeLinecap="round"
                                strokeDasharray="85, 100"
                                style={{ animation: `${progressAnimation} 2s ease-out forwards` }}
                            />
                        </svg>
                        <Typography
                            variant="caption"
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                fontWeight: 800,
                                color: 'primary.main',
                                fontSize: '0.85rem'
                            }}
                        >
                            85%
                        </Typography>
                    </Box>
                    <Typography variant="caption" fontWeight={600} color="text.secondary">
                        Readiness
                    </Typography>
                </Box>

                {/* Insight Bar */}
                <Box sx={{
                    ...cardStyle,
                    width: 160,
                    top: 160,
                    right: 20,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    p: 1.5,
                    animationDelay: '-4s'
                }}>
                    <Box sx={{
                        width: 10,
                        height: 10,
                        bgcolor: 'primary.main',
                        borderRadius: '50%',
                        animation: `${pulseAnimation} 2s infinite`
                    }} />
                    <Box sx={{ ...skeletonStyle, width: '100%', mb: 0 }} />
                </Box>
            </Box>
        </Box>
    );
};

export default Scanner;