import React from 'react';
import { Box, Typography, LinearProgress, linearProgressClasses, alpha } from '@mui/material';

interface ProgressBarProps {
    /** Current progress value (0 to 100). */
    progress: number;
    /** Custom color for the progress bar. Can be a hex code or a theme key. */
    color?: string;
    /** The thickness/height of the bar. */
    height?: string | number;
    /** Whether to show a text label with title and percentage. */
    showLabel?: boolean;
    /** The title text for the label. */
    label?: string;
    /** Optional CSS class for the wrapper Box. */
    className?: string;
}

/**
 * A stylized progress bar with optional labeling.
 * 
 * Built on top of MUI LinearProgress, with customization for 
 * rounded corners, backdrop blur, and custom brand colors.
 */
const ProgressBar: React.FC<ProgressBarProps> = ({
    progress,
    color = 'primary.main', // defaulted to theme primary
    height = 6,
    showLabel = false,
    label,
    className = ''
}) => {
    return (
        <Box className={className} sx={{ width: '100%' }}>
            {showLabel && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    {label && (
                        <Typography variant="body2" fontWeight={700} color="text.secondary">
                            {label}
                        </Typography>
                    )}
                    <Typography variant="body2" fontWeight={700} color="text.primary">
                        {Math.round(progress)}%
                    </Typography>
                </Box>
            )}
            <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                    height: height,
                    borderRadius: 10,
                    bgcolor: (theme) => alpha(theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[700], 0.5),
                    [`& .${linearProgressClasses.bar}`]: {
                        borderRadius: 10,
                        backgroundColor: color.startsWith('#') || color.startsWith('rgb') ? color : undefined, // Check if it's a raw color or theme ref
                        // If it's a theme ref like 'primary.main', we can use sx properly via props too, but LinearProgress color prop is limited.
                        // Better to rely on sx backgroundColor inheritance if valid, or explicit custom color.
                        // Actually, let's allow 'color' to be passed to sx backgroundColor
                        bgcolor: color
                    }
                }}
            />
        </Box>
    );
};

export default ProgressBar;
