import { Sparkles, Lightbulb, User } from 'lucide-react';
import { Box, Stack, Typography, Card, useTheme, alpha, keyframes } from '@mui/material';

interface VideoGridProps {
    /** Whether the AI is currently synthesizing speech. */
    isSpeaking: boolean;
    /** Whether the AI is currently processing/thinking (simulating transcription). */
    isLoading: boolean;
    /** Whether an AI insight popup should be displayed. */
    isInsightVisible: boolean;
    /** The content of the AI insight/hint. */
    insight: string | null;
    /** The content of the last AI message for subtitles. */
    lastAiMessage: string | undefined;
    /** Reference to the local user's video element. */
    videoRef: React.RefObject<HTMLVideoElement | null>;
    /** Whether the local user's video is toggled off. */
    isVideoOff: boolean;
    /** Whether the local user's microphone is muted. */
    isMuted: boolean;
}

const wave = keyframes`
  0%, 100% { transform: scaleY(0.5); }
  50% { transform: scaleY(1); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
`;

const VideoGrid = ({
    isSpeaking,
    isLoading,
    isInsightVisible,
    insight,
    lastAiMessage,
    videoRef,
    isVideoOff,
    isMuted
}: VideoGridProps) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                gap: 3,
                p: 3,
                flex: 1,
            }}
        >
            {/* AI Interviewer View */}
            <Card
                sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 400,
                    bgcolor: alpha(theme.palette.background.default, 0.5),
                    border: `2px solid ${isSpeaking ? theme.palette.primary.main : theme.palette.divider}`,
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'border-color 0.3s',
                }}
            >
                <Stack alignItems="center" spacing={2}>
                    {isLoading && (
                        <Box
                            sx={{
                                position: 'absolute',
                                width: 200,
                                height: 200,
                                borderRadius: '50%',
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                animation: `${pulse} 2s ease-in-out infinite`,
                            }}
                        />
                    )}
                    <Sparkles
                        size={80}
                        color={isSpeaking ? theme.palette.primary.main : theme.palette.text.secondary}
                        style={{ transition: 'color 0.3s' }}
                    />
                    <Stack direction="row" spacing={1} alignItems="flex-end">
                        {[...Array(5)].map((_, i) => (
                            <Box
                                key={i}
                                sx={{
                                    width: 4,
                                    height: 20,
                                    bgcolor: theme.palette.primary.main,
                                    borderRadius: 1,
                                    animation: isSpeaking ? `${wave} 1s ease-in-out infinite` : 'none',
                                    animationDelay: `${i * 0.1}s`,
                                }}
                            />
                        ))}
                    </Stack>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                        AI Interviewer
                    </Typography>
                </Stack>

                {/* AI Insight Popup */}
                {isInsightVisible && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 16,
                            left: 16,
                            right: 16,
                            p: 2,
                            bgcolor: alpha(theme.palette.info.main, 0.95),
                            borderRadius: 2,
                            boxShadow: theme.shadows[4],
                        }}
                    >
                        <Stack direction="row" spacing={1.5} alignItems="flex-start">
                            <Lightbulb size={20} color={theme.palette.warning.main} />
                            <Stack spacing={0.5}>
                                <Typography variant="caption" fontWeight={700} color="white">
                                    AI HINT
                                </Typography>
                                <Typography variant="body2" color="white">
                                    {insight}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
                )}

                {/* Subtitles */}
                {(lastAiMessage || isLoading) && (
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 16,
                            left: 16,
                            right: 16,
                            p: 2,
                            bgcolor: alpha(theme.palette.background.paper, 0.95),
                            borderRadius: 2,
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="body2" fontWeight={600} color={isLoading ? 'primary.main' : 'text.primary'}>
                            {isLoading ? "AI is transcribing your response..." : lastAiMessage}
                        </Typography>
                    </Box>
                )}
            </Card>

            {/* User Preview View */}
            <Card
                sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 400,
                    bgcolor: 'black',
                    borderRadius: 3,
                    overflow: 'hidden',
                }}
            >
                <Box
                    component="video"
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: isVideoOff ? 'none' : 'block',
                    }}
                />
                {isVideoOff && (
                    <Stack alignItems="center" spacing={2}>
                        <User size={80} color={theme.palette.text.secondary} />
                        <Typography variant="body1" color="text.secondary">
                            Camera Signal Lost
                        </Typography>
                    </Stack>
                )}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 16,
                        left: 16,
                        px: 2,
                        py: 1,
                        bgcolor: alpha(theme.palette.background.paper, 0.8),
                        borderRadius: 1,
                    }}
                >
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="body2" fontWeight={600}>
                            You
                        </Typography>
                        {isMuted && (
                            <Typography variant="caption" color="error.main" fontWeight={600}>
                                Muted
                            </Typography>
                        )}
                    </Stack>
                </Box>
            </Card>
        </Box>
    );
};

export default VideoGrid;
