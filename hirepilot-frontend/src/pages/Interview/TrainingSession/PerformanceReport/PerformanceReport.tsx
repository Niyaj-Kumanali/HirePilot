import { Award, CheckCircle, TrendingUp, ChevronRight } from 'lucide-react';
import { Box, Stack, Typography, Button, LinearProgress, useTheme, alpha } from '@mui/material';
import type { PerformanceReportData } from '../../../../types/interview';

interface PerformanceReportProps {
    report: PerformanceReportData;
    position: string;
    onClose: () => void;
}

const PerformanceReport = ({ report, position, onClose }: PerformanceReportProps) => {
    const theme = useTheme();

    if (!report) return null;

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: alpha(theme.palette.background.default, 0.95),
                backdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                p: 3,
                overflow: 'auto',
            }}
        >
            <Box
                sx={{
                    maxWidth: 700,
                    width: '100%',
                    bgcolor: 'background.paper',
                    borderRadius: 4,
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: theme.shadows[12],
                    p: 4,
                }}
            >
                {/* Header */}
                <Stack spacing={2} alignItems="center" sx={{ mb: 4 }}>
                    <Box
                        sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            bgcolor: alpha(theme.palette.success.main, 0.1),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Award size={40} color={theme.palette.success.main} />
                    </Box>
                    <Typography variant="h4" fontWeight={700}>
                        Interview Complete!
                    </Typography>
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                        Great job! Here is your performance analysis for the {position} role.
                    </Typography>
                </Stack>

                {/* Score Grid */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '200px 1fr' },
                        gap: 4,
                        mb: 4,
                        p: 3,
                        bgcolor: alpha(theme.palette.background.default, 0.5),
                        borderRadius: 3,
                    }}
                >
                    <Stack alignItems="center" justifyContent="center">
                        <Box
                            sx={{
                                width: 150,
                                height: 150,
                                borderRadius: '50%',
                                border: `8px solid ${theme.palette.primary.main}`,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                            }}
                        >
                            <Typography variant="h2" fontWeight={800} color="primary.main">
                                {report.overallScore}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" fontWeight={600}>
                                Overall Score
                            </Typography>
                        </Box>
                    </Stack>

                    <Stack spacing={3} justifyContent="center">
                        <Box>
                            <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                                <Typography variant="body2" fontWeight={600}>
                                    Communication
                                </Typography>
                                <Typography variant="body2" fontWeight={700} color="primary.main">
                                    {report.communicationScore}%
                                </Typography>
                            </Stack>
                            <LinearProgress
                                variant="determinate"
                                value={report.communicationScore}
                                sx={{
                                    height: 8,
                                    borderRadius: 4,
                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    '& .MuiLinearProgress-bar': {
                                        bgcolor: theme.palette.primary.main,
                                    },
                                }}
                            />
                        </Box>
                        <Box>
                            <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                                <Typography variant="body2" fontWeight={600}>
                                    Technical Knowledge
                                </Typography>
                                <Typography variant="body2" fontWeight={700} color="primary.main">
                                    {report.technicalScore}%
                                </Typography>
                            </Stack>
                            <LinearProgress
                                variant="determinate"
                                value={report.technicalScore}
                                sx={{
                                    height: 8,
                                    borderRadius: 4,
                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    '& .MuiLinearProgress-bar': {
                                        bgcolor: theme.palette.primary.main,
                                    },
                                }}
                            />
                        </Box>
                    </Stack>
                </Box>

                {/* Feedback Section */}
                <Box sx={{ mb: 4, p: 3, bgcolor: alpha(theme.palette.success.main, 0.05), borderRadius: 2 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                        <CheckCircle size={20} color={theme.palette.success.main} />
                        <Typography variant="h6" fontWeight={700}>
                            Professional Feedback
                        </Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        {report.feedback}
                    </Typography>
                </Box>

                {/* Tips Section */}
                <Box sx={{ mb: 4, p: 3, bgcolor: alpha(theme.palette.info.main, 0.05), borderRadius: 2 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                        <TrendingUp size={20} color={theme.palette.info.main} />
                        <Typography variant="h6" fontWeight={700}>
                            Actionable Tips
                        </Typography>
                    </Stack>
                    <Stack spacing={1.5}>
                        {report.tips.map((tip: string, i: number) => (
                            <Stack key={i} direction="row" spacing={1.5} alignItems="flex-start">
                                <ChevronRight size={16} color={theme.palette.info.main} style={{ marginTop: 2 }} />
                                <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
                                    {tip}
                                </Typography>
                            </Stack>
                        ))}
                    </Stack>
                </Box>

                {/* Action Button */}
                <Button
                    variant="contained"
                    onClick={onClose}
                    fullWidth
                    size="large"
                    sx={{
                        py: 1.5,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        fontWeight: 700,
                    }}
                >
                    Return to Dashboard
                </Button>
            </Box>
        </Box>
    );
};

export default PerformanceReport;
