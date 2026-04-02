import { Briefcase } from 'lucide-react';
import { Box, Typography, keyframes, useTheme, alpha } from '@mui/material';

interface EmptyStateProps {
    title?: string;
    description?: string;
    iconSize?: number;
}

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.5; filter: blur(4px); }
  50% { transform: scale(0.8); opacity: 0.2; filter: blur(4px); }
`;

/**
 * Visual "No Results" or "Empty" placeholder.
 * 
 * Features a floating Briefcase icon animation and a 
 * responsive layout for various container sizes.
 */
const EmptyState = ({
    title = 'Found nothing here',
    description = 'Try adjusting your filters to find more results',
    iconSize = 64,
}: EmptyStateProps) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 3,
                width: '100%',
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    p: { xs: 4, md: 6 },
                    borderRadius: 7,
                    textAlign: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mb: 4,
                    }}
                >
                    <Box
                        sx={{
                            color: 'secondary.main',
                            animation: `${float} 3s ease-in-out infinite`,
                        }}
                    >
                        <Briefcase size={iconSize} strokeWidth={1.5} />
                    </Box>
                    <Box
                        sx={{
                            width: 48,
                            height: 6,
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            borderRadius: '50%',
                            mt: 1.5,
                            animation: `${pulse} 3s ease-in-out infinite`,
                        }}
                    />
                </Box>

                <Typography variant="h6" fontWeight={700} color="text.primary" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, mx: 'auto', lineHeight: 1.6 }}>
                    {description}
                </Typography>
            </Box>
        </Box>
    );
};

export default EmptyState;