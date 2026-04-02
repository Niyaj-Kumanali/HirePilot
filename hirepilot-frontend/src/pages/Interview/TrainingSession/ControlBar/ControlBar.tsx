import { Mic, MicOff, Video, VideoOff, Volume2, VolumeX, Send, Loader } from 'lucide-react';
import { Box, Stack, IconButton, TextField, Button, useTheme, alpha, keyframes } from '@mui/material';

interface ControlBarProps {
    /** Whether the user's microphone is muted at the stream level. */
    isMuted: boolean;
    /** Whether the user's camera is turned off. */
    isVideoOff: boolean;
    /** Whether speech synthesis (the AI's voice) is enabled. */
    isAudioEnabled: boolean;
    onToggleMute: () => void;
    onToggleVideo: () => void;
    onToggleAudio: () => void;
    /** Whether the speech-to-text listener is active. */
    isListening: boolean;
    onToggleListening: () => void;
    /** The current text in the response input field. */
    userInput: string;
    setUserInput: (val: string) => void;
    onSendMessage: () => void;
    /** Whether a message is currently being sent or processed by AI. */
    isLoading: boolean;
}

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`;

/**
 * Footer control bar for the interview session.
 * 
 * Provides toggles for hardware (camera/mic), voice feedback settings,
 * and the message input system (both typed and voice-to-text).
 */
const ControlBar = ({
    isMuted,
    isVideoOff,
    isAudioEnabled,
    onToggleMute,
    onToggleVideo,
    onToggleAudio,
    isListening,
    onToggleListening,
    userInput,
    setUserInput,
    onSendMessage,
    isLoading
}: ControlBarProps) => {
    const theme = useTheme();

    return (
        <Box
            component="footer"
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 3,
                gap: 3,
                bgcolor: alpha(theme.palette.background.paper, 0.8),
                backdropFilter: 'blur(12px)',
                borderTop: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Stack direction="row" spacing={2}>
                <IconButton
                    onClick={onToggleMute}
                    sx={{
                        bgcolor: isMuted ? 'error.main' : alpha(theme.palette.background.default, 0.5),
                        color: isMuted ? 'white' : 'text.primary',
                        '&:hover': {
                            bgcolor: isMuted ? 'error.dark' : alpha(theme.palette.background.default, 0.8),
                        },
                    }}
                >
                    {isMuted ? <MicOff /> : <Mic />}
                </IconButton>
                <IconButton
                    onClick={onToggleVideo}
                    sx={{
                        bgcolor: isVideoOff ? 'error.main' : alpha(theme.palette.background.default, 0.5),
                        color: isVideoOff ? 'white' : 'text.primary',
                        '&:hover': {
                            bgcolor: isVideoOff ? 'error.dark' : alpha(theme.palette.background.default, 0.8),
                        },
                    }}
                >
                    {isVideoOff ? <VideoOff /> : <Video />}
                </IconButton>
                <IconButton
                    onClick={onToggleAudio}
                    sx={{
                        bgcolor: !isAudioEnabled ? 'error.main' : alpha(theme.palette.background.default, 0.5),
                        color: !isAudioEnabled ? 'white' : 'text.primary',
                        '&:hover': {
                            bgcolor: !isAudioEnabled ? 'error.dark' : alpha(theme.palette.background.default, 0.8),
                        },
                    }}
                >
                    {isAudioEnabled ? <Volume2 /> : <VolumeX />}
                </IconButton>
            </Stack>

            <Box sx={{ display: 'flex', gap: 2, flex: 1, maxWidth: 600 }}>
                <Box sx={{ position: 'relative', flex: 1 }}>
                    <TextField
                        fullWidth
                        placeholder="Type your response..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
                        disabled={isLoading}
                        size="small"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                pr: 6,
                            },
                        }}
                    />
                    <IconButton
                        onClick={onToggleListening}
                        disabled={isLoading}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            bgcolor: isListening ? 'error.main' : 'transparent',
                            color: isListening ? 'white' : 'text.secondary',
                            animation: isListening ? `${pulse} 1.5s ease-in-out infinite` : 'none',
                            '&:hover': {
                                bgcolor: isListening ? 'error.dark' : alpha(theme.palette.primary.main, 0.1),
                            },
                        }}
                    >
                        <Mic size={20} />
                    </IconButton>
                </Box>

                <Button
                    variant="contained"
                    onClick={onSendMessage}
                    disabled={isLoading || (!userInput.trim() && !isListening)}
                    sx={{
                        minWidth: 100,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    }}
                >
                    {isLoading ? <Loader size={20} /> : <Send size={20} />}
                </Button>
            </Box>
        </Box>
    );
};

export default ControlBar;
